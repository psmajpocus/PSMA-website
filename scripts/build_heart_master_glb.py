#!/usr/bin/env python3
"""
BodyParts3D OBJ ファイルから public/models/heart_master.glb を生成するスクリプト。
案C(修正版): 外壁 + 内壁を独立したメッシュノードとして追加し壁厚を表現。
  - {name}       : 外壁（doubleSided=False, 外から見て正しい描画）
  - {name}_Inner : 内壁（doubleSided=False, 内腔から見て正しい描画）
内壁を縫合しないためメッシュ充填が発生しない。

Source : BodyParts3D, © The Database Center for Life Science
License: CC Attribution-Share Alike 2.1 Japan
         https://creativecommons.org/licenses/by-sa/2.1/jp/
"""
import argparse, os, sys

try:
    import trimesh
    import numpy as np
    from trimesh.intersections import slice_mesh_plane
except ImportError:
    sys.exit("pip3 install --user 'trimesh[easy]' numpy")

IVC_MARGIN_MM = 45.0

WALL_THICKNESS = {
    "Left_Ventricle":       8.0,
    "Right_Ventricle":      5.0,
    "Left_Atrium":          4.0,
    "Right_Atrium":         4.0,
    "Ascending_Aorta":      3.0,
    "Pulmonary_Trunk":      3.0,
    "Superior_Vena_Cava":   2.5,
    "Inferior_Vena_Cava":   2.5,
    "Right_Pulmonary_Veins":2.0,
    "Left_Pulmonary_Veins": 2.0,
}

STRUCTURES = [
    { "files":["FJ2439.obj"], "fma":"FMA9457",  "name":"Right_Atrium",          "ja":"右心房壁",   "rgb":[220,80,80],   "solid":True  },
    { "files":["FJ2438.obj"], "fma":"FMA9531",  "name":"Left_Atrium",           "ja":"左心房壁",   "rgb":[170,35,35],   "solid":True  },
    { "files":None,           "fma":"FMA13884", "name":"Right_Ventricle",       "ja":"右心室壁",   "rgb":[255,140,140], "solid":True  },
    { "files":None,           "fma":"FMA13884", "name":"Left_Ventricle",        "ja":"左心室壁",   "rgb":[255,100,100], "solid":True  },
    { "files":["FJ3413.obj"], "fma":"FMA3736",  "name":"Ascending_Aorta",       "ja":"上行大動脈", "rgb":[200,15,15],   "solid":True  },
    { "files":["FJ2966.obj"], "fma":"FMA8612",  "name":"Pulmonary_Trunk",       "ja":"肺動脈幹",   "rgb":[60,100,230],  "solid":True  },
    { "files":["FJ3645.obj"], "fma":"FMA4720",  "name":"Superior_Vena_Cava",    "ja":"上大静脈",   "rgb":[30,60,180],   "solid":True  },
    { "files":["FJ3441.obj","FJ3659.obj"], "fma":"FMA10951","name":"Inferior_Vena_Cava","ja":"下大静脈","rgb":[45,85,205],"solid":True },
    { "files":["FJ2420.obj","FJ2432.obj"],               "fma":"FMA7241","name":"Mitral_Valve",     "ja":"僧帽弁",   "rgb":[255,215,0],  "solid":False },
    { "files":["FJ2421.obj","FJ2433.obj","FJ2436.obj"],  "fma":"FMA7237","name":"Tricuspid_Valve",  "ja":"三尖弁",   "rgb":[255,235,80], "solid":False },
    { "files":["FJ2426.obj","FJ2431.obj","FJ2435.obj"],  "fma":"FMA7251","name":"Aortic_Valve",     "ja":"大動脈弁", "rgb":[255,140,0],  "solid":False },
    { "files":["FJ2417.obj","FJ2427.obj","FJ2434.obj"],  "fma":"FMA7248","name":"Pulmonary_Valve",  "ja":"肺動脈弁", "rgb":[255,170,50], "solid":False },
    { "files":["FJ3020.obj","FJ3040.obj"],               "fma":"FMA49914","name":"Right_Pulmonary_Veins","ja":"右肺静脈","rgb":[140,140,255],"solid":True },
    { "files":["FJ2925.obj","FJ2933.obj","FJ2944.obj","FJ2950.obj","FJ2955.obj"],"fma":"FMA49916","name":"Left_Pulmonary_Veins","ja":"左肺静脈","rgb":[170,100,255],"solid":True },
    { "files":["FJ2419.obj","FJ2430.obj","FJ2437.obj"], "fma":"FMA7260","name":"RV_Papillary_Muscles","ja":"右室乳頭筋","rgb":[180,105,60],"solid":False },
    { "files":["FJ2418.obj","FJ2429.obj"],              "fma":"FMA7264","name":"LV_Papillary_Muscles","ja":"左室乳頭筋","rgb":[140,65,30], "solid":False },
    { "files":["FJ2723.obj"],                           "fma":"FMA3802","name":"Right_Coronary_Artery","ja":"右冠動脈",  "rgb":[255,50,50],  "solid":False },
    { "files":["FJ2737.obj","FJ2631.obj","FJ2649.obj"], "fma":"FMA3855","name":"Left_Coronary_System", "ja":"左冠動脈系","rgb":[255,105,30], "solid":False },
]


def find_file(name, directory):
    p = os.path.join(directory, name)
    return p if os.path.exists(p) else None


def load_obj(filepath):
    try:
        m = trimesh.load(filepath, process=True, force="mesh")
    except Exception as e:
        print(f"    ⚠ load error ({filepath}): {e}"); return None
    if isinstance(m, trimesh.Scene):
        parts = [g for g in m.geometry.values() if isinstance(g, trimesh.Trimesh)]
        m = trimesh.util.concatenate(parts) if parts else None
    return m if (isinstance(m, trimesh.Trimesh) and len(m.vertices) > 0) else None


def orient_normals_outward(mesh, reference_point=None):
    """法線を外向きに統一。reference_point は腔内の既知点（ある場合はそこから外向きに）。"""
    mesh.fix_normals()
    ctr = reference_point if reference_point is not None else mesh.centroid
    fc = mesh.vertices[mesh.faces].mean(axis=1)
    dot = (mesh.face_normals * (fc - ctr)).sum(axis=1)
    inward = dot < 0
    if inward.any():
        mesh.faces[inward, 1:] = mesh.faces[inward, 1:][:, ::-1]
        mesh.face_normals  # force recompute
    return mesh


def make_inner_mesh(mesh, thickness):
    """
    外壁メッシュの頂点を法線方向に内側オフセットした内壁メッシュを返す。
    巻き順は反転しない（法線方向はオフセットで反転しているため）。
    縫合なし → 充填なし。
    """
    vn  = mesh.vertex_normals
    inner_v = mesh.vertices - vn * thickness
    # 内壁は同じ面インデックスを使うが頂点が内側にある。
    # 法線が内向きになるよう巻き順を反転する。
    inner_f = mesh.faces[:, ::-1].copy()
    # process=False: trimeshのfix_normals()が巻き順を「修正」してしまうのを防ぐ
    inner_mesh = trimesh.Trimesh(vertices=inner_v, faces=inner_f, process=False)
    return inner_mesh


def separate_ventricles(wall_path, rv_cav_path, lv_cav_path):
    wall   = load_obj(wall_path)
    rv_cav = load_obj(rv_cav_path)
    lv_cav = load_obj(lv_cav_path)
    if wall is None: return (None, None), (None, None)

    if rv_cav is None or lv_cav is None:
        print("    ⚠ 空洞メッシュが見つからないため X 座標で分割します")
        mid_x = (wall.bounds[0,0] + wall.bounds[1,0]) / 2
        fc = wall.vertices[wall.faces].mean(1)
        rv_mask = fc[:,0] < mid_x
        rv_c = lv_c = None
    else:
        rv_c = rv_cav.vertices.mean(0)
        lv_c = lv_cav.vertices.mean(0)
        fc   = wall.vertices[wall.faces].mean(1)
        rv_mask = (np.linalg.norm(fc - rv_c, axis=1) <
                   np.linalg.norm(fc - lv_c, axis=1))

    lv_mask = ~rv_mask
    rv = trimesh.Trimesh(vertices=wall.vertices, faces=wall.faces[rv_mask], process=True)
    lv = trimesh.Trimesh(vertices=wall.vertices, faces=wall.faces[lv_mask], process=True)
    return (rv, rv_c), (lv, lv_c)


def make_material(name, rgb, double_sided):
    return trimesh.visual.TextureVisuals(
        material=trimesh.visual.material.PBRMaterial(
            name=name,
            baseColorFactor=np.array([rgb[0]/255., rgb[1]/255., rgb[2]/255., 1.], dtype=np.float32),
            doubleSided=double_sided,
        )
    )


def build_scene(input_dir):
    scene = trimesh.Scene()
    found = 0

    ra_mesh = load_obj(os.path.join(input_dir, "FJ2439.obj"))
    ivc_clip_z = (float(ra_mesh.bounds[0,2]) - IVC_MARGIN_MM) if ra_mesh else None
    if ivc_clip_z:
        print(f"  IVC 切断 z ≥ {ivc_clip_z:.0f} mm")

    (rv_base, rv_c), (lv_base, lv_c) = separate_ventricles(
        os.path.join(input_dir, "FJ2428.obj"),
        os.path.join(input_dir, "FJ2423.obj"),
        os.path.join(input_dir, "FJ2422.obj"),
    )
    if rv_base: print(f"  RV 分離: {len(rv_base.faces):,} 面  腔重心={rv_c}")
    if lv_base: print(f"  LV 分離: {len(lv_base.faces):,} 面  腔重心={lv_c}")
    print()

    for s in STRUCTURES:
        name  = s["name"]
        rgb   = s["rgb"]
        solid = s.get("solid", True)

        if name == "Right_Ventricle":
            mesh = rv_base; ref = rv_c
        elif name == "Left_Ventricle":
            mesh = lv_base; ref = lv_c
        else:
            ref  = None
            mesh = None
            missing = []
            parts = []
            for fname in (s["files"] or []):
                p = find_file(fname, input_dir)
                if p is None: missing.append(fname); continue
                m = load_obj(p)
                if m: parts.append(m)
            if missing:
                print(f"  SKIP  {name} ← {missing}"); continue
            if not parts:
                print(f"  EMPTY {name}"); continue
            mesh = trimesh.util.concatenate(parts) if len(parts) > 1 else parts[0]

            if name == "Inferior_Vena_Cava" and ivc_clip_z:
                try:
                    mesh = slice_mesh_plane(
                        mesh,
                        plane_normal=np.array([0.,0.,1.]),
                        plane_origin=np.array([0.,0.,ivc_clip_z]),
                        cap=True,
                    )
                except Exception as e:
                    print(f"    ⚠ IVC clip fail: {e}")

        if mesh is None or len(mesh.vertices) == 0:
            print(f"  SKIP  {name} (メッシュ空)"); continue

        thickness = WALL_THICKNESS.get(name, 0.0) if solid else 0.0

        # ── 外壁 ─────────────────────────────────────────────────
        orient_normals_outward(mesh, ref)
        mesh.visual = make_material(name, rgb, double_sided=not solid)
        scene.add_geometry(mesh, geom_name=name)
        found += 1

        # ── 内壁（壁厚構造のみ）──────────────────────────────────
        if thickness > 0:
            inner = make_inner_mesh(mesh, thickness)
            # 内壁: 外から見えない（法線が内向き → doubleSided=False）
            # 断面クリップ時や executeCut 後に内腔側から見える
            inner_rgb = [max(0, c - 30) for c in rgb]  # 内壁は少し暗め
            inner.visual = make_material(f"{name}_Inner", inner_rgb, double_sided=False)
            scene.add_geometry(inner, geom_name=f"{name}_Inner")
            found += 1
            print(f"  THICK {name:32s} ({s['ja']:12s}) "
                  f"{len(mesh.vertices):5,}v/{len(mesh.faces):5,}f  "
                  f"inner {len(inner.vertices):5,}v/{len(inner.faces):5,}f  t={thickness:.1f}mm")
        else:
            ds = "2side" if not solid else "1side"
            print(f"  OK    {name:32s} ({s['ja']:12s}) "
                  f"{len(mesh.vertices):6,}v  {len(mesh.faces):6,}f  {ds}")

    if found == 0:
        sys.exit("ERROR: 0 meshes")

    all_v = np.vstack([g.vertices for g in scene.geometry.values() if hasattr(g,'vertices')])
    mn, mx = all_v.min(0), all_v.max(0)
    sz = mx - mn
    print(f"\n全 {found} ノード: x[{mn[0]:.0f},{mx[0]:.0f}] y[{mn[1]:.0f},{mx[1]:.0f}] "
          f"z[{mn[2]:.0f},{mx[2]:.0f}]  サイズ {sz[0]:.0f}×{sz[1]:.0f}×{sz[2]:.0f} mm")
    return scene


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--input-dir", default="/tmp/bp3d_heart")
    p.add_argument("--output",    default=None)
    args = p.parse_args()

    out = args.output or os.path.normpath(
        os.path.join(os.path.dirname(__file__), "..", "public", "models", "heart_master.glb"))
    os.makedirs(os.path.dirname(out), exist_ok=True)

    print(f"入力: {args.input_dir}\n出力: {out}\n")
    scene = build_scene(args.input_dir)
    scene.export(out)
    print(f"\n✓ {out}  ({os.path.getsize(out)//1024:,} KB)")


if __name__ == "__main__":
    main()

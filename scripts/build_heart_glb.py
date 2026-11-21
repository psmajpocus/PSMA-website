#!/usr/bin/env python3
"""
BodyParts3D OBJ ファイルから public/models/heart.glb を生成するスクリプト。

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

IVC_MARGIN_MM = 45.0   # 右心房下縁から何 mm 下まで IVC を残すか

# ──────────────────────────────────────────────────────────────────────────────
# 構造定義
# solid=True  → 法線を外向きに修正 + doubleSided=False（壁・管腔構造）
# solid=False → 修正なし + doubleSided=True（弁尖・乳頭筋・冠動脈など）
# ──────────────────────────────────────────────────────────────────────────────
STRUCTURES = [
    # ── 心房壁 ──
    { "files":["FJ2439.obj"],            "fma":"FMA9457",  "name":"Right_Atrium",         "ja":"右心房壁",       "rgb":[220,80,80],   "solid":True  },
    { "files":["FJ2438.obj"],            "fma":"FMA9531",  "name":"Left_Atrium",          "ja":"左心房壁",       "rgb":[170,35,35],   "solid":True  },

    # ── 心室壁（RV/LV 分離）── ← files=None でコード側で別処理
    { "files":None,                      "fma":"FMA13884", "name":"Right_Ventricle",      "ja":"右心室壁",       "rgb":[255,140,140], "solid":True  },
    { "files":None,                      "fma":"FMA13884", "name":"Left_Ventricle",       "ja":"左心室壁",       "rgb":[255,100,100], "solid":True  },

    # ── 大血管 ──
    { "files":["FJ3413.obj"],            "fma":"FMA3736",  "name":"Ascending_Aorta",      "ja":"上行大動脈",     "rgb":[200,15,15],   "solid":True  },
    { "files":["FJ2966.obj"],            "fma":"FMA8612",  "name":"Pulmonary_Trunk",      "ja":"肺動脈幹",       "rgb":[60,100,230],  "solid":True  },
    { "files":["FJ3645.obj"],            "fma":"FMA4720",  "name":"Superior_Vena_Cava",   "ja":"上大静脈",       "rgb":[30,60,180],   "solid":True  },
    { "files":["FJ3441.obj","FJ3659.obj"],"fma":"FMA10951","name":"Inferior_Vena_Cava",   "ja":"下大静脈",       "rgb":[45,85,205],   "solid":True  },

    # ── 心臓弁（11）──
    { "files":["FJ2420.obj","FJ2432.obj"],          "fma":"FMA7241","name":"Mitral_Valve",     "ja":"僧帽弁",    "rgb":[255,215,0],   "solid":False },
    { "files":["FJ2421.obj","FJ2433.obj","FJ2436.obj"],"fma":"FMA7237","name":"Tricuspid_Valve","ja":"三尖弁",    "rgb":[255,235,80],  "solid":False },
    { "files":["FJ2426.obj","FJ2431.obj","FJ2435.obj"],"fma":"FMA7251","name":"Aortic_Valve",   "ja":"大動脈弁",  "rgb":[255,140,0],   "solid":False },
    { "files":["FJ2417.obj","FJ2427.obj","FJ2434.obj"],"fma":"FMA7248","name":"Pulmonary_Valve","ja":"肺動脈弁",  "rgb":[255,170,50],  "solid":False },

    # ── 肺静脈（12）──
    { "files":["FJ3020.obj","FJ3040.obj"],               "fma":"FMA49914","name":"Right_Pulmonary_Veins","ja":"右肺静脈","rgb":[140,140,255], "solid":True  },
    { "files":["FJ2925.obj","FJ2933.obj","FJ2944.obj","FJ2950.obj","FJ2955.obj"],"fma":"FMA49916","name":"Left_Pulmonary_Veins","ja":"左肺静脈","rgb":[170,100,255], "solid":True  },

    # ── 乳頭筋（13）──
    { "files":["FJ2419.obj","FJ2430.obj","FJ2437.obj"], "fma":"FMA7260","name":"RV_Papillary_Muscles","ja":"右室乳頭筋","rgb":[180,105,60],  "solid":False },
    { "files":["FJ2418.obj","FJ2429.obj"],              "fma":"FMA7264","name":"LV_Papillary_Muscles","ja":"左室乳頭筋","rgb":[140,65,30],   "solid":False },

    # ── 冠動脈（14）──
    { "files":["FJ2723.obj"],                           "fma":"FMA3802","name":"Right_Coronary_Artery","ja":"右冠動脈",  "rgb":[255,50,50],   "solid":False },
    { "files":["FJ2737.obj","FJ2631.obj","FJ2649.obj"], "fma":"FMA3855","name":"Left_Coronary_System", "ja":"左冠動脈系","rgb":[255,105,30],  "solid":False },
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


def orient_normals_outward(mesh):
    """法線を外向きに統一する。重心を基準に内向き面の巻き順を反転する。"""
    mesh.fix_normals()
    ctr = mesh.centroid
    fc = mesh.vertices[mesh.faces].mean(axis=1)
    dot = (mesh.face_normals * (fc - ctr)).sum(axis=1)
    inward = dot < 0
    if inward.any():
        mesh.faces[inward, 1:] = mesh.faces[inward, 1:][:, ::-1]
        mesh.face_normals  # force recompute
    return mesh


def separate_ventricles(wall_path, rv_cav_path, lv_cav_path):
    """FJ2428（心室壁）を RV/LV に分離して返す。"""
    wall = load_obj(wall_path)
    rv_cav = load_obj(rv_cav_path)
    lv_cav = load_obj(lv_cav_path)
    if wall is None: return None, None

    if rv_cav is None or lv_cav is None:
        print("    ⚠ 空洞メッシュが見つからないため X 座標で分割します")
        mid_x = (wall.bounds[0,0] + wall.bounds[1,0]) / 2
        fc = wall.vertices[wall.faces].mean(1)
        rv_mask = fc[:,0] < mid_x
    else:
        rv_c = rv_cav.vertices.mean(0)
        lv_c = lv_cav.vertices.mean(0)
        fc   = wall.vertices[wall.faces].mean(1)
        rv_mask = (np.linalg.norm(fc - rv_c, axis=1) <
                   np.linalg.norm(fc - lv_c, axis=1))

    lv_mask = ~rv_mask
    rv = trimesh.Trimesh(vertices=wall.vertices, faces=wall.faces[rv_mask], process=True)
    lv = trimesh.Trimesh(vertices=wall.vertices, faces=wall.faces[lv_mask], process=True)
    return rv, lv


def build_scene(input_dir):
    scene  = trimesh.Scene()
    found  = 0

    # IVC クリップ用 RA 下縁 Z
    ra_mesh = load_obj(os.path.join(input_dir, "FJ2439.obj"))
    ivc_clip_z = (float(ra_mesh.bounds[0,2]) - IVC_MARGIN_MM) if ra_mesh else None
    if ivc_clip_z:
        print(f"  IVC 切断 z ≥ {ivc_clip_z:.0f} mm (RA下縁 −{IVC_MARGIN_MM:.0f}mm)")

    # RV/LV 分離（事前処理）
    rv_mesh, lv_mesh = separate_ventricles(
        os.path.join(input_dir, "FJ2428.obj"),
        os.path.join(input_dir, "FJ2423.obj"),
        os.path.join(input_dir, "FJ2422.obj"),
    )
    if rv_mesh: print(f"  RV 分離: {len(rv_mesh.faces):,} 面")
    if lv_mesh: print(f"  LV 分離: {len(lv_mesh.faces):,} 面")
    print()

    for s in STRUCTURES:
        name  = s["name"]
        rgb   = s["rgb"]
        solid = s.get("solid", True)

        # ── RV/LV は分離済みメッシュを使用 ──────────────────────────────
        if name == "Right_Ventricle":
            mesh = rv_mesh
        elif name == "Left_Ventricle":
            mesh = lv_mesh
        else:
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

            # IVC だけ Z クリップ
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

        # solid 構造は法線を外向きに統一
        if solid:
            orient_normals_outward(mesh)

        mesh.visual = trimesh.visual.TextureVisuals(
            material=trimesh.visual.material.PBRMaterial(
                name=name,
                baseColorFactor=np.array([rgb[0]/255., rgb[1]/255., rgb[2]/255., 1.], dtype=np.float32),
                doubleSided=not solid,   # solid=True → doubleSided=False
            )
        )
        scene.add_geometry(mesh, geom_name=name)
        found += 1
        ds = "1side" if solid else "2side"
        print(f"  OK  {name:32s} ({s['ja']:12s}) "
              f"{len(mesh.vertices):6,}v  {len(mesh.faces):6,}f  "
              f"[#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}] {ds}")

    if found == 0:
        sys.exit("ERROR: 0 meshes")

    all_v = np.vstack([g.vertices for g in scene.geometry.values() if hasattr(g,'vertices')])
    mn, mx = all_v.min(0), all_v.max(0)
    sz = mx - mn
    print(f"\n全 {found} 構造: x[{mn[0]:.0f},{mx[0]:.0f}] y[{mn[1]:.0f},{mx[1]:.0f}] "
          f"z[{mn[2]:.0f},{mx[2]:.0f}]  サイズ {sz[0]:.0f}×{sz[1]:.0f}×{sz[2]:.0f} mm")
    return scene


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--input-dir", default="/tmp/bp3d_heart")
    p.add_argument("--output",    default=None)
    args = p.parse_args()

    out = args.output or os.path.normpath(
        os.path.join(os.path.dirname(__file__), "..", "public", "models", "heart.glb"))
    os.makedirs(os.path.dirname(out), exist_ok=True)

    print(f"入力: {args.input_dir}\n出力: {out}\n")
    scene = build_scene(args.input_dir)
    scene.export(out)
    print(f"\n✓ {out}  ({os.path.getsize(out)//1024:,} KB)")


if __name__ == "__main__":
    main()

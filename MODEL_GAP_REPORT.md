# MODEL_GAP_REPORT.md — Z-Anatomy 心臓メッシュ調査報告

**調査日**: 2026-09-25  
**調査対象**: Z-Anatomy v4.0 `CardioVascular41.fbx` (62 MB)  
**抽出ツール**: カスタム FBX バイナリパーサ (`/tmp/parse_zanato_fbx.py`)  
**抽出先**: `/tmp/zanato_heart/` (22 OBJ ファイル)

---

## 1. 抽出された構造一覧（22 メッシュ）

| ファイル名 | 解剖学的構造 | 頂点数 | 面数 | 閉曲面 | 境界ループ数 | 外向き法線 | 備考 |
|-----------|------------|--------|------|--------|------------|-----------|------|
| `Right_atrium.obj` | 右心房 | 4,756 | 9,298 | ✗ | 2 | 53% | 心内膜面（内腔シェル） |
| `Left_atrium.obj` | 左心房 | 1,090 | 2,092 | ✗ | 2 | 56% | 心内膜面（内腔シェル）、ポリゴン少 |
| `Right_ventricle.obj` | 右心室 | 4,726 | 9,152 | ✗ | 2 | 36% | 心内膜面（内腔シェル） |
| `Left_ventricle.obj` | 左心室 | 4,718 | 9,122 | ✗ | 4 | 43% | 心内膜面（内腔シェル）、最も詳細 |
| `Ascending_aorta.obj` | 上行大動脈 | 130 | 236 | ✗ | 2 | 97% | チューブ面、粗い |
| `Pulmonary_trunk.obj` | 肺動脈幹 | 61 | 93 | ✗ | 2 | 100% | チューブ面、極めて粗い |
| `Bifurcation_of_pulmonary_trunk.obj` | 肺動脈分岐部 | 260 | 472 | ✗ | 4 | 100% | 左右肺動脈への分岐 |
| `Superior_vena_cava.obj` | 上大静脈 | 71 | 118 | ✗ | 2 | 95% | チューブ面、極めて粗い |
| `Inferior_vena_cava_thoracic_part.obj` | 下大静脈（胸部） | 189 | 354 | ✗ | 2 | 93% | |
| `Inferior_vena_cava_abdominal_part.obj` | 下大静脈（腹部） | 130 | 236 | ✗ | 2 | 100% | |
| `Posterior_leaflet_of_left_atrioventricular_valve.obj` | 僧帽弁後尖 | 1,544 | 3,132 | ✓ | 0 | 53% | |
| `Inferior_leaflet_of_right_atrioventricular_valve.obj` | 三尖弁下尖（後尖） | 2,005 | 4,038 | ✓ | 0 | 54% | |
| `Septal_leaflet_of_right_atrioventricular_valve.obj` | 三尖弁中隔尖 | 1,839 | 3,706 | ✓ | 0 | 53% | |
| `Anterior_semilunar_leaflet_of_pulmonary_valve.obj` | 肺動脈弁前半月弁 | 523 | 1,042 | ✓ | 0 | 58% | |
| `Left_semilunar_leaflet_of_pulmonary_valve.obj` | 肺動脈弁左半月弁 | 410 | 816 | ✓ | 0 | 59% | |
| `Right_semilunar_leaflet_of_pulmonary_valve.obj` | 肺動脈弁右半月弁 | 565 | 1,121 | ✗ | 1 | 58% | 微小穴あり |
| `Anterior_papillary_muscle_of_right_ventricle.obj` | 右室前乳頭筋 | 318 | 632 | ✓ | 0 | 80% | |
| `Inferior_papillary_muscle_of_right_ventricle.obj` | 右室下乳頭筋 | 225 | 446 | ✓ | 0 | 81% | |
| `Septal_papillary_muscle_of_right_ventricle.obj` | 右室中隔乳頭筋 | 175 | 346 | ✓ | 0 | 95% | |
| `Inferior_papillary_muscle_of_left_ventricle.obj` | 左室下乳頭筋 | 321 | 638 | ✓ | 0 | 89% | |
| `Inferior_vein_of_left_ventricle.obj` | 左室下静脈（冠状静脈） | 2,468 | 4,840 | ✗ | 8 | 51% | 心内膜シェル様。名称不一致の可能性あり |
| `Inferior_vein_of_left_ventricle___Posterior_''.obj` | 左室後静脈系 | 4,642 | 9,092 | ✗ | 16 | 52% | 非常に多い境界ループ。FBX 名称に異常文字あり (`''`) |

---

## 2. 目標14構造との対照

| 目標構造 | 対応 Z-Anatomy メッシュ | 状態 | 問題点 |
|---------|----------------------|------|--------|
| Right_Atrium | `Right_atrium.obj` | **部分的** | 心内膜面のみ（壁厚ゼロ） |
| Left_Atrium | `Left_atrium.obj` | **部分的** | 心内膜面のみ、ポリゴン数少 |
| Right_Ventricle | `Right_ventricle.obj` | **部分的** | 心内膜面のみ（壁厚ゼロ） |
| Left_Ventricle | `Left_ventricle.obj` | **部分的** | 心内膜面のみ（壁厚ゼロ） |
| Ascending_Aorta | `Ascending_aorta.obj` | **粗い** | 130頂点のみ、切断面が不自然 |
| Pulmonary_Trunk | `Pulmonary_trunk.obj` + `Bifurcation...` | **粗い** | 61頂点のみ |
| Superior_Vena_Cava | `Superior_vena_cava.obj` | **粗い** | 71頂点のみ |
| Inferior_Vena_Cava | `Inferior_vena_cava_thoracic_part.obj` + `...abdominal_part.obj` | **粗い** | |
| Mitral_Valve | `Posterior_leaflet...` のみ | **欠損** | 前尖（anterior leaflet）が存在しない |
| Tricuspid_Valve | `Inferior_leaflet...` + `Septal_leaflet...` のみ | **欠損** | 前尖（anterior leaflet）が存在しない |
| Aortic_Valve | **なし** | **欠損** | Z-Anatomy FBX に大動脈弁尖が含まれない |
| Pulmonary_Valve | `Anterior/Left/Right_semilunar_leaflet...` | **完全** | 3尖すべて存在 |
| Right_Pulmonary_Veins | **なし** | **欠損** | Z-Anatomy FBX に含まれない |
| Left_Pulmonary_Veins | **なし** | **欠損** | Z-Anatomy FBX に含まれない |
| RV_Papillary_Muscles | `Anterior/Inferior/Septal` × 3 | **完全** | |
| LV_Papillary_Muscles | `Inferior_papillary_muscle_of_left_ventricle` のみ | **欠損** | 前乳頭筋（anterior/superior PM）が存在しない |
| Right_Coronary_Artery | **なし** | **欠損** | Z-Anatomy FBX に含まれない |
| Left_Coronary_System | **なし** | **欠損** | Z-Anatomy FBX に含まれない |

---

## 3. 致命的な制約：壁厚ゼロ問題

### 問題の本質

Z-Anatomy の心腔メッシュはすべて**単一面シェル**（ゼロ厚みの表面）である。

```
BodyParts3D / Z-Anatomy いずれも:
  ┌─────────────────┐
  │  実際の心筋壁   │  ← 外膜面（epicardial surface）
  │   ┌─────────┐   │
  │   │  内腔   │   │  ← 心内膜面（endocardial surface）
  │   └─────────┘   │
  └─────────────────┘

提供されているメッシュ:
  [心内膜面のみの1枚シェル] または [心外膜面のみの1枚シェル]
  壁厚: 0 mm
```

**切断したときの外観:**
- 実際の断層エコー像 → 心筋壁が厚い白いバンドとして見える
- 現在のメッシュを切断 → 輪郭線（2D アウトライン）しか見えない

### 法線方向の分析

| 構造 | 外向き法線の割合 | 推定面の種類 |
|------|-------------|-------------|
| Left_ventricle | 43% | 心内膜面（内面が外を向く） |
| Right_ventricle | 36% | 心内膜面 |
| Right_atrium | 53% | 混在（心内膜面主体） |
| Left_atrium | 56% | 混在 |

43% 外向きという値は、メッシュが心内膜面（内腔側から外を向く面）であることを示す。  
これは BodyParts3D の心室空洞メッシュ（FJ2422/FJ2423）と同じ状態。

---

## 4. 欠損構造の詳細

### 4.1 絶対に欠損しているもの

| 構造 | 理由 | 代替案 |
|------|------|--------|
| 大動脈弁尖 | FBX に含まれない | BodyParts3D FJ2426+FJ2431+FJ2435 を使用 |
| 肺静脈（左右） | FBX に含まれない | BodyParts3D FJ2925+... を使用 |
| 右冠動脈 | FBX に含まれない | BodyParts3D FJ2723 を使用 |
| 左冠動脈系 | FBX に含まれない | BodyParts3D FJ2737+... を使用 |
| 左室前乳頭筋 | FBX に含まれない | BodyParts3D FJ2418+FJ2429 を使用 |
| 僧帽弁前尖 | FBX に含まれない | BodyParts3D FJ2420+FJ2432 を使用 |
| 三尖弁前尖 | FBX に含まれない | BodyParts3D FJ2421 を使用 |
| 心室中隔 | FBX に含まれない | RV/LV の分離で代替（BodyParts3D方式） |

### 4.2 存在するが品質問題があるもの

| 構造 | 問題 |
|------|------|
| 上行大動脈 | 130頂点、非常に粗い（BodyParts3D FJ3413: 706頂点） |
| 肺動脈幹 | 61頂点、極めて粗い（BodyParts3D FJ2966 の方が高品質） |
| 上大静脈 | 71頂点のみ |
| `Inferior_vein_of_left_ventricle*` | 名称と実体が不一致の可能性。FBX内での別物体との取り違えが疑われる（8-16 boundary loops は異常） |

---

## 5. 壁厚実現の戦略案

### 案 A: BodyParts3D のみ使用（既存 heart.glb の改良）

- **方法**: 現在の `heart.glb` のまま。`orient_normals_outward()` で外向き法線統一済み。
- **メリット**: 実装済み。安定している。
- **デメリット**: 断面が薄い。切断面に心筋厚みが見えない。

### 案 B: 心外膜面（BodyParts3D）+ 心内膜面（Z-Anatomy）を合成

- **方法**: BP3D の FJ2428（心室外壁）と Z-Anatomy の LV/RV（心内膜面）を結合し、  
  内外2面で閉じたシェルを作る。断面に壁厚が現れる。
- **メリット**: 解剖学的に正確な壁厚（4-12mm）を実現できる。
- **デメリット**: 座標系の統合が必要（BP3D はmm単位, Z-Anatomy はm単位）。  
  位置合わせ（レジストレーション）に手作業が必要な可能性がある。  
  結合面（バルブ開口部）の縫合処理が複雑。

### 案 C: BodyParts3D 壁メッシュの法線オフセットで人工的な厚みを生成

- **方法**: 外壁メッシュを法線方向に内側に 5-10mm オフセットし、  
  両面をつなぐ側面を追加してクローズドメッシュを生成。
- **メリット**: 単一ソースで完結。座標系の問題なし。
- **デメリット**: 解剖学的に不正確（実際の心内腔形状を無視）。  
  オフセット処理で自己交差が生じやすい（特に薄い部位）。

### 推奨

**教育用途（断面の視覚的品質重視）** → 案 B  
**即時実装（安定性重視）** → 案 A（現在の `heart.glb` を活用）

案 B を選択する場合、以下の技術的手順が必要:
1. Z-Anatomy OBJ を BodyParts3D 座標系にスケール変換（×1000）
2. ICP（反復最近傍点）アルゴリズムまたは手動アンカーで位置合わせ
3. 外壁・内壁の法線を対向方向に設定し結合
4. バルブ開口部のエッジを縫合してクローズドメッシュ化

---

## 6. 結論

Z-Anatomy `CardioVascular41.fbx` から取得できる心臓メッシュは**教育用断面表示に必要な壁厚を持たない**。  
すべての心腔メッシュは単一面の心内膜シェルであり、断面カットを行っても心筋壁の厚みは視覚化できない。

現時点での最善策は:

1. **メッシュソースは BodyParts3D を維持**（`heart.glb` の現行構造）
2. Z-Anatomy から得られる追加構造（肺動脈弁3尖、右室乳頭筋3本）を BodyParts3D と座標合わせして補完する（案 B の部分適用）
3. 大動脈弁・僧帽弁前尖・肺静脈・冠動脈は引き続き BodyParts3D から取得

**壁厚問題の根本的解決には、案 B（心外膜 + 心内膜の合成）または Blender での手動モデリング（案D）が必要。**  
ただしユーザーの方針により「AIによる心臓形状の生成禁止」であるため、案 B（既存データの組み合わせ）が唯一の許容手段である。

---

*調査者: Claude Sonnet 4.6 (自動解析) | ソース: Z-Anatomy v4.0 CC BY-SA 4.0, BodyParts3D v4.0 CC BY-SA 2.1 JP*

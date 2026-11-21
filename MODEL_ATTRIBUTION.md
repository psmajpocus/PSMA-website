# MODEL_ATTRIBUTION.md — 3D モデル著作権表示

このファイルはプロジェクトで使用するすべての 3D モデルの出典と著作権情報を記録する。

---

## heart.glb

### 出典

**BodyParts3D** — 解剖学概念 3D 構造データベース

| 項目 | 内容 |
|------|------|
| 提供元 | データベース統合生命科学研究機構（DBCLS）/ 情報システム研究機構（ROIS）、日本 |
| データベース | BodyParts3D / Anatomography |
| バージョン | 4.0（IS-A ツリー, 99%ポリゴン削減済 — `isa_BP3D_4.0_obj_99.zip`） |
| ダウンロード | https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html |
| 論文 | Mitsuhashi N et al. *BodyParts3D: 3D structure database for anatomical concepts.* Nucleic Acids Research 37(Database issue):D782–785, 2009. DOI: 10.1093/nar/gkn613 |

### ライセンス

**Creative Commons Attribution-Share Alike 2.1 Japan**  
https://creativecommons.org/licenses/by-sa/2.1/jp/

**必須表示（ライセンス条件による）:**

> BodyParts3D, © The Database Center for Life Science licensed under  
> CC Attribution-Share Alike 2.1 Japan

### heart.glb に含まれる構造と元ファイル ID

| GLB メッシュ名 | 解剖学的構造（英語） | 構造名（日本語） | FMA ID | ZIP 内ソースファイル |
|---------------|-------------------|--------------|----|----------------|
| `Right_Atrium` | Wall of right atrium | 右心房壁 | FMA9457 | FJ2439.obj |
| `Left_Atrium` | Wall of left atrium | 左心房壁 | FMA9531 | FJ2438.obj |
| `Right_Ventricle` | Wall of right ventricle (derived) | 右心室壁 | FMA13884 | FJ2428.obj（部分、下記注参照） |
| `Left_Ventricle` | Wall of left ventricle (derived) | 左心室壁 | FMA13884 | FJ2428.obj（部分、下記注参照） |
| `Ascending_Aorta` | Ascending aorta | 上行大動脈 | FMA3736 | FJ3413.obj |
| `Pulmonary_Trunk` | Pulmonary trunk | 肺動脈幹 | FMA8612 | FJ2966.obj |
| `Superior_Vena_Cava` | Superior vena cava | 上大静脈 | FMA4720 | FJ3645.obj |
| `Inferior_Vena_Cava` | Inferior vena cava | 下大静脈 | FMA10951 | FJ3441.obj + FJ3659.obj（統合・クリップ済） |
| `Mitral_Valve` | Mitral valve | 僧帽弁 | FMA7241 | FJ2420.obj + FJ2432.obj |
| `Tricuspid_Valve` | Tricuspid valve | 三尖弁 | FMA7237 | FJ2421.obj + FJ2433.obj + FJ2436.obj |
| `Aortic_Valve` | Aortic valve | 大動脈弁 | FMA7251 | FJ2426.obj + FJ2431.obj + FJ2435.obj |
| `Pulmonary_Valve` | Pulmonary valve | 肺動脈弁 | FMA7248 | FJ2417.obj + FJ2427.obj + FJ2434.obj |
| `Right_Pulmonary_Veins` | Right pulmonary veins | 右肺静脈 | FMA49914 | FJ3020.obj + FJ3040.obj |
| `Left_Pulmonary_Veins` | Left pulmonary veins | 左肺静脈 | FMA49916 | FJ2925.obj + FJ2933.obj + FJ2944.obj + FJ2950.obj + FJ2955.obj |
| `RV_Papillary_Muscles` | Papillary muscles of right ventricle | 右室乳頭筋 | FMA7260 | FJ2419.obj + FJ2430.obj + FJ2437.obj |
| `LV_Papillary_Muscles` | Papillary muscles of left ventricle | 左室乳頭筋 | FMA7264 | FJ2418.obj + FJ2429.obj |
| `Right_Coronary_Artery` | Right coronary artery | 右冠動脈 | FMA3802 | FJ2723.obj |
| `Left_Coronary_System` | Left coronary system | 左冠動脈系 | FMA3855 | FJ2737.obj + FJ2631.obj + FJ2649.obj |

> **心室壁分離に関する注記**: BodyParts3D 4.0 は右心室壁と左心室壁の別々のサーフェスメッシュを提供しない。  
> 心室壁は単一の統合メッシュ（FJ2428, FMA13884）として提供される。  
> 本モデルでは `Right_Ventricle` と `Left_Ventricle` を、右心室空洞（FJ2423）と左心室空洞（FJ2422）の重心への距離に基づく近傍割り当てにより FJ2428 の面を分割して生成している。

### 適用した変更

1. ポリゴン数を元の1%に削減（DBCLS が実施。削減済みバージョンを直接ダウンロード、追加の削減は行っていない）。
2. 複数の OBJ ファイルを統合し、18個の名前付きメッシュノードを持つ単一の GLB（glTF 2.0）バイナリファイルとして出力。
3. 解剖学的構造ごとに異なるフラット PBR ベースカラーを割り当て（教育的可視化用途）。
4. 記述的なメッシュノード名を付加（例: `Right_Atrium`, `Ascending_Aorta`, `Mitral_Valve`）。
5. 下大静脈の2パーツメッシュ（FJ3441 + FJ3659）を1つの名前付きノードに結合し、右心房下縁から45mm下でクリップして過剰に長い遠位部を除去。
6. 統合心室壁メッシュ（FJ2428）を重心距離ヒューリスティックにより `Right_Ventricle` と `Left_Ventricle` のサブメッシュに分割。
7. 心臓弁尖（各弁 3〜5 OBJ パーツ）を弁ごとに1ノードに結合。
8. `fix_normals()` および重心基準法線反転処理（`orient_normals_outward()`）により、心房壁・心室壁・大血管の法線を外向きに統一。

IVC クリップを除き、元のジオメトリへの構造的変更は行っていない。  
CC BY-SA 2.1 Japan の条件に基づき、再配布または派生物には上記の必須表示を再掲すること。

---

## （予定）heart_master.glb

### 出典

現在調査中。`MODEL_GAP_REPORT.md` を参照。

Z-Anatomy を補助ソースとして使用する場合は以下の表示が必要:

**Z-Anatomy v4.0**  
ライセンス: **Creative Commons Attribution-Share Alike 4.0 International (CC BY-SA 4.0)**  
https://creativecommons.org/licenses/by-sa/4.0/

**必須表示（ライセンス条件による）:**

> Z-Anatomy, © Jean-Marc Vital et al., licensed under CC Attribution-Share Alike 4.0 International  
> Source: https://www.z-anatomy.com

| 項目 | 内容 |
|------|------|
| プロジェクト名 | Z-Anatomy |
| 主要著者 | Jean-Marc Vital, Thomas Lacoste, Emilien Benquet |
| バージョン | 4.0 |
| 公式サイト | https://www.z-anatomy.com |
| GitHub | https://github.com/LluisV/Z-Anatomy |
| ライセンス | CC BY-SA 4.0 |

> **注意**: CC BY-SA 4.0（Z-Anatomy）はより強いコピーレフト条項を持つ。  
> BodyParts3D（CC BY-SA 2.1 Japan）と組み合わせる場合、派生物全体が CC BY-SA 4.0 の条件に従う必要がある可能性がある。法的確認を推奨する。

---

*最終更新: 2026-09-25*

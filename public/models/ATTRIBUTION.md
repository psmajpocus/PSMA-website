# 3D Model Attribution

## heart.glb

### Source

**BodyParts3D** — 3D structure database for anatomical concepts

| Item | Detail |
|------|--------|
| Provider | Database Center for Life Science (DBCLS), Research Organization of Information and Systems (ROIS), Japan |
| Database | BodyParts3D / Anatomography |
| Version | 4.0 (IS-A tree, 99% polygon reduction — `isa_BP3D_4.0_obj_99.zip`) |
| Download | <https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html> |
| Publication | Mitsuhashi N et al. *BodyParts3D: 3D structure database for anatomical concepts.* Nucleic Acids Research 37(Database issue):D782–785, 2009. DOI: [10.1093/nar/gkn613](https://doi.org/10.1093/nar/gkn613) |

### License

**Creative Commons Attribution-Share Alike 2.1 Japan**  
<https://creativecommons.org/licenses/by-sa/2.1/jp/>

**Required attribution notice (required by the license):**

> BodyParts3D, © The Database Center for Life Science licensed under  
> CC Attribution-Share Alike 2.1 Japan

### Included Structures and Source File IDs

| Mesh name in heart.glb | Anatomical structure (English) | 構造名（日本語） | FMA ID | Source file(s) in ZIP |
|------------------------|-------------------------------|----------------|--------|----------------------|
| `Right_Atrium` | Wall of right atrium | 右心房壁 | FMA9457 | FJ2439.obj |
| `Left_Atrium` | Wall of left atrium | 左心房壁 | FMA9531 | FJ2438.obj |
| `Right_Ventricle` | Wall of right ventricle (derived) | 右心室壁 | FMA13884 | FJ2428.obj (partial — see note) |
| `Left_Ventricle` | Wall of left ventricle (derived) | 左心室壁 | FMA13884 | FJ2428.obj (partial — see note) |
| `Ascending_Aorta` | Ascending aorta | 上行大動脈 | FMA3736 | FJ3413.obj |
| `Pulmonary_Trunk` | Pulmonary trunk | 肺動脈幹 | FMA8612 | FJ2966.obj |
| `Superior_Vena_Cava` | Superior vena cava | 上大静脈 | FMA4720 | FJ3645.obj |
| `Inferior_Vena_Cava` | Inferior vena cava | 下大静脈 | FMA10951 | FJ3441.obj + FJ3659.obj (merged, clipped) |
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

> **Note on ventricular wall separation**: BodyParts3D 4.0 does not provide separate surface meshes for the right ventricle and left ventricle. The ventricular walls are provided as a single combined mesh (FJ2428, FMA13884). In this model, `Right_Ventricle` and `Left_Ventricle` are derived by partitioning the faces of FJ2428 based on proximity to the centroid of the right ventricle cavity (FJ2423) vs. left ventricle cavity (FJ2422) respectively.

### Modifications Applied

1. Polygon count reduced to 1% of original (performed by DBCLS; the pre-reduced version was downloaded directly — no further decimation applied here).
2. Multiple OBJ files merged and exported as a single binary GLB (glTF 2.0) file with 18 named mesh nodes.
3. A distinct flat PBR base-colour assigned to each anatomical structure for educational visualisation.
4. Descriptive mesh node names added (e.g. `Right_Atrium`, `Ascending_Aorta`, `Mitral_Valve`).
5. The two-part inferior vena cava mesh (FJ3441 + FJ3659) concatenated into one named node, then clipped at 45 mm below the inferior edge of the right atrium to remove the excessively long distal segment.
6. The combined ventricular wall mesh (FJ2428) algorithmically partitioned into `Right_Ventricle` and `Left_Ventricle` sub-meshes using centroid-distance heuristic (see note above).
7. Heart valve leaflets (3–5 OBJ parts each) concatenated into single nodes per valve.

No structural geometry was altered beyond the IVC clip described in item 5. The required attribution above must be reproduced in any redistribution or derivative work under the CC BY-SA 2.1 Japan terms.

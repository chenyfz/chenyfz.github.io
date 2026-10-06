import { Material, Texture, type Object3D, type Mesh } from 'three';
export function disposeMaterials(materials: Material[]) {
  const textures = new Set<Texture>();
  for (const material of new Set(materials)) {
    for (const value of Object.values(material)) if (value instanceof Texture) textures.add(value);
    material.dispose();
  }
  textures.forEach(texture => texture.dispose());
  return textures;
}
export function disposeModel(root: Object3D) {
  const materials: Material[] = [];
  const geometries = new Set<Mesh['geometry']>();
  root.traverse(node => {
    const mesh = node as Mesh;
    if (!mesh.isMesh) return;
    geometries.add(mesh.geometry);
    materials.push(...(Array.isArray(mesh.material) ? mesh.material : [mesh.material]));
  });
  geometries.forEach(geometry => geometry.dispose());
  return disposeMaterials(materials);
}

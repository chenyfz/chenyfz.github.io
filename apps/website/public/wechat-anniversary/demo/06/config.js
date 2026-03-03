/**
 * 黄铜
 */
const brass = {
  name: 'brass',
  metalness: 0.95,
  roughness: 0.1,
  color: 0xf7c663
}

/**
 * 紫铜
 */
const copper = {
  name: 'copper',
  metalness: 0.95,
  roughness: 0.1,
  color: 0xE68754
}

/**
 * 铝
 */
const aluminium = {
  name: 'aluminum',
  metalness: 0.95,
  roughness: 0.1,
  color: 0xd0d4dd
}

/**
 * 亚克力材质
 */
const acrylic = {
  name: 'acrylic',
  roughness: 0,
  transparent: true,
  metalness: 0.7,
  opacity: 0.5,
  // depthWrite: false,
  color: 0xffffff
}

/**
 * 亚克力材质背面
 */
const acrylicBack = {
  name: 'acrylicBack',
  roughness: 0,
  transparent: true,
  // depthWrite: false,
  metalness: 0.5,
  opacity: 0.3,
  color: 0xffffff
}

// const materialConfigs = { brass, copper, aluminium, acrylicacrylic, acrylicBack }
const materialConfigs = { brass, copper, aluminium }
const materialNames = Object.keys(materialConfigs)

export {
  materialConfigs,
  materialNames
}

let registry;
try {
    registry = require('@react-native/assets/registry');
}
catch {
    registry = require('@react-native/assets-registry/registry');
}
const registerAssetImport = registry.registerAssetImport;
const getAssetByIDImport = registry.getAssetByID;
export { registerAssetImport as registerAsset };
export { getAssetByIDImport as getAssetByID };
export default registry;
//# sourceMappingURL=ReactNativeCompatibleAssetsRegistry.js.map
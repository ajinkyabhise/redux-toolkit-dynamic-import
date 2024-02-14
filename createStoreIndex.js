function createStoreIndex(moduleNames) {
  const importStatements = moduleNames.map(moduleName => `import ${moduleName}Slice from './${moduleName}/${moduleName}Slice';`).join('\n');

  return `
    import { configureStore } from '@reduxjs/toolkit';
    import { combineReducers } from 'redux'

    ${importStatements}

    const reducer = combineReducers({
      ${moduleNames.map(moduleName => `${moduleName}Slice`).join(',\n      ')}
    });

    const store = configureStore({
      reducer
    });

    export default store;
  `;
}

module.exports = createStoreIndex;

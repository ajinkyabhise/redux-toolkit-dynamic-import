const fs = require('fs');
const createStoreIndex = require('./createStoreIndex');
const httpServer = require('./httpServer');
const createService = require('./createService');
const createSlice = require('./createSlice');

function generateStoreFiles(moduleNames) {

  moduleNames.forEach(moduleName => {
    //path for index file, service and slice for each model
    const folderPath = `./store/${moduleName.toLowerCase()}`;
    const serviceFilePath = `${folderPath}/${`${moduleName.toLowerCase()}Service`}.js`;
    const sliceFilePath = `${folderPath}/${`${moduleName.toLowerCase()}Slice`}.js`;

    //sync store folder
    fs.mkdirSync(folderPath, { recursive: true });

    //create service file for each model
    const serviceFileContent = new createService(moduleName);
    const generatedService = serviceFileContent.generateService();
    fs.writeFileSync(serviceFilePath, generatedService);

    //create slice file for each model
    const sliceFileContent = new createSlice(moduleName);
    const generatedSlice = sliceFileContent.generateSlice();
    fs.writeFileSync(sliceFilePath, generatedSlice);
  });

    //create store folder and main index file of store
    const storeIndex = './store/index.js';
    const storeFileContent = createStoreIndex(moduleNames);
    fs.writeFileSync(storeIndex, storeFileContent);

    //create http server file for api call requests and responses
    const http_server = './store/httpServer.js';
    const httpServerFileContent = httpServer();
    fs.writeFileSync(http_server, httpServerFileContent);

}

module.exports = generateStoreFiles;
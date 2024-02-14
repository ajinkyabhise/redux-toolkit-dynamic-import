// function capitalizeModule(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }
  
//   function createService(moduleName) {
//     const serviceEndpoint = moduleName.toLowerCase();
//     const module = capitalizeModule(moduleName);
  
//     return `import http from "../httpServer";
  
//   const Create${module} = (data) => {
//     return http.post("/${serviceEndpoint}/add", data);
//   };
  
//   const Get${module} = () => {
//       return http.get("/${serviceEndpoint}/get");
//   };
  
//   const GetById${module} = (id) => {
//       return http.get(\`/${serviceEndpoint}/get/\${id}\`);
//   };
  
//   const DeleteById${module} = (id) => {
//     return http.delete(\`/${serviceEndpoint}/delete/\${id}\`);
//   };
  
//   const Update${module} = (data, id) => {
//       return http.put(\`/${serviceEndpoint}/update/\${id}\`, data);
//   };
  
//   const ${module}Service = {
//     Create${module},
//     Get${module},
//     GetById${module},
//     Update${module},
//     DeleteById${module}
//   };
  
//   export default ${module}Service;`;
//   }
  
//   module.exports = createService;


class createService {
  constructor(moduleName) {
    this.moduleName = moduleName;
  }
    capitalizeModule(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    generateService() {
      const serviceEndpoint = this.moduleName.toLowerCase();
      const module = this.capitalizeModule(this.moduleName);
  
      return `
import http from "../httpServer";

class ${module}Service {
  static create(data) {
    return http.post("/${serviceEndpoint}/add", data);
  }

  static get() {
    return http.get("/${serviceEndpoint}/get");
  }

  static getById(id) {
    return http.get("/${serviceEndpoint}/get/" + id);
  }

  static deleteById(id) {
    return http.delete("/${serviceEndpoint}/delete/" + id);
  }

  static update(data, id) {
    return http.put("/${serviceEndpoint}/update/" + id, data);
  }
}

export default ${module}Service;`;
    }
  }
  
  module.exports = createService;
  
  
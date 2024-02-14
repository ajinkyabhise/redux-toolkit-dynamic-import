// function capitalizeModule(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }

// function createSlice(moduleName){
//     const module = capitalizeModule(moduleName);
//     return`import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    
    
//     import ${moduleName}Service from "./${moduleName}Service";
    
//     const initialState = {
//       ${module} : [],
//       ${module}Add: {},
//       ${module}Update: {},
//       ${module}Delete: {},
//       current${module}: null,
//       status: 'idle',
//       error: null,
//     };
    
//     // Async thunk for creating a new ${module}
//     export const create${module} = createAsyncThunk('${module}/add', async (${module}Data) => {
//       const response = await ${moduleName}Service.Create${module}(${module}Data);
//       return response.data;
//     });
    
//     // Async thunk for fetching all ${module}
//     export const get${module} = createAsyncThunk('${module}/get', async () => {
//       const response = await ${moduleName}Service.Get${module}();
//       return response.data;
//     });
    
//     // Async thunk for fetching a ${module} by ID
//     export const get${module}ById = createAsyncThunk('${module}/get/:id', async (${module}Id) => {
//       const response = await ${moduleName}Service.GetById${module}(${module}Id);
//       return response.data;
//     });
    
//     export const delete${module}ById = createAsyncThunk('${module}/delete/:id', async (${module}Id) => {
//       const response = await ${moduleName}Service.DeleteById${module}(${module}Id);
//       return response.data;
//     });
    
//     // Async thunk for editing a ${module}
//     export const edit${module} = createAsyncThunk('${module}/update', async ({ data, id }) => {
//       const response = await ${moduleName}Service.Update${module}(data, id);
//       return response.data;
//     });
    
//     const ${module}Slice = createSlice({
//       name: '${module}',
//       initialState,
//       reducers: {
//         clearState: (state) => {
//           // Reset the state to its initial values
//           state.${module} = [];
//           state.${module}Add = {};
//           state.${module}Update = {};
//           state.${module}Delete = {};
//           state.current${module} = null;
//           state.status = 'idle';
//           state.error = null;
//         },
//       },
//       extraReducers: (builder) => {
//         builder
//           .addCase(create${module}.pending, (state) => {
//             state.status = 'loading';
//           })
//           .addCase(create${module}.fulfilled, (state, action) => {
//             state.status = 'succeeded';
//             state.${module}Add = action.payload;
//           })
//           .addCase(create${module}.rejected, (state, action) => {
//             state.status = 'failed';
//             state.error = action.error.message ?? 'Failed to create ${module}';
//           })
//           .addCase(get${module}.pending, (state) => {
//             state.status = 'loading';
//           })
//           .addCase(get${module}.fulfilled, (state, action) => {
//             state.status = 'succeeded';
//             state.${module} = action.payload;
//           })
//           .addCase(get${module}.rejected, (state, action) => {
//             state.status = 'failed';
//             state.error = action.error.message ?? 'Failed to fetch ${module}';
//           })
//           .addCase(get${module}ById.pending, (state) => {
//             state.status = 'loading';
//           })
//           .addCase(get${module}ById.fulfilled, (state, action) => {
//             state.status = 'succeeded';
//             state.current${module} = action.payload;
//           })
//           .addCase(get${module}ById.rejected, (state, action) => {
//             state.status = 'failed';
//             state.error = action.error.message ?? 'Failed to fetch ${module} by ID';
//           })
//           .addCase(edit${module}.pending, (state) => {
//             state.status = 'loading';
//           })
//           .addCase(edit${module}.fulfilled, (state, action) => {
//             state.status = 'succeeded';
//             state.${module}Update = action.payload;
//           })
//           .addCase(edit${module}.rejected, (state, action) => {
//             state.status = 'failed';
//             state.error = action.error.message ?? 'Failed to edit ${module}';
//           })
//           .addCase(delete${module}ById.pending, (state) => {
//             state.status = 'loading';
//           })
//           .addCase(delete${module}ById.fulfilled, (state, action) => {
//             state.status = 'succeeded';
//             state.${module}Delete = action.payload;
//           })
//           .addCase(delete${module}ById.rejected, (state, action) => {
//             state.status = 'failed';
//             state.error = action.error.message ?? 'Failed to fetch ${module} by ID';
//           });
//       },
//     });
    
//     export const { clearState } = ${module}Slice.actions;
    
//     export default ${module}Slice.reducer;
//     `
// }

// module.exports = createSlice;


class createSlice {
    constructor(moduleName) {
      this.moduleName = moduleName;
    }
  
    capitalizeModule(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    createAsyncThunk(type, serviceName, actionName) {
      return `
        export const ${actionName} = createAsyncThunk('${type}', async (data) => {
          const response = await ${serviceName}.${actionName}(data);
          return response.data;
        });
      `;
    }
  
    generateAsyncThunks() {
      const asyncThunks = [
        { type: 'add', actionName: 'create', serviceName: `${this.moduleName}Service` },
        { type: 'get', actionName: 'get', serviceName: `${this.moduleName}Service` },
        { type: 'get/:id', actionName: 'getById', serviceName: `${this.moduleName}Service` },
        { type: 'delete/:id', actionName: 'deleteById', serviceName: `${this.moduleName}Service` },
        { type: 'update', actionName: 'update', serviceName: `${this.moduleName}Service` },
      ];
  
      return asyncThunks.map((thunk) => this.createAsyncThunk(thunk.type, thunk.serviceName, thunk.actionName)).join('\n');
    }

    generateExtraReducers() {
        return `
          extraReducers: (builder) => {
            builder
            .addCase(create.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(create.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.${this.moduleName}Add = action.payload;
            })
            .addCase(create.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to create ${this.moduleName}';
            })
            .addCase(get.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(get.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.${this.moduleName} = action.payload;
            })
            .addCase(get.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Failed to fetch ${this.moduleName}';
            })
            .addCase(getById.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(getById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.${this.moduleName}Current = action.payload;
            })
            .addCase(getById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Failed to fetch ${this.moduleName} by ID';
            })
            .addCase(update.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(update.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.${this.moduleName}Update = action.payload;
            })
            .addCase(update.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Failed to edit ${this.moduleName}';
            })
            .addCase(deleteById.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(deleteById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.${this.moduleName}Delete = action.payload;
            })
            .addCase(deleteById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Failed to fetch ${this.moduleName} by ID';
            });
          },
        `;
      };
  
    generateSlice() {
      const module = this.capitalizeModule(this.moduleName);
  
      return `
        import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
        import ${this.moduleName}Service from "./${this.moduleName}Service";
  
        const initialState = {
          ${this.moduleName}: [],
          ${this.moduleName}Add: {},
          ${this.moduleName}Update: {},
          ${this.moduleName}Delete: {},
          ${module}Current : null,
          status: 'idle',
          error: null,
        };
  
        ${this.generateAsyncThunks()}
  
        const ${this.moduleName}Slice = createSlice({
          name: '${this.moduleName}',
          initialState,
          reducers: {
            clearState: (state) => {
              state.${this.moduleName} = [];
              state.${this.moduleName}Add = {};
              state.${this.moduleName}Update = {};
              state.${this.moduleName}Delete = {};
              state.${module}Current = null;
              state.status = 'idle';
              state.error = null;
            },
          },
          ${this.generateExtraReducers()}
        });
  
        export const { clearState } = ${this.moduleName}Slice.actions;
  
        export default ${this.moduleName}Slice.reducer;
      `;
    }
  }
  
  module.exports = createSlice;
  
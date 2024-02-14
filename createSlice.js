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
  
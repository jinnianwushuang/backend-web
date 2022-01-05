/*
 * @Date           : 2020-09-21 21:31:45
 * @FilePath       : /src/store/module/window_size.store.js
 * @Description    : 
 */
export default {
   
    state: ()=>{
      window_size: {}
    },
    getters: {
      get_window_size(state) {
        return state.window_size;
      }
    },
    actions: {
      set_window_size({ state, dispatch, commit }, window_size) {
        commit("set_window_size", window_size);
      }
    },
    mutations: {
      set_window_size(state, window_size) {
        state.window_size = window_size;
      }
    }
  };
  
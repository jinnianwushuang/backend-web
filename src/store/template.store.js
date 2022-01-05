/*
 * @Date           : 2020-09-21 21:14:35
 * @FilePath       : /src/store/template.store.js
 * @Description    : 模板 store
 */
export default {
  state: ()=>{
    template: "1"
  },
  getters: {
    get_template(state) {
      return state.template;
    }
  },
  actions: {
    set_template({ state, dispatch, commit }, template) {
      commit("set_template", template);
    }
  },
  mutations: {
    set_template(state, template) {
      state.template = template;
    }
  }
};

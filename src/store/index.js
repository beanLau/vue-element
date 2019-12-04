import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

const requireAll = val => val.keys().map(val);
const req = require.context("./modules", true, /\.js/);
let modules = {};
requireAll(req).map(curr => {
  let name = curr.default.name;
  modules[name] = curr.default;
});

Vue.use(Vuex);
export default new Vuex.Store({
  modules,
  getters
});

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const http = axios.create({
  baseURL: "/api",
});

export const store = new Vuex.Store({
  state: {
    wait: false,
    auth: localStorage.getItem("auth"),
  },
  getters: {
    auth: (state) => state.auth,
  },
  mutations: {
    UPDATE_AUTH(state, payload) {
      localStorage.setItem("auth", payload);
      state.auth = payload;
    },
  },
  actions: {
    updateToken({ commit }) {
      if (localStorage.getItem("user")) {
        http
          .post("/checkToken", {
            name: JSON.parse(localStorage.getItem("user")).name,
            token: localStorage.getItem("jwt"),
          })
          .then((resp) => {
            //console.log(resp.data)
            if (resp.data.status === 403) {
              commit("UPDATE_AUTH", false);
              localStorage.removeItem("user");
              localStorage.removeItem("auth");
              localStorage.removeItem("jwt");
            }
          });
      } else {
        localStorage.removeItem("auth");
        localStorage.removeItem("jwt");
      }
    },
  },
});

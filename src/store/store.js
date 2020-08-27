import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    userData: null
  },
  mutations: {
    authUser(state, payload) {
      state.token = payload.token;
      state.userData = payload.user;
    },
    clearUser(state) {
      state.token = null;
      state.userData = null;
    }
  },
  getters: {
    userLoggedIn(state) {
      return state.token !== null;
    },
    token(state) {
      return state.token;
    },
    userData(state) {
      return state.userData;
    },
    isAdmin(state) {
      return state.userData.role === "admin" ? true : false;
    }
  },
  actions: {
    login(context, payload) {
      context.commit("authUser", payload);
      context.dispatch("setLogOutTimer", payload.expiresIn);
      context.dispatch("storeUserLocalStorage", payload);
    },
    storeUserLocalStorage(context, payload) {
      const expirationDate = new Date(Date.now() + payload.expiresIn * 1000);
      payload.expiresAt = expirationDate;
      localStorage.setItem("userData", JSON.stringify(payload));
    },
    logOut(context) {
      context.commit("clearUser");
      localStorage.removeItem("userData");
    },
    setLogOutTimer(context, time) {
      setTimeout(() => {
        context.dispatch("logOut");
      }, time * 1000);
    },
    tryAutoLogin(context) {
      const ls = localStorage.getItem("userData");
      if (ls) {
        const data = JSON.parse(ls);
        const expirationDate = new Date(data.expiresAt);
        const now = new Date();
        const difference = expirationDate.getTime() - now.getTime();

        if (difference > 0) {
          data.expiresIn = Math.round(difference / 1000);
          context.dispatch("login", data);
        } else {
          localStorage.removeItem("userData");
        }
      }
    }
  }
});

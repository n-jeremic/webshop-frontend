import Vue from "vue";
import axios from "axios";
import VueToastr2 from "vue-toastr-2";
import Vuelidate from "vuelidate";

import App from "./App";
import router from "./router";
import store from "./store/store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-toastr-2/dist/vue-toastr-2.min.css";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://127.0.0.1:3000/api";

window.toastr = require("toastr");
Vue.use(VueToastr2, {
  positionClass: "toast-top-right"
});
Vue.use(Vuelidate);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

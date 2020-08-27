import Vue from "vue";
import Router from "vue-router";

import store from "../store/store";
import Profile from "../components/profile/Profile.vue";
import Orders from "../components/profile/Orders.vue";
import Ratings from "../components/profile/Ratings.vue";
import Favourites from "../components/profile/Favourites.vue";
import Administration from "../components/profile/admin/Administration.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/profile",
      component: Profile,
      redirect: "/profile/orders",
      children: [
        { path: "orders", component: Orders },
        { path: "favourites", component: Favourites },
        { path: "ratings", component: Ratings },
        {
          path: "administration",
          component: Administration,
          beforeEnter(to, from, next) {
            if (store.state.userData.role === "admin") {
              next();
            } else {
              next(false);
            }
          }
        }
      ],
      beforeEnter(to, from, next) {
        if (store.state.token) {
          next();
        } else {
          next(false);
        }
      }
    }
  ],
  mode: "history"
});

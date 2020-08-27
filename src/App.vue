<template>
  <div class="container-fluid">
    <div class="row" id="main-row">
      <div class="col-2">
        <app-auth-nav></app-auth-nav>
        <app-main-nav></app-main-nav>
      </div>
      <div class="col-1"></div>
      <div class="col-8">
        <router-view class="card shadow"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MainNavigation from "./components/navigation/MainNavigation.vue";
import AuthNavigation from "./components/navigation/AuthNavigation.vue";

export default {
  components: {
    appMainNav: MainNavigation,
    appAuthNav: AuthNavigation
  },
  beforeCreate() {
    this.$store.dispatch("tryAutoLogin");
  }
};
</script>

<style scoped>
#main-row {
  padding: 20px 0px;
}

.card {
  padding: 30px;
  color: #404040;
}
</style>

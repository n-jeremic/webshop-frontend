<template>
  <div @mouseleave="hovered = false">
    <div class="row" :class="[{border: userLoggedIn}, {'shadow-sm': userLoggedIn}]">
      <div class="col-4">
        <i class="fas fa-user-circle" @mouseover="hovered = true" :class="{'blue-font': hovered}"></i>
      </div>
      <div class="col-8" v-if="hovered && !userLoggedIn">
        <button
          class="btn btn-primary btn-sm btn-block"
          data-toggle="modal"
          data-target="#loginModal"
        >Sign in</button>
        <button
          class="btn btn-outline-primary btn-sm btn-block"
          data-toggle="modal"
          data-target="#registrationModal"
        >Register</button>
      </div>
      <div class="col-8" v-if="userLoggedIn" @mouseover="hovered = true">
        <p :class="{'blue-font': hovered}">{{ userData.firstName }}</p>
        <p :class="{'blue-font': hovered}">{{ userData.lastName }}</p>
      </div>
      <div class="col-12" v-if="userLoggedIn && hovered">
        <button
          class="btn btn-primary btn-sm btn-block"
          @click="redirectToProfile"
          :disabled="$route.path.startsWith('/profile')"
        >View Profile</button>
        <button class="btn btn-outline-primary btn-sm btn-block" @click="logOut">Sign Out</button>
      </div>
    </div>
    <div v-if="!userLoggedIn">
      <app-login-modal></app-login-modal>
      <app-registration-modal></app-registration-modal>
    </div>
  </div>
</template>

<script>
import LoginModal from "./LoginModal.vue";
import RegistrationModal from "./RegistrationModal.vue";

export default {
  data() {
    return {
      hovered: false
    };
  },
  computed: {
    userLoggedIn() {
      return this.$store.getters.userLoggedIn;
    },
    userData() {
      return this.$store.getters.userData;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
      this.$toastr.warning("User has logged out!", "Warning");
      this.hovered = false;

      if (this.$route.path.startsWith("/profile")) {
        this.$router.push("/");
      }
    },
    redirectToProfile() {
      this.$router.push("/profile");
      this.hovered = false;
    }
  },
  components: {
    appLoginModal: LoginModal,
    appRegistrationModal: RegistrationModal
  }
};
</script>

<style scoped>
i {
  font-size: 70px;
}

.col-12 {
  margin-top: 20px;
}

.border {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0 0.25rem 0.25rem 0;
  padding: 10px 0px;
}

.blue-font {
  color: #007bff;
}

i:hover {
  cursor: pointer;
}

p {
  margin-bottom: 0px !important;
  font-size: 23px;
}

p:hover {
  cursor: pointer;
}
</style>
<template>
  <div
    class="modal fade"
    id="loginModal"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-uppercase">Sign in to your account</h5>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control shadow-sm"
            style="margin-bottom: 20px"
            placeholder="Email address..."
            v-model="email"
          />
          <input
            type="password"
            class="form-control shadow-sm"
            style="margin-top: 20px"
            placeholder="Password..."
            v-model="password"
          />
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-outline-primary btn-sm"
            :disabled="loading"
            @click="hideModal"
          >Cancel</button>
          <button
            class="btn btn-primary btn-sm"
            @click="login"
            :disabled="!email || !password || loading"
          >Sign in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  data() {
    return {
      email: undefined,
      password: undefined,
      errorMessage: undefined,
      loading: false
    };
  },
  methods: {
    async login() {
      this.errorMessage = undefined;
      this.loading = true;

      try {
        const response = await axios({
          url: "/users/login",
          method: "POST",
          data: {
            email: this.email,
            password: this.password
          }
        });

        if (response.data.status === "success") {
          this.$store.dispatch("login", {
            user: response.data.data.user,
            token: response.data.token,
            expiresIn: response.data.expiresIn
          });
          this.hideModal();
          this.toastSuccess(response.data.data.user);
        }
      } catch (err) {
        this.errorMessage = err.response.data.message;
      }

      this.loading = false;
    },
    hideModal() {
      this.email = undefined;
      this.password = undefined;
      this.errorMessage = undefined;
      $("#loginModal").modal("hide");
    },
    toastSuccess(userData) {
      const message = `Logged in as ${
        userData.role === "admin"
          ? "Administrator!"
          : userData.firstName + " " + userData.lastName + "!"
      }`;
      this.$toastr.success(message, "Info");
    }
  }
};
</script>

<style scoped>
.modal-title {
  margin: auto;
}

p {
  margin-top: 15px;
  margin-bottom: 0px !important;
  text-align: center;
  color: red;
  font-size: 18px;
}
</style>
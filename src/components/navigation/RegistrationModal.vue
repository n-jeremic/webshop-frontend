<template>
  <div
    class="modal fade"
    id="registrationModal"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-uppercase">Registration form</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <label for="firstName">First name:</label>
              <input
                type="text"
                class="form-control shadow-sm"
                :class="{'is-invalid': $v.firstName.$error}"
                id="firstName"
                v-model="firstName"
                @blur="$v.firstName.$touch()"
              />
              <div
                class="invalid-feedback"
                v-if="$v.firstName.$error"
              >Please provide your first name.</div>
            </div>
            <div class="col-6">
              <label for="lastName">Last name:</label>
              <input
                type="text"
                class="form-control shadow-sm"
                :class="{'is-invalid': $v.lastName.$error}"
                id="lastName"
                v-model="lastName"
                @blur="$v.lastName.$touch()"
              />
              <div class="invalid-feedback" v-if="$v.lastName.$error">Please provide your last name.</div>
            </div>
          </div>
          <div>
            <label for="email" class="mt-3">Email address:</label>
            <input
              autocomplete="off"
              type="text"
              class="form-control shadow-sm"
              :class="[{'is-invalid': $v.email.$error}, {'is-valid': !$v.email.$error && !$v.email.$invalid}]"
              id="email"
              v-model="email"
              @blur="$v.email.$touch()"
            />
            <div
              class="invalid-feedback"
              v-if="!$v.email.email"
            >Please provide a valid email address.</div>
            <div class="invalid-feedback" v-if="!$v.email.required">Please provide an email address.</div>
            <div
              class="invalid-feedback"
              v-if="!$v.email.unique"
            >This email address already exists in database.</div>
            <div class="valid-feedback" v-if="!$v.email.$error && !$v.email.$invalid">Looks good!</div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <label for="password">Password:</label>
              <input
                type="password"
                class="form-control shadow-sm"
                :class="[{'is-invalid': $v.password.$error}, {'is-valid': !$v.password.$error && !$v.password.$invalid}]"
                id="password"
                @blur="$v.password.$touch()"
                v-model="password"
              />
              <div
                class="invalid-feedback"
                v-if="!$v.password.required"
              >Please provide your password.</div>
              <div
                class="invalid-feedback"
                v-if="!$v.password.minLength"
              >It has to be at least 7 characters long.</div>
              <div class="valid-feedback" v-if="!$v.password.$error">Looks good!</div>
            </div>
            <div class="col-6">
              <label for="passConfirm">Confirm password:</label>
              <input
                type="password"
                class="form-control shadow-sm"
                :class="[{'is-invalid': $v.passwordConfirm.$error}, {'is-valid': !$v.passwordConfirm.$invalid && $v.passwordConfirm.sameAs}]"
                id="passConfirm"
                v-model="passwordConfirm"
                @input="$v.passwordConfirm.$touch()"
              />
              <div class="invalid-feedback" v-if="$v.passwordConfirm.$error">Passwords do not match.</div>
              <div class="valid-feedback" v-if="$v.passwordConfirm.sameAs">Looks good!</div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-outline-primary btn-sm"
            :disabled="loading"
            @click="hideModal"
          >Cancel</button>
          <button
            class="btn btn-primary btn-sm"
            :disabled="$v.$invalid || loading"
            @click="register"
          >Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";
import $ from "jquery";

export default {
  data() {
    return {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
      passwordConfirm: undefined,
      loading: false
    };
  },
  methods: {
    hideModal() {
      this.firstName = undefined;
      this.lastName = undefined;
      this.email = undefined;
      this.password = undefined;
      this.passwordConfirm = undefined;
      this.$v.$reset();
      $("#registrationModal").modal("hide");
    },
    async register() {
      this.loading = true;

      try {
        const response = await axios({
          method: "POST",
          url: "/users/signup",
          data: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm
          }
        });

        if (response.data.status === "success") {
          this.$store.dispatch("login", {
            user: response.data.data.user,
            token: response.data.token,
            expiresIn: response.data.expiresIn
          });
          this.$toastr.success("Registration successful!", "Info");
          this.hideModal();
        }
      } catch (err) {
        console.log(err.response);
      }

      this.loading = false;
    }
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email,
      unique: value => {
        if (value === "" || value === undefined) return true;

        return axios.get(`/users/checkEmail?email=${value}`).then(res => {
          return !res.data.user ? true : false;
        });
      }
    },
    password: {
      required,
      minLength: minLength(7)
    },
    passwordConfirm: {
      required,
      sameAs: sameAs("password")
    }
  }
};
</script>

<style scoped>
.modal-title {
  margin: auto;
}
</style>
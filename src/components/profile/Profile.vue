<template>
  <div>
    <h2 class="card-title text-uppercase">My profile</h2>
    <hr />
    <div class="row">
      <div class="col-8">
        <p>
          <span>FULL NAME:</span>
          {{ fullName }}
        </p>
        <p>
          <span>EMAIL:</span>
          {{ email }}
        </p>
      </div>
      <div class="col-4">
        <div class="list-group shadow-sm">
          <router-link
            tag="button"
            active-class="active"
            class="list-group-item list-group-item-action"
            to="/profile/orders"
          >My orders</router-link>
          <router-link
            tag="button"
            active-class="active"
            class="list-group-item list-group-item-action"
            to="/profile/ratings"
          >My ratings</router-link>
          <router-link
            tag="button"
            active-class="active"
            class="list-group-item list-group-item-action"
            to="/profile/favourites"
          >Favourites</router-link>
          <router-link
            tag="button"
            active-class="active"
            class="list-group-item list-group-item-action"
            to="/profile/administration"
            v-if="$store.getters.isAdmin"
          >Administration</router-link>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <router-view class="card shadow-sm padding"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.userData;
    },
    fullName() {
      return this.user.firstName + " " + this.user.lastName;
    },
    email() {
      return this.user.email;
    }
  }
};
</script>

<style scoped>
.list-group-item {
  padding: 8px 20px;
}

.padding {
  padding: 20px;
}

.card-title {
  margin-bottom: 0px !important;
}

hr {
  margin-bottom: 32px !important;
  background-color: #007bff;
}

p span {
  font-weight: 500;
}
</style>
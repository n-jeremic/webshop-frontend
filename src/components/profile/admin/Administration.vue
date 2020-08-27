<template>
  <div>
    <h5>Administration</h5>
    <hr />
    <div class="mb-5">
      <label for="action" class="mr-2">Action:</label>
      <select class="custom-select shadow-sm" id="action" v-model="action">
        <option value="addProduct">Add product</option>
        <option value="removeProduct">Remove product</option>
        <option value="updateProduct">Update product</option>
      </select>
    </div>
    <keep-alive>
      <component :is="action"></component>
    </keep-alive>
  </div>
</template>

<script>
import AddProduct from "./addProduct/AddProduct.vue";
import RemoveProduct from "./RemoveProduct.vue";
import UpdateProduct from "./UpdateProduct.vue";

export default {
  data() {
    return {
      action: "addProduct"
    };
  },
  components: {
    addProduct: AddProduct,
    removeProduct: RemoveProduct,
    updateProduct: UpdateProduct
  }
};
</script>

<style scoped>
.custom-select {
  width: unset !important;
}

select {
  font-weight: 500;
}

hr {
  margin-top: 0px;
}
</style>
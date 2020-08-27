<template>
  <div>
    <div class="row">
      <div class="col">
        <input type="text" placeholder="Product code" v-model="code" class="form-control" />
      </div>
      <div class="col">
        <select class="form-control" v-model="gender">
          <option value>Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            type="number"
            class="form-control"
            step=".01"
            min="0"
            placeholder="Original price"
            @change="convertPrice"
            :value="price"
          />
          <div class="input-group-append">
            <span class="input-group-text">$</span>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            type="number"
            class="form-control"
            step="5"
            min="0"
            placeholder="Discount (if any)"
            v-model="discount"
          />
          <div class="input-group-append">
            <span class="input-group-text">%</span>
          </div>
        </div>
      </div>
    </div>
    <app-product-sizes-form></app-product-sizes-form>
  </div>
</template>

<script>
import SizesForm from "./ProductSizesForm.vue";

export default {
  data() {
    return {
      code: null,
      gender: "",
      price: null,
      discount: null
    };
  },
  methods: {
    convertPrice(event) {
      this.price = event.target.valueAsNumber.toFixed(2);
    }
  },
  components: {
    appProductSizesForm: SizesForm
  }
};
</script>
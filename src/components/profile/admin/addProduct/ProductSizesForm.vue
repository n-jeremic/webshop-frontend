<template>
  <div>
    <div class="row mt-4">
      <div class="col-3">
        <select class="form-control" v-model="currentSize" @change="selectSize">
          <option value="null">Select available size</option>
          <option v-for="(size, i) in availableSizes" :key="i" :value="size">{{ size }}</option>
        </select>
      </div>
    </div>
    <div class="row mt-3">
      <app-selected-size
        v-for="(sizeObj, i) in selectedSizes"
        :key="sizeObj.size"
        :size="sizeObj.size"
        :index="i"
        @sizeObjRemoved="removeSize"
      ></app-selected-size>
    </div>
  </div>
</template>

<script>
import SelectedSize from "./SelectedSize.vue";

export default {
  data() {
    return {
      availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
      selectedSizes: [],
      currentSize: "null"
    };
  },
  methods: {
    selectSize(event) {
      let size = event.target.value;

      if (size !== "null") {
        size = parseInt(size);

        const sizeObj = {
          size,
          colors: []
        };

        this.selectedSizes.push(sizeObj);

        const index = this.availableSizes.findIndex(el => el === size);
        this.availableSizes.splice(index, 1);
        this.currentSize = "null";
      }
    },
    removeSize(index) {
      const size = this.selectedSizes[index].size;
      this.selectedSizes.splice(index, 1);

      this.availableSizes.push(size);
      this.availableSizes.sort((a, b) => a - b);
    }
  },
  components: {
    appSelectedSize: SelectedSize
  }
};
</script>
<template>
  <div class="col-3">
    <div class="card shadow-sm">
      <div class="card-header text-center">
        SIZE {{ size }}
        <i
          class="fas fa-times-circle float-right"
          @click="$emit('sizeObjRemoved', index)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: Number,
    index: Number
  }
};
</script>

<style scoped>
.card-header {
  padding: 5px !important;
  text-align: center;
  font-weight: 500;
}

i {
  margin-top: 5px;
}

i:hover {
  cursor: pointer;
  color: red;
}
</style>
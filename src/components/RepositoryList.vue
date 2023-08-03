<template>
  <div class="w-6/6 grid grid-cols-3 gap-5 pt-3 animate__animated animate__backInDown">
    <h2
      v-for="result in results"
      :key="result.id"
      @click="showDetails(result)"
      class="text-black bg-slate-300 py-2 px-3 rounded-md hover:bg-gray-200 hover:text-gray-700"
    >
      {{ result.name }}
    </h2>
  </div>
</template>
  
<script>
import 'animate.css';
export default {
  props: {
    results: {
      type: Array,
      required: true,
    },
  },
  methods: {
    showDetails(result) {
      this.$emit("select-result", result);
    },
  },
};
</script>
  
<template>
  <div class="flex flex-row w-9/12 gap-2 justify-between">
    <input
      v-if="!loading"
      v-model="query"
      @keyup.enter="search"
      placeholder="Search GitHub"
      class="border border-gray-400 rounded-lg px-4 py-2 w-9/12"
    />
    <!-- search button -->
    <button
      v-if="!loading"
      @click="search"
      class="bg-slate-400 text-gray-600 font-bold px-4 rounded w-3/12"
      v-wave="{
        color: 'rebeccapurple',
        initialOpacity: 0.5,
        duration: 0.5,
        easing: 'ease-in',
      }"
    >
      Search
    </button>
    <div v-else class="text-center w-full flex justify-center text-xl">
      Loading...
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
export default {
  data() {
    return {
      query: "",
      loading: false,
    };
  },
  methods: {
    async search() {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://api.github.com/search/repositories?q=${this.query}&per_page=12`
        );
        this.$emit("search-results", response.data.items);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
  
<style scoped></style>
  
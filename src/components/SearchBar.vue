<template>
  <div class="flex flex-row w-9/12 gap-2 justify-between">
    <input v-model="query" @keyup.enter="search" placeholder="Search GitHub"
      class="border border-gray-400 rounded-lg px-4 py-2 w-9/12">
    <!-- search button -->
    <button @click="search" class="bg-slate-400 text-gray-600 font-bold px-4 rounded w-3/12" v-wave="{
      color: 'rebeccapurple',
      initialOpacity: 0.5,
      duration: 0.5,
      easing: 'ease-in',
    }">Search</button>
  </div>
</template>
  
<script>
import axios from 'axios'
export default {
  data() {
    return {
      query: '',
    };
  },
  methods: {
    async search() {
      const response = await axios.get(`https://api.github.com/search/repositories?q=${this.query}&per_page=12`);
      this.$emit('search-results', response.data.items);
    },
  },
};
</script>
  
<style scoped></style>
  
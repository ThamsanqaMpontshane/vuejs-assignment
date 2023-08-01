<template>
    <div class="flex flex-row w-9/12 gap-2 justify-between">
      <input v-model="query" @keyup.enter="search" placeholder="Search GitHub" class="border border-gray-400 rounded-lg px-4 py-2 w-9/12">
      <!-- search button -->
      <button @click="search" class="bg-slate-200 text-gray-400 font-bold px-4 rounded w-3/12">Search</button>
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
  
  <style scoped>
  .bg-slate-200 {
    transition: all 0.3s ease-in-out;
  }
  .bg-slate-200:hover {
    border: 2px solid #4a5568;
    color: #fff;
    background-color: #4a5568;
  }
  </style>
  
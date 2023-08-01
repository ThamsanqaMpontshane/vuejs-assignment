<template>
    <div class="w-6/6 grid grid-cols-3 gap-5 pt-3">
        <h2 v-for="result in results" :key="result.id"
            class="text-black bg-slate-300 py-2 px-3 rounded-md hover:bg-gray-200 hover:text-gray-700"
            @click="showDetails(result)">
            {{ result.name }}
        </h2>
    </div>
</template>
  
<script>
export default {
    props: {
        results: {
            type: Array,
            required: true,
        },
    },
    methods: {
        showDetails(result) {
            this.$emit('select-result', result);
        },
    },
};
</script>
  
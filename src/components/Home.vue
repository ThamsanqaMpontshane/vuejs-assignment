<template>
    <div class="flex flex-col items-center w-screen container">
        <h1 class="text-5xl font-bold mb-4">Search GitHub Repos</h1>
        <!-- SearchBar Component -->
        <SearchBar @search-results="handleSearchResults" />
        <div v-if="results.length > 0">
            <!-- RepositoryList Component -->
            <RepositoryList :results="results" @select-result="handleSelectResult" />
        </div>
        <div v-if="selectedResult">
            <!-- RepositoryDetails Component -->
            <RepositoryDetails :selectedResult="selectedResult" />
            <!-- IssuesChart Component -->
            <!-- <IssuesChart :selectedResult="selectedResult" /> -->
            <div v-if="issuesShow">
                <!-- IssuesList Component -->
                <IssuesList :selectedResult="selectedResult" />
            </div>
        </div>
    </div>
</template>
  
<script>
import SearchBar from './SearchBar.vue';
import RepositoryDetails from './RepositoryDetails.vue';
import RepositoryList from './RepositoryList.vue';
import IssuesList from './IssuesList.vue';
import IssuesChart from './IssuesChart.vue';

export default {
    components: {
        SearchBar,
        RepositoryDetails,
        RepositoryList,
        IssuesList,
        IssuesChart
    },
    data() {
        return {
            query: '',
            results: [],
            selectedResult: null,
            issuesShow: false,
        };
    },
    methods: {
        handleSearchResults(results) {
            this.results = results;
        },
        handleSelectResult(result) {
            this.selectedResult = result;
            this.issuesShow = true;
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
  
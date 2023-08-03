<template>
  <div v-if="selectedResult" class="mt-6 w-full text-center animate__animated animate__fadeInBottomLeft">
    <h3 class="text-3xl font-bold">{{ selectedResult.name }}</h3>
    <p class="text-gray-700">{{ selectedResult.description }}</p>
    <div class="border border-gray-400 mt-4 w-full">
      <a :href="selectedResult.html_url" target="_blank">{{
        selectedResult.html_url
      }}</a>
      <h3><strong>Forks:</strong> {{ selectedResult.forks_count }}</h3>
      <h3>
        <strong>Stargazers:</strong> {{ selectedResult.stargazers_count }}
      </h3>
      <h3>
        <strong>Open Issues:</strong> {{ selectedResult.open_issues_count }}
      </h3>
      <h3><strong>Owner:</strong> {{ selectedResult.owner.login }}</h3>
      <h3><strong>RepoName:</strong> {{ selectedResult.name }}</h3>
      <!-- !See More Or See Less Button -->
      <button
        class="bg-slate-400 text-gray-600 font-bold py-2 px-4 rounded mt-4 mb-2"
        @click="showmoreDetails = !showmoreDetails"
      >
        {{ showmoreDetails ? "See Less" : "See More" }}
      </button>
      <!-- !Results Of Clicking The See More Or See Less Button -->
      <div
        v-if="showmoreDetails"
        class="mt-4 flex flex-col justify-center items-center"
      >
        <hr
          class="w-11/12 border border-gray-400"
          style="background-color: black"
        />
        <ul class="list-disc pl-8 py-2">
          <h3><strong>Language:</strong> {{ selectedResult.language }}</h3>
          <h3>
            <strong>License:</strong>
            {{ selectedResult.license?.name || "None" }}
          </h3>
          <h3>
            <strong>Created:</strong>
            {{ formatDate(selectedResult.created_at) }}
          </h3>
          <h3>
            <strong>Last Updated:</strong>
            {{ formatDate(selectedResult.updated_at) }}
          </h3>
        </ul>
      </div>
    </div>
  </div>
</template>
  
<script>
import 'animate.css';
export default {
  props: {
    selectedResult: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showmoreDetails: false,
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
  },
};
</script>
  
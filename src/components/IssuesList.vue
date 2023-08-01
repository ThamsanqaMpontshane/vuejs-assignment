<template>
    <div class="mt-6 w-12/12 text-center pb-6">
        <h3 class="text-3xl font-bold">Issues</h3>
        <div>
            <div class="flex justify-center gap-4">
                <div>
                    <button @click="getOpenIssues" class="hover:underline decoration-slate-700 decoration-2"
                        :class="{ 'text-red-500': OpenIssuesButton }">Open Issues </button>
                </div>
                <div>
                    <button @click="getClosedIssues" class="hover:underline decoration-slate-700 decoration-2"
                        :class="{ 'text-red-500': ClosedIssuesButton }">Closed Issues </button>
                </div>
            </div>
            <div>
                <span class="text-sm text-gray-400" v-if="instructionShow">(Click on the link to navigate to the issue on
                    GitHub)</span>
                <span class="text-sm text-red-400 animate-bounce" v-if="errorMessageNumberOneShow">No Open Issues For This
                    Github Repo</span>
                <span class="text-sm text-red-400 animate-bounce" v-if="errorMessageNumberTwoShow">No Closed Issues For This
                    Github Repo</span>
                <ul class="py-4 border border-gray-400 theIssues" v-if="issueBoxShow">
                    <li v-for="issue in issues" :key="issue.id" @click="openIssue(issue)" class="hover:font-extrabold">
                        {{ issue.title }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    props: {
        selectedResult: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            issues: [],
            issuesShow: false,
            issueBoxShow: false,
            issuesCountShow: false,
            instructionShow: false,
            errorMessageNumberOneShow: false,
            errorMessageNumberTwoShow: false,
            OpenIssuesButton: false,
            ClosedIssuesButton: false,
        };
    },
    methods: {
        async getOpenIssues() {
            const response = await axios.get(`https://api.github.com/repos/${this.selectedResult.full_name}/issues?state=open&per_page=99`
            );
            this.issues = response.data;
            this.OpenIssuesButton = true;
            this.ClosedIssuesButton = false;
            if (this.issues.length > 0) {
                this.issueBoxShow = true;
                this.instructionShow = true;
            } else if (this.issues.length <= 0) {
                this.errorMessageNumberOneShow = true;
                this.errorMessageNumberTwoShow = false;
                this.issueBoxShow = false;
                this.instructionShow = false;
            }
        },
        async getClosedIssues() {
            const response = await axios.get(`https://api.github.com/repos/${this.selectedResult.full_name}/issues?state=closed&per_page=99`
            );
            this.issues = response.data;
            this.ClosedIssuesButton = true;
            this.OpenIssuesButton = false;
            if (this.issues.length > 0) {
                this.issueBoxShow = true;
                this.instructionShow = true;
                this.errorMessageNumberOneShow = false;
            } else if (this.issues.length <= 0) {
                this.errorMessageNumberTwoShow = true;
            }
        },
        openIssue(issue) {
            window.open(issue.html_url, '_blank');
        },
    },
    watch: {
        selectedResult() {
            this.issues = [];
            this.issueBoxShow = false;
            this.instructionShow = false;
            this.OpenIssuesButton = false;
            this.ClosedIssuesButton = false;
        },
    },
};
</script>
  
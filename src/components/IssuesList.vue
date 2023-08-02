<template>
    <div class="mt-6 w-12/12 text-center pb-6">
        <h3 class="text-3xl font-bold">Issues</h3>
        <div>
            <div class="flex justify-center gap-4">
                <div>
                    <button @click="getOpenIssues(this.currentPageOpenIssues)"
                        class="hover:underline decoration-slate-700 decoration-2"
                        :class="{ 'text-red-500': openIssuesButton }">
                        Open Issues
                    </button>
                </div>
                <div>
                    <button @click="getClosedIssues(this.currentPageClosedIssues)"
                        class="hover:underline decoration-slate-700 decoration-2"
                        :class="{ 'text-red-500': closedIssuesButton }">
                        Closed Issues
                    </button>
                </div>
            </div>
            <div>
                <span class="text-sm text-gray-500" v-if="instructionShow">(Click on the link to navigate to the issue on
                    GitHub)</span>
                <span class="text-sm text-red-400 animate-bounce" v-if="errorMessageNumberOneShow">No Open Issues For This
                    Github Repo</span>
                <span class="text-sm text-red-400 animate-bounce" v-if="errorMessageNumberTwoShow">No Closed Issues For This
                    Github Repo</span>
                <span class="text-sm text-red-400 animate-bounce"
                    v-if="errorMessageNumberThreeShow && showMoreOpenIssuesButton != true">No More Open Issues For
                    This
                    Github Repo Navigate Back</span>
                <span class="text-sm text-red-400 animate-bounce"
                    v-if="errorMessageNumberFourShow && showMoreClosedIssuesButton != true">No More Closed Issues
                    For This
                    Github Repo Navigate Back</span>
                <div class="py-4 border border-gray-600 theIssues" v-if="issueBoxShow">
                    <ul>
                        <li v-for="issue in issues" :key="issue.id" @click="openIssue(issue)" class="hover:font-extrabold">
                            {{ issue.title }}
                        </li>
                    </ul>
                    <!-- Show More Issues Button -->
                    <div class="flex justify-center gap-3">
                        <button @click="getOpenIssues(this.currentPageOpenIssues + 1)"
                            v-if="openIssuesButton && showMoreOpenIssuesButton"
                            class="bg-slate-400 text-gray-600 font-bold py-2 px-4 rounded mt-4 mb-2 hover:bg-gray-500">
                            Show More Open Issues
                        </button>
                        <button @click="getClosedIssues(this.currentPageClosedIssues + 1)" v-if="closedIssuesButton && showMoreClosedIssuesButton"
                            class="bg-slate-400 text-gray-600 font-bold py-2 px-4 rounded mt-4 mb-2">
                            Show More Closed Issues
                        </button>
                        <!-- back buttons -->
                        <button @click="getOpenIssues(this.currentPageOpenIssues - 1)" v-if="openIssuesButton && showLessOpenIssuesButton"
                            class="bg-slate-300 text-gray-400 font-bold py-2 px-4 rounded mt-4 mb-2 hover:bg-gray-500">
                            Back
                        </button>
                        <button @click="getClosedIssues(this.currentPageClosedIssues - 1)" v-if="closedIssuesButton && showLessClosedIssuesButton"
                            class="bg-slate-200 text-gray-400 font-bold py-2 px-4 rounded mt-4 mb-2">
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
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
            errorMessageNumberThreeShow: false,
            errorMessageNumberFourShow: false,
            openIssuesButton: false,
            closedIssuesButton: false,
            showMoreOpenIssuesButton: false,
            showLessOpenIssuesButton: false,
            showMoreClosedIssuesButton: false,
            showLessClosedIssuesButton: false,
            currentPageOpenIssues: 1,
            currentPageClosedIssues: 1,
        };
    },
    methods: {
        async getOpenIssues(currentPageOpenIssues) {
            const response = await axios.get(
                `https://api.github.com/repos/${this.selectedResult.full_name}/issues?state=open&page=${currentPageOpenIssues}&per_page=20`
            );
            this.issues = response.data;
            this.openIssuesButton = true;
            this.closedIssuesButton = false;
            if (this.issues.length > 0) {
                this.issueBoxShow = true;
                this.instructionShow = true;
                this.errorMessageNumberTwoShow = false;
                this.issuesShow = true;
                this.showMoreOpenIssuesButton = true;
                this.currentPageOpenIssues = currentPageOpenIssues;
                if (this.currentPageOpenIssues > 1) {
                    this.showLessOpenIssuesButton = true;
                } else if (this.currentPageOpenIssues < 2) {
                    this.showLessOpenIssuesButton = false;
                }
            } else if (this.issues.length <= 0) {
                if (this.currentPageOpenIssues > 1) {
                    // new error message
                    this.errorMessageNumberThreeShow = true;
                    // hide show more button
                    this.showMoreOpenIssuesButton = false;
                    // new back button
                    this.openIssuesButton = true;
                    this.instructionShow = false;
                    this.currentPageOpenIssues = currentPageOpenIssues;
                } else if (this.currentPageOpenIssues === 1) {
                    this.errorMessageNumberOneShow = true;
                    this.instructionShow = false;
                }
            }
            console.log(this.currentPageOpenIssues)
        },
        async getClosedIssues(currentPageClosedIssues) {
            const response = await axios.get(
                `https://api.github.com/repos/${this.selectedResult.full_name}/issues?state=closed&page=${currentPageClosedIssues}&per_page=20`
            );
            this.issues = response.data;
            this.closedIssuesButton = true;
            this.openIssuesButton = false;
            if (this.issues.length > 0) {
                this.issueBoxShow = true;
                this.instructionShow = true;
                this.errorMessageNumberOneShow = false;
                this.issuesShow = true;
                this.showMoreClosedIssuesButton = true;
                this.currentPageClosedIssues = currentPageClosedIssues;
                if (this.currentPageClosedIssues > 1) {
                    this.showLessClosedIssuesButton = true;
                } else if (this.currentPageClosedIssues < 2) {
                    this.showLessClosedIssuesButton = false;
                }
            } else if (this.issues.length <= 0) {
                if (this.currentPageClosedIssues > 1) {
                    // new error message
                    this.errorMessageNumberFourShow = true;
                    // hide show more button
                    this.showMoreClosedIssuesButton = false;
                    // new back button
                    this.closedIssuesButton = true;
                    this.instructionShow = false;
                    this.currentPageClosedIssues = currentPageClosedIssues;
                } else if (this.currentPageClosedIssues === 1) {
                    this.errorMessageNumberTwoShow = true;
                    this.instructionShow = false;
                }
            }
            console.log(this.currentPageClosedIssues)
        },
        openIssue(issue) {
            window.open(issue.html_url, "_blank");
        },
    },
    watch: {
        selectedResult() {
            this.issues = [];
            this.issueBoxShow = false;
            this.instructionShow = false;
            this.openIssuesButton = false;
            this.closedIssuesButton = false;
            this.errorMessageNumberOneShow = false;
            this.errorMessageNumberTwoShow = false;
            this.errorMessageNumberThreeShow = false;
            this.errorMessageNumberFourShow = false;
        },
    },
};
</script>

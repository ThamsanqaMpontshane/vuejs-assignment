<template>
    <div>
        <div ref="chart"></div>
    </div>
</template>

<script>
import ApexCharts from 'apexcharts';
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
            issueBoxShow: false,
            instructionShow: false,
            errorMessageNumberOneShow: false,
            errorMessageNumberTwoShow: false,
            OpenIssuesButton: false,
            ClosedIssuesButton: false,
            chart: null,
        };
    },
    methods: {
        async getOpenIssues() {
            const response = await axios.get(
                `https://api.github.com/repos/${this.selectedResult.full_name}/issues?state=open&per_page=100`
            );
            this.issues = response.data;
            // console.log(this.selectedResult.open_issues_count);
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
            const response = await axios.get(
                `https://api.github.com/repos/${this.selectedResult.full_name}/issues?state=closed&per_page=100`
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
            this.$emit('select-issue', issue);
        },
        closeIssue(issue) {
            this.$emit('select-issue', issue);
        },
        updateChart() {
            if (this.chart) {
                // console.log(this.selectedResult.open_issues_count, this.selectedResult.closed_issues_count);
                
                console.log(this.issues);
                this.chart.updateSeries([
                    {
                        data: [this.selectedResult.open_issues_count, this.selectedResult.closed_issues_count],
                    },
                ]);
            }
        },
    },
    watch: {
        selectedResult() {
            this.getOpenIssues();
            this.getClosedIssues();
            console.log(this.issues);
            this.updateChart();
        },
    },
    mounted() {
        this.getOpenIssues();
        this.chart = new ApexCharts(this.$refs.chart, {
            chart: {
                type: 'bar',
            },
            series: [
                {
                    name: 'Issues',
                    data: [this.selectedResult.open_issues_count, this.selectedResult.closed_issues_count],
                },
            ],
            xaxis: {
                categories: ['Open Issues', 'Closed Issues'],
            },
        });
        this.chart.render();
    },
};
</script>
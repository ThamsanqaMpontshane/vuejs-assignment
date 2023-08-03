# Sintrex VueJS Assignment

## Purpose

The purpose of this project is to create a VueJS application that connects to GitHub via an API client. The application will allow users to perform various actions related to repositories and issues on GitHub.

## Assessment Overview

This assessment is open-ended and non-prescriptive, allowing you to showcase your individual abilities and problem-solving approach. The deliverable will be evaluated based on code neatness, readability, logical flow, visual design, and performance. Use best practices in TypeScript, CSS, and HTML, and demonstrate a clear MVC structure for the application.

## Use cases:

1.  **Search GitHub Repositories:** Users can search GitHub repositories based on a given search term.
    
2.  **View Repository Details:** Users can select a particular repository to view more details, such as URL, description, forks count, stargazers count, open issues count, etc.
    
3.  **Link to GitHub Repository:** Users can access the actual GitHub page of a repository to view its code.
    
4.  **View Issues List:** Users can see a list of all current issues for a repository to view the backlog of issues.
    
5.  **Filter Issues:** Users can filter the list of issues based on their state ("Open" or "Closed").
    
6.  **Optional: View Issues Chart:** Users can view a chart that displays the breakdown of issues for the repository, differentiating between open and closed issues.
    

## Additional Points and Notes:

-   Implement a user-friendly and visually appealing user interface using solutions like Twitter Bootstrap, Material, or other libraries you find suitable.
-   Focus on clean and readable code, adhering to best practices in writing TypeScript, CSS, and HTML.
-   Utilize API URLs provided in the "Relevant Links" section to interact with GitHub's API.
-   Make use of proper error handling and user feedback in case of API errors or issues.
-   Feel free to use any other additional libraries or tools that you believe will enhance the quality and functionality of the application.

## Relevant Links:

Description

URL

Sample API URL to search by repository name

[[https://api.github.com/search/repositories?q=bootstrap](https://api.github.com/search/repositories?q=bootstrap)]

API URL to display issues of a repository name

[[https://api.github.com/search/issues?q=repo:username/reponame](https://api.github.com/search/issues?q=repo:username/reponame)]

Example: Display Issues of Bootstrap

[[https://api.github.com/repos/twbs/bootstrap/issues?state=all](https://api.github.com/repos/twbs/bootstrap/issues?state=all)]

API Documentation

[[https://developer.github.com/v3/search/#search-issues](https://developer.github.com/v3/search/#search-issues)]

GitHub Search API Documentation

[[https://developer.github.com/v3/search/](https://developer.github.com/v3/search/)]

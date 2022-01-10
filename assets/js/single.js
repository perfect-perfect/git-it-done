
var limitWarningEl = document.querySelector("#limit-warning");
var issueContainerEl = document.querySelector("#issues-container");



// the parameter repo holds the repo we pushed here through as an argument in getRepoIssues at the bottom
var getRepoIssues = function(repo) {
    // this was shown on the github documentation as "get /repos/:owner/:repo/issues". Not very intuative at all
    // the variable repo we made encompasses both the ":owner" segment and the ":repo" segment, for example "facebook/react"
    // ?direction=asc appended to the end of the URL to specify sort order. changes to ascending order, which is older first
    // the lesson describes what we are doing as this "lets focus on using the fetch API to create an HTTP request to this endpoint"
    // this variable holds the HTTP request to the desired endpoint
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    // fetch is asynchronous
    fetch(apiURL).then(function(response) {
        // request was succesful
        if (response.ok) {
            response.json().then(function(data) {
                // the data here is a;; the issues that were pulled from the API
                displayIssues(data);

                // check if api has paginated issues
                // headers give more information about the request or response. the get() lets you check for things in the HTTP header. A common one is Content-Type. for example GitHub API responses always include a Content-Type value of applicaton/json to signify that the response is formatted in JSON.
                // here the reponse http header has a value of link whcih is only included in the header if the repo has more then 30 results
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    });
};




// after we push info into this function we an refer to it as issues
var displayIssues = function(issues) {

    // checks to see if there are no issues, if no issues, it notifies you.
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // create a link to element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        // issue objects have an html_url property, which links to the full issue on GitHub.
        // if you forget which properties each issue object has, you can check the Preview panel (when i tried it was actually the response panel) in the DevTools Network tab, load the requested URL in another browser tab, or console.log() the respose data.
        issueEl.setAttribute("href", issues[i].html_url);
        // this attribute makes it so the link will open on a new tab instead of the current page.
        issueEl.setAttribute("target", "_blank");


        // this code below to the botom of this function will creat and add an <a> element tothe page
        // create span to hold issue title
        var titleEl = document.createElement("span");
        //  adds the issue title
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // creates a span element to tell us if it is either an issue or a pull request
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issues)";
        }

        // append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }
};


// creates a link at the bottom of the page to issues page of the repo if that repo has more then 30 results
var displayWarning = function(repo) {
    // add text to warning container
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    // makes it into a link to this page
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    // this attribute makes it so the link will open on a new tab instead of the current page.
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);
};


getRepoIssues("facebook/react");
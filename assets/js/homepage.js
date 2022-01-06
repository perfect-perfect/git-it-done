
// note how we've added a parameter to getUserRepos's and then inserted the parameter into the GitHub API URL. We then use the newly formatted url in the subsequent fetch request
var getUserRepos = function(user) {
    // format the github api URL
    var apiURL = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    // fetch() is a web API that allows browsers to communicate with server-side API. It gets us JSON data.
    // then() is a callback function that can tha that can capture data from the API. It transforms it into something we can use
    fetch(apiURL).then(function(response) {
        // .json is a method that formats responses as JSON.
        // .json retuns another promise, hence the extra then(), whose callback function captures the actual data. This nested then() will make more sence as you get used to working with APIs
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getUserRepos("perfect-perfect");
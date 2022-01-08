// this created the DOM element where we will write the the repositories we receive from the API
var repoContainerEl = document.querySelector("#repos-container");

// this is the DOM element we created in order to wrtie the name we searched on to the page. so we know the repo we are looking at
var repoSearchTerm = document.querySelector("#repo-search-term");

// creates the dom element at the form element on the HTML
var userFormEl = document.querySelector("#user-form");

// this creates a dom element at the text input where you search by user's name
var nameInputEl = document.querySelector("#username");

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

            // confused by data here. must have something to do with data in the function right above.
            // sends this two variables to the displayRepo function, which console logs them.
            displayRepos(data, user);

            // console.log(data); ---- saving this console.log() because i am curious about the use of data as an argument
        });
    });
};

var formSubmitHandler = function(event) {
    // weird notes on this. it stops browser from performing the default action the wants it to do. in this case, it prevents the browser from sending the form's input data to a URL (as we'll handle what happens with the from data ourselves in JavaScript)
    event.preventDefault();
    
    // get value via the nameInputEl DOM variable .value and store the value in a new variable, username
    var username = nameInputEl.value.trim();

    //  if we have a username we pass that username as an argument to getUserRepos()
    if (username) {
        getUserRepos(username);
        // i believe this clears the value field in the input text element.
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username");
    }
};


// this function will accept the array of repository data and the term we searched for as parameters
// we sent the data and user variable from getUserRepos(). looks like we rename them here for this function repos and searchTerm.
var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
}

// getUserRepos();

userFormEl.addEventListener("submit", formSubmitHandler);
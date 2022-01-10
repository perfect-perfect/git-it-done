// this created the DOM element where we will write the the repositories we receive from the API
var repoContainerEl = document.querySelector("#repos-container");

// this is the DOM element we created in order to wrtie the name we searched on to the page. so we know the repo we are looking at
var repoSearchTerm = document.querySelector('#repo-search-term');

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
    fetch(apiURL)
        .then(function(response) {

        // we can check if it was a succesful request by using the ok property that's bundled in the response object from fetch(). When the HTTP request status code is something in the 200's the ok property will be true.
        if(response.ok) {
            // .json is a method that formats responses as JSON.
            // .json retuns another promise, hence the extra then(), whose callback function captures the actual data. This nested then() will make more sence as you get used to working with APIs
            response.json().then(function(data) {

            // confused by data here. must have something to do with data in the function right above.
            // sends this two variables to the displayRepo function, which console logs them.
            displayRepos(data, user);

            // console.log(data); ---- saving this console.log() because i am curious about the use of data as an argument
        });}
        else {
            alert('Error: GitHub User Not Found');
      
        } 
    })
    // .catch() method is the API's way of handeling network errors. if the fetch() request fails, that error will be sent to the catch() method
    .catch(function(error)  {
        // Notice this '.catch()' getting chained onto the end of the '.then()' method
        
        alert("Unable to connect to GitHub");
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

    // checks if repo is empty. if it is then it lets user know. This happens when the user we search for exists, but doesn't have any repos in their GitHub
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found";
    }

    // clear old content
    repoContainerEl.textContent = "";
    
    // this is so the searched username will display afte we search it, so we know whose repo we are looking at. repoSearchTerm is a DOM element we created earlier for this purpose.
    repoSearchTerm.textContent = searchTerm;

    // loop over repos and displays them. we are taking each repo (repos[i]) and writing some of it's data to the page.
    for (var i = 0; i < repos.length; i++) {
        // first we format the appearance of the name and repo name. The repoName variable is used later to equal it to the textcontent of the section where we will be displaying the information
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("div");
        // stylye the div element
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create a status element, the little icon next to repo
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // this if conditional determines what kind of icon the repo will get based on its status. if the number is greater than zero, then we'll display the number of issues and add a red X icon next to it. if there are no issues we'll display a blue check
        // check if current repo has issues or not. curious about the use of "i class". must relate to arrays, but unsure
        if (repos[i].open_issues_count > 0) {

            // adds red x if issues greater then 0
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            
            // adds blue check box if no issues present
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
}

// getUserRepos();

userFormEl.addEventListener("submit", formSubmitHandler);
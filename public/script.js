function signinpage(){
    window.location.href="/signin"
}
function openSuggestion() {
    window.location.href="suggestion-page.html"
}
function signuppage(){
    window.location.href="signup.html"
}
function adminpage(){
    window.location.href="/adminpage"
}
function adminfeed (){
    window.location.href="/feed-admin"
}
function signupalert(){
    alert("Sign-up Successful! Welcome to Taste Taft")
}
function feed(){
    window.location.href="/feed";
}
function feedguest(){
    window.location.href="/";
}
function userpage(){
    window.location.href="/useraccount";
}
function resto(establishmentId){
    window.location.href="/establishments/" + establishmentId;
}
function McDores1(){
    window.location.href="mcdo-res1.html"
}
function jollibeeres2(){
    window.location.href="jollibee-res2.html"
}
function tapakingres5(){
    window.location.href="tapaking-res5.html"
}
function bacsilogres6(){
    window.location.href="bacsilog-res6.html"
}
function topsideres3() {
    window.location.href="topside-res3.html"
}
function zarksres4() {
    window.location.href="zarks-res4.html"
}

function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
function enableScroll() {
    window.onscroll = function() {};
}

function openprofilepicmodal (){
    var profilepicmodal = document.getElementById("edit-profilepic-modal");
    profilepicmodal.style.display = "block";
    disableScroll();
};

function closeprofilepicmodal() {
    var profilepicmodal = document.getElementById("edit-profilepic-modal");
    profilepicmodal.style.display = "none";
    enableScroll();
};

function openpasswordmodal (){
    var profilepicmodal = document.getElementById("edit-password-modal");
    profilepicmodal.style.display = "block";
    disableScroll();
};

function closepasswordmodal() {
    var passwordmodal = document.getElementById("edit-password-modal");
    passwordmodal.style.display = "none";
    enableScroll();
};

function openusernamemodal() {
    var usernamemodal = document.getElementById("edit-username-modal");
    usernamemodal.style.display = "block";
    disableScroll();
};

function closeusernamemodal() {
    var usernamemodal = document.getElementById("edit-username-modal");
    usernamemodal.style.display = "none";
    enableScroll();
};



function gallerynext(){
    var galleryContainer = document.querySelector(".res-gallery");
    galleryContainer.scrollLeft += 600;
};

function galleryback(){
    var galleryContainer = document.querySelector(".res-gallery");
    galleryContainer.scrollLeft -= 600;
};

function sortRestaurants() {
    var sortBy = document.getElementById("sortSelect").value;
    var feedBody = document.getElementById("establishments-feed");
    var feedReviews = feedBody.getElementsByClassName("feed-review");
    var feedArray = Array.from(feedReviews);

    feedArray.sort(function(a, b) {
        switch (sortBy) {
            case "recommended":
                return 0.5 - Math.random();
            case "most-stars":
                return parseFloat(b.querySelector(".feed-review-rating").getAttribute("data-rating")) - parseFloat(a.querySelector(".feed-review-rating").getAttribute("data-rating"));
            case "least-stars":
                return parseFloat(a.querySelector(".feed-review-rating").getAttribute("data-rating")) - parseFloat(b.querySelector(".feed-review-rating").getAttribute("data-rating"));
            case "alphabetical":
                var nameA = a.querySelector("h1").innerText.toLowerCase();
                var nameB = b.querySelector("h1").innerText.toLowerCase();
                return nameA.localeCompare(nameB);
            default:
                return 0;
        }
    });

    // Clear the feedBody
    feedBody.innerHTML = "";

    // Append the sorted elements to feedBody
    feedArray.forEach(function(element) {
        feedBody.appendChild(element);
    });
}



function filterRestaurants() {
    var searchTerm = document.getElementById("searchInput").value.toLowerCase();
    var feedReviews = document.getElementsByClassName("feed-review");

    for (var i = 0; i < feedReviews.length; i++) {
        var restaurantName = feedReviews[i].querySelector("h1").innerText.toLowerCase();
        var display = restaurantName.includes(searchTerm) ? "block" : "none";
        feedReviews[i].style.display = display;
    }
}
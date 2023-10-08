function signinpage(){
    window.location.href="signin.html"
}
function signuppage(){
    window.location.href="signup.html"
}
function signupalert(){
    alert("Sign-up Successful! Welcome to Taste Taft")
}
function feed(){
    window.location.href="feed.html";
}
function feedguest(){
    window.location.href="feed-guest.html";
}
function userpage(){
    window.location.href="useraccount.html"
}
function sampleres1(){
    window.location.href="sample-res1.html"
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





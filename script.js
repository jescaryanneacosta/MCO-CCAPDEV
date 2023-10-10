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
function McDores1(){
    window.location.href="mcdo-res1.html"
}
function jollibeeres2(){
    window.location.href="Jollibee -res2 - .html"
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
}

function galleryback(){
    var galleryContainer = document.querySelector(".res-gallery");
    galleryContainer.scrollLeft -= 600;
}


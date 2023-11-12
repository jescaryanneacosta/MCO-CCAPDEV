function signinpage(){
    window.location.href="signin.html"
}
function openSuggestion() {
    window.location.href="suggestion-page.html"
}
function signuppage(){
    window.location.href="signup.html"
}
function adminpage(){
    window.location.href="adminpage.html"
}
function adminfeed (){
    window.location.href="feed-admin.html"
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


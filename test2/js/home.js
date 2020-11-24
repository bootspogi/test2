var firebaseConfig = {
    apiKey: "AIzaSyCFlAvP3T2AfG9uRl5U8z2PeA2eXngC1ZA",
    authDomain: "testinglang-5f6ce.firebaseapp.com",
    databaseURL: "https://testinglang-5f6ce.firebaseio.com",
    projectId: "testinglang-5f6ce",
    storageBucket: "testinglang-5f6ce.appspot.com",
    messagingSenderId: "180561543795",
    appId: "1:180561543795:web:75e0ad04eed7903f582006"
};

firebase.initializeApp(firebaseConfig);


var db = firebase.firestore();
var auth = firebase.auth();
var user = firebase.auth().currentUser;


const logout = document.getElementById('logout');
const navMove = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    })
}


navMove();



if (user == true) {
    logout.addEventListener('click', () => {
        firebase.auth().signOut().then(function() {
            alert("Logged Out Succesfully");
            window.location.replace("./login.html");
        }).catch(function(error) {
            console.log(error);
        });
    })
} else {
    // No user is signed in.
}
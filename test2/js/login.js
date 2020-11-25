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

// Init firebase SDK
var db = firebase.firestore();
var auth = firebase.auth();
// End


// Get Sign in data
const signinBtn = document.getElementById('loginBtn');
const loginEmail = document.getElementById('loginEmail');
const loginPass = document.getElementById('loginPass');
// End

//Extra
const resetPass = document.getElementById('passReset');
const signup = document.getElementById('signupPage');
const inpanel = document.getElementById('signIn');


//Sign in
signinBtn.addEventListener('click', e => {
    //Get sign in data
    const email = loginEmail.value;
    const pass = loginPass.value;

    //Sign in user
    auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
            window.alert("Logged in")
            var user = auth.currentUser;
            if (user != null) {
                user.providerData.forEach(function(profile) {
                    console.log("  Provider-specific UID: " + profile.uid);
                    console.log("  Name: " + profile.displayName);
                    console.log("  Email: " + profile.email);

                    //Check if verified
                    if (user.emailVerified == false) {
                        alert("Email not yet verified");
                    } else {
                        alert("Email verified");
                        window.location.replace("./home.html");
                    }
                });
            }
            console.log(user);
        })
        .catch(e => window.alert("Please enter a valid account."))
})

var emailAddress = email;

resetPass.addEventListener('click', () => {

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        alert("Reset Password link was sent to your email!")
    }).catch(function(error) {
        // An error happened.
    });
})
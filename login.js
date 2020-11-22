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

//Get Sign up data
const signupEmail = document.getElementById('signupEmail');
const signupPass = document.getElementById('signupPass');
const phonenumb = document.getElementById('phonenumb');
const fName = document.getElementById('fName');
const lName = document.getElementById('lName');
const signupBtn = document.getElementById('signupBtn');
// End
// Get Sign in data
const signinBtn = document.getElementById('loginBtn');
const loginEmail = document.getElementById('loginEmail');
const loginPass = document.getElementById('loginPass');
// End

//Extra
const container = document.getElementById('container');
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
                    }
                });
            }
            console.log(user);
        })
        .catch(e => window.alert("Please enter a valid account."))
})

// Sign up 
signupBtn.addEventListener('click', function() {
    const email = signupEmail.value;
    const pass = signupPass.value;
    alert("hey");
    if (email != null || email != "" || pass != null || pass != "") {
        // Register
        auth.createUserWithEmailAndPassword(email, pass)
            .then(cred => {
                // Sign in user after creating account
                auth.signInWithEmailAndPassword(email, pass)
                    .then((user) => {
                        // Signed in 
                        // Send email verification
                        var user = auth.currentUser; //Get current Signed-in user
                        // Send Verification
                        user.sendEmailVerification().then(function() {
                            window.alert('Email verification sent.')
                                // Email sent.
                        }).catch(function(error) {
                            console.log("Sending email veification error: " + error);
                        });
                        //End
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(`Sign in error: ${errorCode} ${errorMessage}`);
                    });
            })
            .catch(e => {
                console.log(e)
                alert("Enter valid data")
            })
    }
})
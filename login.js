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

const signupEmail = document.getElementById('signupEmail');
const signupPass = document.getElementById('signupPass');
const phonenumb = document.getElementById('phonenumb');
const fName = document.getElementById('fName');
const lName = document.getElementById('lName');
const signupBtn = document.getElementById('signupBtn');
const signinBtn = document.getElementById('loginBtn');
const loginEmail = document.getElementById('loginEmail');
const loginPass = document.getElementById('loginPass');
const uppanel = document.getElementById('signUp');
const inpanel = document.getElementById('signIn');
const container = document.getElementById('container');

signinBtn.addEventListener('click', e => {

    const email = loginEmail.value;
    const pass = loginPass.value;
    const auth = firebase.auth();


    const promise = auth.signInWithEmailAndPassword(email, pass).then(() => {
        window.alert("logged in")
    })
    promise.catch(e => window.alert("Please enter a valid account."))
})


const auth = firebase.auth();
signupBtn.addEventListener('submit', e => {
    const uid = auth.currentuser.getToken();
    const email = signupEmail.value;
    const pass = signupPass.value;

    const createuser = auth.createUserWithEmailAndPassword(email, pass).then(cred => {

        return db.collection('users').doc(cred.user.uid).set({
            uid: uid.toString(),
            first_name: fName.value,
            last_name: lName.value,
            phone_numb: phonenumb.value

        })
    }).then(() => {
        window.alert("account added")
    })
    promise.catch(e => window.alert("mali gawa mo."))

})

firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function() {
        window.alert('email sent')
        window.localStorage.setItem('emailForSignIn', email);
    })
    .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
    });

if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    var email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    firebase.auth().signInWithEmailLink(email, window.location.href)
        .then(function(result) {
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn');
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
        })
        .catch(function(error) {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
        });
}
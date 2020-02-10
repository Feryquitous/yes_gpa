// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDLksBHHimxHXlP9D0YUBOe_gFAWwI4HBE",
    authDomain: "yes-gpa-a7ffc.firebaseapp.com",
    databaseURL: "https://yes-gpa-a7ffc.firebaseio.com",
    projectId: "yes-gpa-a7ffc",
    storageBucket: "yes-gpa-a7ffc.appspot.com",
    messagingSenderId: "514830833123",
    appId: "1:514830833123:web:7f182dd780d844c0d5bcd6",
    measurementId: "G-82QWCB7X0E"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    const db = firebase.firestore();
    const myEntryRef = db.collection('test_gpa_entries');
    myEntryRef.get().then(products => {
        products.forEach(doc => {
            data = doc.data();
            console.log(data);
            console.log(data.gpa);
        })
    });
});
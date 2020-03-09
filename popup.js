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

console.log('Hi');

document.addEventListener("DOMContentLoaded", event => {
    // read data
    const app = firebase.app();
    const db = firebase.firestore();

    let class_by_professor_dropdown = new Map();
    db.collection("class_by_professor").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            class_by_professor_dropdown.set(doc.id, doc.data());
        });
    });

});
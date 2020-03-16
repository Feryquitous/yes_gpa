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
    // Read Data
    const app = firebase.app();
    const db = firebase.firestore();

    const myEntryRef = db.collection("test_average_gpa_by_professor_and_class");

    let gpa_list = [];

    myEntryRef.get()
        .then(products => {
            products.forEach(doc => {
                gpa_list.push(doc.data());
            })
        })
        // Terminate Firestore
        .then(() => {
            db.terminate();
        });

    // Storage API?
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, gpa_list);
            });
        }
    });
});
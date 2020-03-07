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
    // read data
    const app = firebase.app();
    const db = firebase.firestore();
    const myEntryRef = db.collection("test_average_gpa_by_professor_and_class");

    let gpa_list = [];

    myEntryRef.get().then(products => {
        products.forEach(doc => {
            gpa_list.push(doc.data());
        })
    });

    console.log(gpa_list);

    // better way to send data?
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

    // chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    //     // alert(response);
    // });

    // write data
    var ref = db.collection('test_average_gpa_by_professor_and_class').doc('oMLoQReeqcvFlWsrezVC');

    db.runTransaction(transaction => {
        return transaction.get(ref).then(res => {
            if (!res.exists) {
                throw "Document does not exist!";
            }

            // Compute new number of ratings
            var newNumRatings = parseInt(res.data().count) + 1;

            // Compute new average rating
            var oldRatingTotal = res.data().averagegpa * res.data().count;
            var newAvgRating = (oldRatingTotal + 4) / newNumRatings;

            // Commit to Firestore
            transaction.update(ref, {
                count: newNumRatings,
                averagegpa: newAvgRating
            });

        })
    });

});
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

    let classByProfessorDropdown = new Map();
    let a = 0;

    // Classes Dropdown
    db.collection("class_by_professor").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            classByProfessorDropdown.set(doc.id, doc.data());
        });

        let classes = Array.from(classByProfessorDropdown.keys());

        $('#classes').empty();

        $.each(classes, function (i, p) {
            $('#classes').append($('<option></option>').val(p).html(p));
        });

        $('#classes').trigger('change');
    });

    $("#classes").change(function () {
        let selectedClasses = $(this).children("option:selected").text();
        let selectedProfessors = classByProfessorDropdown.get(selectedClasses);
        let professors = [];

        for (var professor in selectedProfessors) {
            if (selectedProfessors.hasOwnProperty(professor)) {
                professors.push(selectedProfessors[professor]);
            }
        }

        $('#professors').empty();
        $.each(professors, function (i, p) {
            $('#professors').append($('<option></option>').val(p).html(p));
        });
    });

    $("#submit").click(() => {
        let selectedClass = $("#classes").children("option:selected").text();
        let selectedProfessor = $("#professors").children("option:selected").text();
        alert(selectedClass + " " + selectedProfessor);

        // write data
        // var ref = db.collection('test_average_gpa_by_professor_and_class').doc('oMLoQReeqcvFlWsrezVC');

        // db.runTransaction(transaction => {
        //     return transaction.get(ref).then(res => {
        //         if (!res.exists) {
        //             throw "Document does not exist!";
        //         }

        //         // Compute new number of ratings
        //         var newNumRatings = parseInt(res.data().count) + 1;

        //         // Compute new average rating
        //         var oldRatingTotal = res.data().averagegpa * res.data().count;
        //         var newAvgRating = (oldRatingTotal + 4) / newNumRatings;

        //         // Commit to Firestore
        //         transaction.update(ref, {
        //             count: newNumRatings,
        //             averagegpa: newAvgRating
        //         });

        //     })
        // });
    });





});
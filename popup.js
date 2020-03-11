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


    // Datalist event listener
    document.querySelector('input[list="classes"]').addEventListener('input', onInput);

    function selectProfessor() {
        let selectedClasses = $("#class").val();

        if (selectedClasses.length == 7) {
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
        }
    };

    // Click on a option
    function onInput() {
        var val = document.getElementById("class").value;
        var opts = document.getElementById('classes').childNodes;
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].value === val) {
                selectProfessor();
            }
        }
    }

    // Enter key pressed
    $('#class').keypress(function (e) {
        if (e.which == 13) {
            selectProfessor();
        }
    });

    $("#submit").click(() => {
        let selectedClass = $("#class").val();
        // Better form validation?
        if ( selectedClass == '') {
            alert('Please enter a class.');
            throw new Error("No class entered.");
        }

        let selectedProfessor = $("#professors").children("option:selected").text();
        let inputGPA = $("#gpa").val();

        let documentName = selectedClass + "_" + selectedProfessor;
        // write data

        // need to change later
        var docRef = db.collection("test_average_gpa_by_professor_and_class").doc(documentName);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                db.runTransaction(transaction => {
                    return transaction.get(docRef).then(res => {
                        // Compute new number of ratings
                        let newCount = parseInt(res.data().count) + 1;

                        // Compute new average rating
                        let oldRatingTotal = res.data().averagegpa * res.data().count;
                        console.log(oldRatingTotal);
                        console.log(inputGPA);

                        console.log(newCount);

                        let newAvgRating = (Number(oldRatingTotal) + Number(inputGPA)) / newCount;
                        // Commit to Firestore
                        transaction.update(docRef, {
                            averagegpa: newAvgRating,
                            count: newCount
                        });

                    })
                });
            } else {
                docRef.set({
                        averagegpa: Number(inputGPA),
                        classid: selectedClass,
                        count: 1,
                        professor: selectedProfessor
                    })
                    .then(function () {
                        console.log("Document successfully written!");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    });
});
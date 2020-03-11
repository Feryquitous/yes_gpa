// chrome.runtime.sendMessage('Hello');

document.addEventListener("DOMContentLoaded", event => {
    let avg_gpas = [];
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        avg_gpas = msg;
    });

    const displayedClasses = document.querySelector('#carousel');
    const classObserverConfig = {
        childList: true,
        subtree: true
    }
    const classChange = new MutationObserver(mutations => {
        $(".classInstructor").not("[avg-gpa-applied='true']")
            .each(function (i, element) {
                // Extract professor name
                let professor_name = $(element).text().trim();

                // Extract class ID
                let class_ID = $(element).parent().parent().first()[0]['innerText'].trim().substring(0, 7);

                let gpa_by_class_professor = 0;

                //check if average gpa present
                if (avg_gpas.some(avg_gpa => {
                        if (avg_gpa.professor === professor_name && avg_gpa.classid === class_ID) {
                            gpa_by_class_professor = avg_gpa.averagegpa;
                            return true;
                        } else return false;
                    })) {
                    $(element).text($(element).text() + ' ' + gpa_by_class_professor.toString());
                } else {
                    $(element).text($(element).text() + ' my test GPA');
                }
                // Redundancy Mark  
                $(element).attr('avg-gpa-applied', 'true');
            });
    });
    classChange.observe(displayedClasses, classObserverConfig);
});
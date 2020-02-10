document.addEventListener("DOMContentLoaded", event => {
    const displayedClasses = document.querySelector('#carousel');
    const classObserverConfig = {
        childList: true,
        subtree: true
    }
    const classChange = new MutationObserver(mutations => {
        $(".classInstructor").not("[avg-gpa-applied='true']")
            .each(function (i, element) {
                $(element).text($(element).text() + ' my test GPA');

                // Redundancy Mark  
                $(element).attr('avg-gpa-applied', 'true');
            });
    });
    classChange.observe(displayedClasses, classObserverConfig);
});
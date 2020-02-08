var timeout = null;

/**
 * Checks the DOM for changes ten times per second
 * This allows the extension to update even though the URL never changes
 */
document.addEventListener("DOMSubtreeModified", function () {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(update, 100);
}, false);

/**
 * Searches through results page for professor names
 */
function update() {
    $(".classInstructor").not("[avg-gpa-applied='true']")
        .each(function (i, element) {
            $(element).text($(element).text() + ' my test GPA');

            // Redundancy Mark  
            $(element).attr('avg-gpa-applied', 'true');
        });
}
function highlightCurrentLesson() {
    $(".ihexStudentTimeTableCurrentLesson").each(function() {$(this).removeClass("ihexStudentTimeTableCurrentLesson")});
    var currentLesson = ihexGetCurrentLesson();
    var currentDOW = new Date().getDay();
    if (currentDOW > 0 && currentDOW < 6){
        var elem = $("table").find("tr").first().find("th")[currentDOW];
        //$(elem).addClass("ihexStudentTimeTableCurrentLesson");
        $(elem).addClass("ihexStudentTimeTableCurrentLesson");
        if (currentLesson != -1){
            var elem = $("table tr").slice(currentLesson + 1).first().find("th")[0];
            $(elem).addClass("ihexStudentTimeTableCurrentLesson");
            elem = $("table tr").slice(currentLesson + 1).first().find("td")[currentDOW - 1];
            $(elem).addClass("ihexStudentTimeTableCurrentLesson");
        };
    };
};

$(document).ready(function () {
    setTimeout(function () {
        $('.gotoclass').each(function ()
        {
            $(this).after("<div class='ihexGotoClass' id='" + $(this).attr("id") + "'>Go To Class</div>");
            $(this).remove();
        })

        $('.ihexGotoClass').on('click', function () {
            var newWindow = window.open('https://hub.interhigh.co.uk/dashboard/learning/?sso=1', '_blank');
            var courseId = $(this).attr("id");
            $(window).focus();
            var interval=setInterval(function() {
                try {
                    var a = newWindow.location.href;
                    a += "123";
                }catch(e) {
                    clearInterval(interval);
                    newWindow.location = 'https://weyeducation.instructure.com/courses/' + courseId + "/external_tools/1242";
                };
            }, 500)
        });
        
        //Replace London lessons time with local time
        var i = 0;
        $("table tr").slice(1).each(function () {
            th = $(this).find("th").first();
            if (th.html() !== "Break")
            {
                var content = "<p style='margin-bottom: .1rem;'>" + i + "</p>" + ihexGetLessonLocalStartTime(i) + "&nbsp;–&nbsp;" + ihexGetLessonLocalEndTime(i);
                th.html(content);
                i++;
            }
        });

        $(".col-12 .card").first().css("max-height", "none");

        //Update the information about current lesson
        setInterval(function () {
            highlightCurrentLesson();
        }, 5000);

        //Remove standard lesson highlight
        setInterval(function () {
            $(".lesson_on").each(function () {
                $(this).removeClass("lesson_on");
            })
        }, 1000);

        highlightCurrentLesson();
    }, 500); 
});


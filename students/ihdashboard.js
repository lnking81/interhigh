var lessonLondonTimes = {}

function highlightCurrentLesson() {
    $(".ihexStudentTimeTableCurrentLesson").each(function() {$(this).removeClass("ihexStudentTimeTableCurrentLesson")});
    //$(".lesson_on").each(function () {$(this).removeClass("lesson_on");})

    nowInLondon = ihexLocalTimeToLondonTime()
    var currentDOW = new Date(nowInLondon.format("YYYY-MM-DD")).getDay();
    if (currentDOW > 0 && currentDOW < 6) {
        var elem = $("div.day_header")[currentDOW-1];
        $(elem).addClass("lesson_on");

        // dow = 0
        // $("#time-table-holder > div").each(function(){
        //     colId = $(this).attr("id")
        //     if (colId != "time-vert") {
        //         //dow += 1
        //         if (dow == currentDOW) {
        //             console.log()
        //             $("#" + colId + " > .lessonblock").each(function(){
        //                 lessonId = $(this).attr("id")
        //                 startTime = lessonLondonTimes[lessonId]['start']
        //                 endTime = lessonLondonTimes[lessonId]['end']
        //                 nowInLondonF = nowInLondon.format("HH:mm")
        //                 if (nowInLondonF >= startTime && nowInLondonF <= endTime) {
        //                     $(this).addClass("lesson_on")
        //                 }
        //             })
        //         }
        //     }
        // })
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
            var newWindow = window.open('https://hub.kingsinterhigh.co.uk/dashboard/learning/?sso=1', '_blank');
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
        $(".timehourblock > p").each(function () {
            var content = ihexLondonTimeToLocal($(this).html());
            $(this).html(content)
        });

        $(".lessonblock > p").each(function () {
            id = $(this.parentElement).attr("id")
            var londonDiaS = $(this).html().trim()
            var londonDiaA = londonDiaS.split(" - ")
            var londonStart = londonDiaA[0]
            var londonEnd = londonDiaA[1]
            lessonLondonTimes[id] = { 'start': londonStart, 'end': londonEnd}
            var content = ihexLondonTimeToLocal(londonStart) + " - " + ihexLondonTimeToLocal(londonEnd);
            $(this).html(content)
        });

        // $(".col-12 .card").first().css("max-height", "none");

        //Update the information about current lesson
        setInterval(function () {
               highlightCurrentLesson();
        }, 5000);

        //Remove standard lesson highlight
        //  setInterval(function () {
        //      $(".lesson_on").each(function () {
        //          $(this).removeClass("lesson_on");
        //      })
        //  }, 1000);

        highlightCurrentLesson();

    }, 500);
});


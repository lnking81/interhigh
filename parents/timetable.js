setInterval(function(){
    if($("#ttiFrame").attr("src") != undefined){
        clearInterval();
        $("#ttiFrame").on("load", function(){
            if ($("#ttiFrame").contents().find(".ihex").length == 0) {

                //Providing a parent with the start time of each lesson
                $("#ttiFrame").contents().find("tr").slice(1).each(function() {
                    var elem = $(this).find("th").not(".ihex").first();
                    $(elem).addClass("ihex");
                    $(elem).html($(elem).html() + "<br><br>(" + ihexGetLessonLocalStartTime($(elem).html()) + ")");
                });

                //Formatting TimeTable
                $("#ttiFrame").contents().find("td").each(function () {
                    var content = $(this).html();
                    switch(content){
                        case "FREE PERIOD":
                            //Removing FREE PERIOD text
                            content = "";
                            break;
                        default:
                            //Replacing : with line breaks
                            content = content.replace(/:/gi, "<br>");
                    };
                    $(this).html(content);
                })

                //Highlighting current DOW and lesson
                var currentLesson = ihexGetCurrentLesson();
                var currentDOW = new Date().getDay();
                if (currentDOW > 0 && currentDOW < 6){
                    var elem = $("#ttiFrame").contents().find("tr").first().find("th")[currentDOW];
                    $(elem).addClass("ihexParentTimeTableCurrentLesson");
                    if (currentLesson != -1){
                        var elem = $("#ttiFrame").contents().find("tr").slice(currentLesson + 1).first().find("th")[0];
                        $(elem).addClass("ihexParentTimeTableCurrentLesson");
                        elem = $("#ttiFrame").contents().find("tr").slice(currentLesson + 1).first().find("td")[currentDOW - 1];
                        $(elem).addClass("ihexParentTimeTableCurrentLesson");
                    };
                };
            };
        });
        $("iframe").height($("iframe").contents().find("body").height() + 30);
    };
}, 500)

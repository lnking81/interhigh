function timeTable() {
    setInterval(function() {
        $("iframe.gadget-full-timetable").each(function() {
            timetable = this.contentDocument.getElementsByClassName("timetable")

            //.tt-times
            $($(timetable).children(".tt-times")[0]).children(".tt-time:not(.ihexttime)").each(function() {
                $(this).addClass("ihexttime")
                time = $(this).text()
                $(this).text(ihexLondonTimeToLocal(time))
            })

            //.tt-events
            $($(timetable).children(".tt-events")[0]).children(".tt-event:not(.ihexttime)").each(function() {
                $(this).addClass("ihexttime")
                dataT = $(this).html()
                dataA = dataT.split("<br>")
                timeT = dataA[2]
                timeA = timeT.split(" - ")
                londonTimeStart = timeA[0]
                londonTimeEnd = timeA[1]
                localTimeStart = ihexLondonTimeToLocal(londonTimeStart)
                localTimeEnd = ihexLondonTimeToLocal(londonTimeEnd)
                dataA[2] = localTimeStart + " - " + localTimeEnd
                newHtml = dataA.join("<br>")
                $(this).html(newHtml)
                $(this).attr("data-original-title", newHtml)
            })
        })
    }, 1000)
}

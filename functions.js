//Global constants
function ihexLondonTimeToLocal(time) {
    time = (time.length == 4 ? "0" : "") + time.replace(":","")
    londonFullTime = moment().format("YYYYMMDD ") + time
    londonTZFullDate = moment.tz(londonFullTime, 'Europe/London').toDate()
    localTime = moment(londonTZFullDate)
    return localTime.format("HH:mm");
}

function ihexLocalTimeToLondonTime(time = null) {
    time = time == null ? new Date() : time
    return moment.tz(time, 'Europe/London')
}

//Global constants
const ihexGLessonsSchedule=[{index:0,startTime:"08:20:00",endTime:"09:00:00",isBreak:!1},{index:1,startTime:"09:00:00",endTime:"09:40:00",isBreak:!1},{index:2,startTime:"09:40:00",endTime:"10:20:00",isBreak:!1},{index:3,startTime:"10:20:00",endTime:"11:00:00",isBreak:!1},{index:-1,startTime:"11:00:00",endTime:"11:20:00",isBreak:!0},{index:4,startTime:"11:20:00",endTime:"12:00:00",isBreak:!1},{index:5,startTime:"12:00:00",endTime:"12:40:00",isBreak:!1},{index:6,startTime:"12:40:00",endTime:"13:20:00",isBreak:!1},{index:7,startTime:"13:20:00",endTime:"14:00:00",isBreak:!1},{index:8,startTime:"14:00:00",endTime:"14:40:00",isBreak:!1},{index:-1,startTime:"14:40:00",endTime:"15:00:00",isBreak:!0},{index:9,startTime:"15:00:00",endTime:"15:40:00",isBreak:!1},{index:10,startTime:"15:40:00",endTime:"16:20:00",isBreak:!1},{index:11,startTime:"16:20:00",endTime:"17:00:00",isBreak:!1}];

function getLessonByNumber(lessonNumber) {
    var lesson = ihexGLessonsSchedule.find( ({ index }) => index === lessonNumber);
    if (lesson == undefined) {
        throw "Invalid lesson number"
    }
    return lesson
}

function ihexGetLessonLocalStartTime(lessonNumber) {
    let lesson = getLessonByNumber(lessonNumber);
    var lessonStartLondonTime = new Date(moment.tz(moment().format("YYYY-MM-DD ") + lesson.startTime, "Europe/London").format());
    return (moment(lessonStartLondonTime).format("HH:mm"));
}

function ihexGetLessonLocalEndTime(lessonNumber) {
    let lesson = getLessonByNumber(lessonNumber);
    var lessonEndInLondon = new Date(moment.tz(moment().format("YYYY-MM-DD ") + lesson.endTime, "Europe/London").format());
    return (moment(lessonEndInLondon).format("HH:mm"));
}

function ihexGetCurrentLesson() {
    var result = -1;

    var nowInLondon = new Date(moment().tz('Europe/London').format());
    ihexGLessonsSchedule.forEach(function (element, index) {
        var lessonStartInLondon = new Date(moment.tz(moment().format("YYYY-MM-DD ") + element.startTime, "Europe/London").format());
        var lessonEndInLondon = new Date(moment.tz(moment().format("YYYY-MM-DD ") + element.endTime, "Europe/London").format());

        if (nowInLondon >= lessonStartInLondon && nowInLondon < lessonEndInLondon){
            result = index;
        }
    });

    return result;
}
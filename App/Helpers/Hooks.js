
import moment from 'moment';



export function consoleLog(TAG: String, message: String, force: Boolean = false) {
    if (__DEV__ || force === true) { // if in Development mode
        console.log(`%c${TAG} =>`, 'color: rgb(61, 217, 53);', message);
    }
}
export function consoleWarn(TAG: String, message: String, force: Boolean = false) {
    if (__DEV__ || force === true) { // if in Development mode
        console.log(`%c${TAG} =>`, 'background: rgb(255, 174, 36); color: rgb(255, 255, 255);', message);
    }
}
export function consoleError(TAG: String, message: String, force: Boolean = false) {
    if (__DEV__ || force === true) { // if in Development mode
        console.log(`%c${TAG} =>`, 'background: rgb(246, 60, 60); color: rgb(255, 255, 255);', message);
    }
}

export function formatDate2(date = [], setDay = true) {

    if (!date)
        date = moment().toDate();
    else
        date = moment(date).toDate();

    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var dayNames = [
        "Minggu", "Senin", "Selasa",
        "Rabu", "Kamis", "Jumat",
        "Sabtu"
    ]

    var dayIndex = date.getDay();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    if (setDay) {

        return dayNames[dayIndex] + ', ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    return day + ' ' + monthNames[monthIndex] + ' ' + year;

}

export function getDateString(date, format = 'DD/MM/YYYY') {
    let rawDate = moment(date).toDate();

    if (format != null) {
        const formattedDate = moment(rawDate).format(format);
        return formattedDate;
    }
    else {
        return rawDate;
    }
};

export function getFormatDate(date = [], time = true, output_format = 'Y-m-d', getDate = true) {
    // Convert to JS Date Object
    if (!date)
        date = moment().toDate();
    else
        date = moment(date).toDate();

    let year = date.getFullYear(),
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        hour = '' + date.getHours(),
        second = '' + date.getSeconds(),
        minute = '' + date.getMinutes();

    // Reformat to 2 digits
    month = (month.length < 2) ? '0' + month : month;
    day = (day.length < 2) ? '0' + day : day;
    hour = (hour.length < 2) ? '0' + hour : hour;
    minute = (minute.length < 2) ? '0' + minute : minute;
    second = (second.length < 2) ? '0' + second : second;

    // Formatting Date
    let dateArray = [];
    let dateSeparator = '-';
    let splitdate = output_format.split(/[^a-z]/gi);
    if (splitdate.length < 3) {
        return 'invalid format';
    }

    let get_separator = output_format.split(/[\w]/gi);

    for (var i = 0; i < splitdate.length; i++) {
        if (splitdate[i] == 'Y' || splitdate[i] == 'y') {
            dateArray.push(year);
        } else if (splitdate[i] == 'M' || splitdate[i] == 'm' || splitdate[i] == 'f' || splitdate[i] == 'F') {
            switch (splitdate[i]) {
                case 'M':
                    month = lang('month_short.' + month);
                    break;
                case 'f':
                    month = lang('month_long.' + month);
                    break;
                case 'F':
                    month = lang('month_long.' + month);
                    break;
            }

            dateArray.push(month);
        } else if (splitdate[i] == 'D' || splitdate[i] == 'd') {
            dateArray.push(day);
        }
    }

    let newDateSeparator = get_separator.filter(String);
    if (newDateSeparator.length > 0) {
        dateSeparator = newDateSeparator[0];
    }

    let newdatetime = dateArray.join(dateSeparator);
    if (time !== false) {
        newdatetime += ' ' + [hour, minute, second].join(':');
    }

    if (getDate === false) {

        let fullTime = [hour, minute, second].join(':');

        return fullTime;

    } else {

        return newdatetime;
    }

}
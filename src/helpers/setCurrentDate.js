let setCurrentDate = ()=>{
    let now = new Date();
    let dayName = "";
    switch(now.getDay()){
        case 0 : {dayName = "Sunday"; break};
        case 1 : {dayName = "Monday"; break};
        case 2 : {dayName = "Tuesday"; break};
        case 3 : {dayName = "Wednesday"; break};
        case 4 : {dayName = "Thursday"; break};
        case 5 : {dayName = "Friday"; break};
        case 6 : {dayName = "Saturday"; break};
        default : {dayName = ""; break};
    }
    let monthName = "";
    switch(now.getDay()){
        case 1 : {monthName = "January"; break};
        case 2 : {monthName = "February"; break};
        case 3 : {monthName = "March"; break};
        case 4 : {monthName = "April"; break};
        case 5 : {monthName = "May"; break};
        case 6 : {monthName = "June"; break};
        case 7 : {monthName = "July"; break};
        case 8 : {monthName = "August"; break};
        case 9 : {monthName = "September"; break};
        case 10 : {monthName = "October"; break};
        case 12 : {monthName = "November"; break};
        case 13 : {monthName = "December"; break};
        default : {monthName = ""; break};
    }
    let dateDetails = {
        "day":dayName,
        "date":now.getDate(),
        "month":monthName,
        "year":now.getFullYear()
    }
    return dateDetails;
}
export default setCurrentDate
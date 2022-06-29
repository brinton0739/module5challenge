import { ScheduleItem } from "./components/scheduleItem.js";
import { getConfig, getScheduleItemForDateAndHour, saveScheduleToLocalStorage } from "./localStorage.js";

let date = new Date();
const config = getConfig();

// we need to keep track of time so that we can highlight the current scheduled item
const durationCallback = () => {
    const currentDate = new Date();
    if (currentDate.getHours() !== date.getHours()) {
        date = new Date();
        loadSchedule();
    }
}

const timeout = setInterval(durationCallback, 1000);

const loadSchedule = () => {
    const scheduleList = document.querySelector("#scheduleList");
    document.querySelector("#currentDay").textContent = `${getDayToString(date.getDay())}, ${getMonthToString(date.getMonth())} ${date.getDate()}`;
    let schedule = "";
    // build the forms
    for (let i = config.workdayStartTime; i <= config.workdayEndTime; i++) {
        const scheduleItem = getScheduleItemForDateAndHour(date.toDateString(), i);
        schedule += ScheduleItem(i, (scheduleItem.value || ""));
    }
    // display the forms
    scheduleList.innerHTML = schedule;

    // bind eventlistener to forms
    for (let i = config.workdayStartTime; i <= config.workdayEndTime; i++) {
        const formID = `#Form-${i}`
        const hour = i;
        document.querySelector(formID).addEventListener("submit", (e) => {
            e.preventDefault();
            const scheduleText = document.querySelector(formID).elements['scheduleInput'].value;
            saveScheduleToLocalStorage(date.toDateString(), hour, scheduleText);
        })
    }
};

const getDayToString = (day) => {
    switch(day) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
    }
}

const getMonthToString = (month) => {
    switch(month) {
        case 0:
            return "January"
        case 1:
            return "February"
        case 2:
            return "March"
        case 3:
            return "April"
        case 4:
            return "May"
        case 5:
            return "June"
        case 6:
            return "July"
        case 7:
            return "August"
        case 8:
            return "September"
        case 9:
            return "October"
        case 10:
            return "November"
        case 11:
            return "December"
    }
}

loadSchedule();

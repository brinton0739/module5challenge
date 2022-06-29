// what should our calendar storage look like
const storage = {
    config: {
        workdayStartTime: 9,
        workdayEndTime: 17
    },
    schedule: [
        // date should hold the date formatted as "Wed Jun 15 2022"
        // hour should hold the hour and a value {hour: 0, value: "text value submitted"}
        // { date: "Wed Jun 15 2022", hours: [{hour: 9, value: "test"}] }
    ]
}

// function to retrieve localStorage
const getLocalStorage = () => {
    const scheduleStore = JSON.parse(localStorage.getItem('scheduleStore'));
    if (scheduleStore != null) {
        return scheduleStore;
    }
    return storage;
};

const getConfig = () => {
    const storage = getLocalStorage();
    return storage.config;
};

const getScheduleForDate = (date) => {
    const storage = getLocalStorage();
    const schedule = storage.schedule.find((item) => {
        return item.date === date;
    });
    return schedule || { date: "", hours: [] };
}

const getScheduleItemForDateAndHour = (date, hour) => {
    const schedule = getScheduleForDate(date);
    const item = schedule.hours.find((input) => {
        return input.hour === hour;
    });
    // if we can't find it lets return a default value with the hour and a blamk value
    return item || { hour: hour, value: "" };
}

// clear all schedules from local storage
const clearLocalStorage = () => {
    localStorage.removeItem('scheduleStore');
};

const saveScheduleToLocalStorage = (date, hour, value) => {
    // lets get the storage from local storage and add to it
    // first we need the storage
    const storage = getLocalStorage();
    // next we need just the schedule object that we plan to alter
    // this is the storage for the date provided
    const scheduleForDate = getScheduleForDate(date);
    // now lets get everything that's not that date so we can append
    // the new record to this array
    const filteredSchedule = storage.schedule.filter((item) => {
        return item.date !== date;
    });
    // now lets filter out the provided hour so we can append to the schedule array
    const filteredHours = scheduleForDate.hours.filter((item) => {
        return item.hour !== hour;
    });
    // lets create the new hours object for storage
    const newHours = [...filteredHours, { hour: hour, value: value }]
    // now lets create a new storage object and save it to local storage
    const newStorage = {
        config: storage.config,
        schedule: [...filteredSchedule, { date: date, hours: newHours }]
    };
    localStorage.setItem('scheduleStore', JSON.stringify(newStorage));
};

// let Storage = {
//     config: {},
//     schedule: [
//         {
//             date: 13, hours: []
//         },
//         {
//             date: 14, hours: []
//         },
//         {
//             date: 15, hours: [
//                 {hour: 9, value: "test"}, 
//                 {hour: 10, value: "next"},
//                 {hour: 11, value: "blah"}
//             ]
//         }
//     ]
// }

// let scheduleForDate = {
//     date: 15, hours: [
//         {hour: 9, value: "test"}, 
//         {hour: 10, value: "next"},
//         {hour: 11, value: "blah"}
//     ]
// }

// let filteredSchedule = {
//     schedule: [
//         {
//             date: 13, hours: []
//         },
//         {
//             date: 14, hours: []
//         }
//     ]
// }

// let filteredHours = [
//     {hour: 10, value: "next"},
//     {hour: 11, value: "blah"}
// ]

// let newHours = [
//     {hour: 10, value: "next"},
//     {hour: 11, value: "blah"},
//     {hour: 9, value: "testing"}
// ]

// let newStorage = {
//     config: {},
//     schedule: [
//         {date: 13, hours: []},
//         {date: 14, hours: []},
//         {
//             date: 15, hours: [
//                 {hour: 10, value: "next"},
//                 {hour: 11, value: "blah"},
//                 {hour: 9, value: "testing"}
//             ]
//         }
//     ]
// }





export { clearLocalStorage, getConfig, getScheduleForDate, getScheduleItemForDateAndHour, saveScheduleToLocalStorage };
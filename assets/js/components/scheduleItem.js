const prettyDate = (hour) => {
  let newHour;
  if (hour > 12) {
    newHour = `${hour-12} PM`;
  } else {
    newHour = `${hour} AM`;
  }
  return newHour;
}

const ScheduleItem = (hour, value = "") => {
  const currentTime = new Date().getHours()
  let outlineClass
  if (currentTime > hour) {
    outlineClass = "past";
  } else if (currentTime < hour) {
    outlineClass = "future";
  } else {
    outlineClass = "present";
  }

  const newHour = prettyDate(hour);
    
  return `<form id="Form-${hour}">
            <div class="input-group time-block" id="InputGroup">
              <span class="input-group-text row time-block hour" id="InputGroupText">${newHour}</span>
              <input type="text" class="textarea row form-control ${outlineClass}" id="scheduleInput" name="scheduleInput" value="${value}">
              <button class="saveBtn row btn " type="submit" id="Submit"><i class="bi bi-save" id="Icon"></i></button>
            </div>
          </form>`
}

export { ScheduleItem }
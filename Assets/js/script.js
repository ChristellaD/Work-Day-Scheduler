// ensures that the DOM content is fully loaded before initializing the script
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

const timeblockContainer = document.getElementById('timeblock-container');
// displays current date in the header
const currentDate = dayjs().format('MMMM DD, YYYY');
document.getElementById('currentDay').textContent = currentDate;
// gets current hour to be compared against timeblock hours
const currentHour = dayjs().hour();
console.log(currentHour);
console.log(currentDate);

$(function () {
// for loop creates timeblock for each hour from 9AM to 5PM (typical work day)
for (hour = 9; hour < 18; hour++) {
  const timeblock = document.createElement('div');
  const eventInput = document.createElement('textarea');
  const saveButton = document.createElement('button');
  const hourLabel = document.createElement('div');

  timeblockContainer.appendChild(timeblock);
  timeblock.classList.add('time-block','row');
  timeblock.setAttribute('id',`hour-${hour}`);

  if (hour < currentHour) {
    timeblock.classList.add('past');
    } else if (hour === currentHour) {
      timeblock.classList.add('present');
        } else {
        timeblock.classList.add('future');
        };


eventInput.classList.add('description', 'col-8', 'col-md-10');
eventInput.setAttribute('rows','3');

// ternary operator used to modify hour label to correctly display AM or PM for respective timeblocks
hourLabel.classList.add('col-2', 'col-md-1', 'hour-label', 'text-center', 'py-3');
hourLabel.textContent = hour === 12 ? '12 PM' : hour > 12 ? (hour - 12) + ' PM': `${hour} AM`;

saveButton.classList.add('btn', 'saveBtn', 'col-2', 'col-md-1');
saveButton.setAttribute('aria-label','save');
saveButton.innerHTML = '<i class="fas fa-save" aria-hidden="true"></i>';

// event listener saves user input and respective hour id to local storage
saveButton.addEventListener('click', function () { 
  const eventText = eventInput.value;
  const hourId = this.parentElement.id;
  
  localStorage.setItem(hourId, eventText);
  console.log(eventText + " @ " + hourId + " has been saved.");
  });
    
timeblock.appendChild(eventInput);
timeblock.appendChild(hourLabel);
timeblock.appendChild(saveButton);
// checks for event text and hour id for each time block. if found, data is returned and appended to page.
const savedData = localStorage.getItem(`hour-${hour}`);
if (savedData !== null) {
  console.log('Data found in local storage:', savedData);
  eventInput.value = savedData;}
  else {
    console.log('No data found in local storage for element with ID: ',`hour-${hour}`);
}}});});
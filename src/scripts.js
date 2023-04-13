// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********


// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png';

import User from './user';
import UserHydration from './userHydration';
import Sleep from './Sleep';
import fetchAll from './apiCalls';
import Activity from './Activity';
import fetchNewHydration from './newHydrationdata';
import motivationalQuotes from './motivationData';

// Global Varible Section
let userData
let allUserSleepData
let allUserHydrationData
let allUserActivityData

let currentUser;
let currentUserSleep;
let currentUserHydration;
let currentUserActivity;

//Selectors
const hydrationDisplay = document.querySelector('.hydration-display')
const sleepDisplay = document.querySelector('.sleep-display')
const activityDisplay = document.querySelector('.activity-display')
const newHydrationData = document.querySelector('.hydration-display')
const motivatedInput = document.getElementById("motivated-input")
const unmotivatedInput = document.getElementById("unmotivated-input")
const displayQuoteBox = document.querySelector(".display-quote-box")
const submitButton = document.querySelector(".submit-message-button")

window.addEventListener('load', () => {
  fetchAll()
    .then(data => {
      userData = data[0]
      allUserSleepData = data[1]
      allUserHydrationData = data[2]
      console.log(allUserHydrationData)
      allUserActivityData = data[3]
      pageLoad()
      fetchNewHydration()
    })
})

// newHydrationData.addEventListener('click', createNewHydrationData())


function loadUserInfo(currentUserData, userData) {
  document.getElementById('firstName').innerHTML = `Welcome ${currentUserData.userName}!`;
  document.getElementById('fullName').innerHTML = `User: ${currentUserData.userName}`
  document.getElementById('address').innerHTML = `Address: ${currentUserData.address}`;
  document.getElementById('email').innerHTML = `Email: ${currentUserData.email}`;
  document.getElementById('strideLength').innerHTML = `Stride Length : ${currentUserData.strideLength}`;
  document.getElementById('dailyStepgoal').innerHTML = `Daily Step Goal: ${currentUserData.dailyStepGoal}`;
}

function pageLoad() {
  currentUser = new User(userData);
  currentUserSleep = new Sleep(currentUser.userId, allUserSleepData);
  currentUserHydration = new UserHydration(currentUser.userId, allUserHydrationData);
  currentUserActivity = new Activity(currentUser.findUserById(currentUser.userId, userData), allUserActivityData);

  // User
  loadUserInfo(currentUser, userData)
  // *** Need their step goal compared to all user step goal

  // Sleep
  sleepSummaryCard(currentUserSleep.findAllTimeAvgOfDetail('hoursSlept'),
    currentUserSleep.findAllTimeAvgOfDetail('sleepQuality'));
  sleepWeekCard('Hours',
    currentUserSleep.findDetailByDay(currentUserSleep.findMostRecentDay(), 'hoursSlept'),
    currentUserSleep.findDetailLastSevenDays('hoursSlept'));
  sleepWeekCard('Quality',
    currentUserSleep.findDetailByDay(currentUserSleep.findMostRecentDay(), 'sleepQuality'),
    currentUserSleep.findDetailLastSevenDays('sleepQuality'));

  // Hydration
  createSingleCard('Today\'s Ounces',
    currentUserHydration.findSingleDayOunces(currentUserHydration.findMostRecentDay()));
  createSevenDayCard('Ounces for Week',
    currentUserHydration.findOuncesLastSevenDays());
    // createNewHydrationData('Today\'s Ounces', )

  // Activity 
  activityCard(currentUserActivity.findMostRecentSteps(),
    currentUserActivity.calculateMiles(currentUserActivity.findMostRecentDay()),
    currentUserActivity.findStepsLastSevenDays(currentUserActivity.findMostRecentDay()), currentUserActivity.checkGoalLastSevenDays(currentUserActivity.findMostRecentDay()))
}
function selectMotivation() {
 if(motivatedInput.checked === true){
  displayQuoteBox.innerText = `${motivationalQuotes[getRandomIndex(motivationalQuotes)]}`
 } else if(unmotivatedInput.checked === true){
  displayQuoteBox.innerText = `${motivationalQuotes[getRandomIndex(motivationalQuotes)]}`
 }

}

function sleepSummaryCard(avgHours, avgQuality) {
  sleepDisplay.innerHTML += `
  <section class='card sleep-summary'> 
       <h3> Sleep Summary </h3>
      <div>
          <p>All-time Hours Average: </p>  
          <p> ${avgHours} </p> 
          <br>
          <p> All-time Quality Average: </p>
          <p> ${avgQuality} </p>
      </div>
      <img id="sleepIcon" src="Sleep-Icon.PNG" alt="Sleep-Icon" width="50" height="50"/>
   </section>`
}

function sleepWeekCard(detail, detailToday, detailByWeek) {
  sleepDisplay.innerHTML += `
  <section class='card sleep-week'> 
    <h3>Sleep ${detail}</h3>
       <h3> Today </h3>
      <div>
             <p> ${detailToday} </p> 
      </div>
      <h3> This Week </h3>
      <div class='data-row'>
        <p> ${detailByWeek[0]} </p>
        <p> ${detailByWeek[1]} </p>
        <p> ${detailByWeek[2]} </p>
        <p> ${detailByWeek[3]} </p>
        <p> ${detailByWeek[4]} </p>
        <p> ${detailByWeek[5]} </p>
        <p> ${detailByWeek[6]} </p>
   </div>
   </section>`
}

function activityCard(stepCount, miles, weekSteps, stepGoalMet) {
  activityDisplay.innerHTML += `
   <section class='card activity' id= 'card-activity'>
    <div>
      <h3> Total Active Minutes</h3>
      <br>
      <p> ${stepCount} steps </p>
      <br>
      <p> ${miles} miles</p>
      <br>
    </div>
    <div class='data-row'>
      <p>Week 1: ${weekSteps[0]} </p>
      <br>
      <p>Week 2: ${weekSteps[1]} </p>
      <br>
      <p>Week 3: ${weekSteps[2]} </p>
      <br>
      <p>Week 4: ${weekSteps[3]} </p>
      <br>
      <p>Week 5: ${weekSteps[4]} </p>
      <br>
      <p>Week 6: ${weekSteps[5]} </p>
      <br>
      <p>Week 7: ${weekSteps[6]} </p> 
      <br>
    </div>
    <div class ='data-row'> 
       <p> ${stepGoalMet[0]} </p>
       <br>
      <p> ${stepGoalMet[1]} </p>
      <br>
      <p> ${stepGoalMet[2]} </p>
      <br>
      <p> ${stepGoalMet[3]} </p>
      <br>
      <p> ${stepGoalMet[4]} </p>
      <br>
      <p> ${stepGoalMet[5]} </p>
      <br>
      <p> ${stepGoalMet[6]} </p> 
    </div> 
    <img id="activityLogo" src="activity-icon.png" alt="activity-icon" width="50" height="50"/>
   </section>
  `
}

function createSingleCard(cardTitle, outputToDisplay) {
  hydrationDisplay.innerHTML += `
  <section class='card single'> 
  <h3> ${cardTitle} </h3>
  <div>
  <p> ${outputToDisplay} </p>
  </div>
  <img id="hydrationIcon" src="Hydration-Icon.PNG" alt="Hydration-Icon" width="50" height="50"/>
  </section>`
}

function createSevenDayCard(cardTitle, outputToDisplay) {
  hydrationDisplay.innerHTML += `
  <section class='card seven-day'> 
    <h3> ${cardTitle} </h3>
    <div class='dataRow'>
      <p> ${outputToDisplay[0]} </p>
      <p> ${outputToDisplay[1]} </p>
      <p> ${outputToDisplay[2]} </p>
      <p> ${outputToDisplay[3]} </p>
      <p> ${outputToDisplay[4]} </p>
      <p> ${outputToDisplay[5]} </p>
      <p> ${outputToDisplay[6]} </p>
    </div>
  </section>`
}

getRandomIndex(array){
  return Math.floor(math.random()*array.lenght)
}

export default currentUser

// function createNewHydrationData(cardTitle, outputToDisplay) {
//   const newHydrationData = fetchHydrationData()

//   hydrationDisplay.innerHTML += `
//         <section class='card single'> 
//         <h3> ${cardTitle} </h3>
//         <div>
//         <p> ${outputToDisplay} </p>
//         </div>
//         <img id="hydrationIcon" src="Hydration-Icon.PNG" alt="Hydration-Icon" width="50" height="50"/>
//         </section>`
// }
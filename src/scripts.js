// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import './css/styles.css';
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
let hydrationSubmitButton
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
    })
})

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
  createSingleCard(currentUserHydration.findMostRecentDay(),
    currentUserHydration.findSingleDayOunces(currentUserHydration.findMostRecentDay()));
  createSevenDayCard('Ounces for Week',
    currentUserHydration.findOuncesLastSevenDays());
  
  // Activity 
  activityCard(currentUserActivity.findMostRecentSteps(),
    currentUserActivity.calculateMiles(currentUserActivity.findMostRecentDay()),
    currentUserActivity.findStepsLastSevenDays(currentUserActivity.findMostRecentDay()), currentUserActivity.checkGoalLastSevenDays(currentUserActivity.findMostRecentDay()))

  // Event Listeners
   hydrationSubmitButton = document.querySelector(".hydration-submit")
  hydrationSubmitButton.addEventListener('click',createNewHydrationData);
}

submitButton.addEventListener('click', selectMotivation)


function getRandomIndex(array){
  return Math.floor(Math.random() * array.length)
};

function selectMotivation() {
 if(motivatedInput.checked === true){
  displayQuoteBox.innerText = `${motivationalQuotes[getRandomIndex(motivationalQuotes)]}`
 } else if(unmotivatedInput.checked === true){
  displayQuoteBox.innerText = `${motivationalQuotes[getRandomIndex(motivationalQuotes)]}`
 }

}

function sleepSummaryCard(avgHours, avgQuality) {
  sleepDisplay.innerHTML += `
  <section class='card' id="card-summary-sleep"> 
       <h3> Sleep Summary </h3>
      <div class="card">
          <p>All-time Hours Average: </p>  
          <p> ${avgHours} Avg </p> 
          
          <p> All-time Quality Average: </p>
          <p> ${avgQuality} Avg </p>
      </div>
      <img id="sleepIcon" src="Sleep-Icon.PNG" alt="Sleep-Icon" width="50" height="50"/>
   </section>`
}

function sleepWeekCard(detail, detailToday, detailByWeek) {
  sleepDisplay.innerHTML += `
  <section class="card" id='card-sleep-week'> 
    <h3>Sleep ${detail}</h3>
       <h3> Today </h3>
       <div class="card">
             <p> Hours Today ${detailToday} </p> 
      </div>
      <h3> This Week </h3>
      <div class='data-row'>
        <p> Day One: ${detailByWeek[0]} </p>
        <p> Day Two: ${detailByWeek[1]} </p>
        <p> Day Three: ${detailByWeek[2]} </p>
        <p> Day Four: ${detailByWeek[3]} </p>
        <p> Day Five: ${detailByWeek[4]} </p>
        <p> Day Six: ${detailByWeek[5]} </p>
        <p> Day Sexen: ${detailByWeek[6]} </p>
   </div>
   <img id="sleepIcon2" src="Sleep-Icon.PNG" alt="Sleep-Icon" width="50" height="50"/>
   </section>`
}

function activityCard(stepCount, miles, weekSteps, stepGoalMet) {
  activityDisplay.innerHTML += `
   <section class='card' id= 'card-activity'>
    <div class="card">
      <h3> Total Active Minutes</h3>
      
      <p> ${stepCount} steps </p>
      
      <p> ${miles} miles</p>

      <p>Week 1: ${weekSteps[0]} </p>
      
      <p>Week 2: ${weekSteps[1]} </p>
      
      <p>Week 3: ${weekSteps[2]} </p>
      
      <p>Week 4: ${weekSteps[3]} </p>
      
      <p>Week 5: ${weekSteps[4]} </p>
      
      <p>Week 6: ${weekSteps[5]} </p>
      
      <p>Week 7: ${weekSteps[6]} </p> 

      <p> Goal Met: ${stepGoalMet[0]} </p>
       
      <p> Goal Met: ${stepGoalMet[1]} </p>
      
      <p> Goal Met: ${stepGoalMet[2]} </p>
      
      <p> Goal Met: ${stepGoalMet[3]} </p>
      
      <p> Goal Met: ${stepGoalMet[4]} </p>
      
      <p> Goal Met: ${stepGoalMet[5]} </p>
      
      <p> Goal Met: ${stepGoalMet[6]} </p> 
      
    </div>
    <div class='data-row'>  
    </div> 
    <img id="activityLogo" src="activity-icon.png" alt="activity-icon" width="50" height="50"/>
   </section>
  `
}

function createSingleCard(cardTitle, outputToDisplay) {
  hydrationDisplay.innerHTML += `
  <section class='card'id="hydration-single-card"> 
  <h3> Today's Date: ${cardTitle} </h3>
  <div class="card">
  <p> Today's Ounces: ${outputToDisplay} </p>
  <form>
    <fieldset>
    <legend>Update Daily Ounces</legend>
    <input id="ouncesInput" type="number" name="updated-ounces" value="0">
    <button class="hydration-submit">Submit Ounces
    </fieldset>
  </form>
  </div>
  <img id="hydrationIcon" src="Hydration-Icon.PNG" alt="Hydration-Icon" width="50" height="50"/>
  </section>`
}

function createSevenDayCard(cardTitle, outputToDisplay) {
  hydrationDisplay.innerHTML += `
  <section class='card' id="hydration-week-card"> 
    <h3> ${cardTitle} </h3>
    <div class="card">
      <p> Day One: ${outputToDisplay[0]} </p>
      <p> Day Two: ${outputToDisplay[1]} </p>
      <p> Day Three: ${outputToDisplay[2]} </p>
      <p> Day Four: ${outputToDisplay[3]} </p>
      <p> Day Five: ${outputToDisplay[4]} </p>
      <p> Day Six: ${outputToDisplay[5]} </p>
      <p> Day Seve: ${outputToDisplay[6]} </p>
    </div>
    <img id="hydrationIcon2" src="Hydration-Icon.PNG" alt="Hydration-Icon" width="50" height="50"/>
  </section>`
}



function createNewHydrationData(e) {
  e.preventDefault();
  const ouncesInput = document.getElementById("ouncesInput")
  currentUserHydration = new UserHydration(currentUser.userId,allUserHydrationData);
  fetchNewHydration(currentUser.userId, currentUserHydration.findMostRecentDay(),ouncesInput.value)
}



export default currentUser

const hydrationURL = 'http://localhost:3001/api/v1/hydration'

const fetchNewHydration = (userId, currentDate, userOunces) => {
  fetch(hydrationURL, {
    method: 'POST',
    body: JSON.stringify({   
      userID: userId,
      date: currentDate,
      numOunces: userOunces
  }),
    headers: {"Content-Type": "application/json"}
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.log(error))
 }
 


 export default fetchNewHydration


 




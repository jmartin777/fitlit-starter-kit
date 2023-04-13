
import currentUser from "./scripts"

const hydrationURL = 'http://localhost:3001/api/v1/hydration'

const fetchNewHydration = (numOunces) => {
  fetch(hydrationURL, {
    method: 'POST',
    body: JSON.stringify({   
      userID: 1,
      date: "4/11/2023",
      numOunces: 54
  }),
    headers: {"Content-Type": "application/json"}
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    currentUser.numOunces = numOunces;
  })
  .catch(error => console.log(error))
 }
 


 export default fetchNewHydration


 




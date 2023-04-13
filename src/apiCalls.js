const fetchData = (url) => {
return fetch(url)
.then(response => response.json())
};

const fetchAll = () => {
  return Promise.all([
  fetchData('https://fitlit-api.herokuapp.com/api/v1/users'),
  fetchData('https://fitlit-api.herokuapp.com/api/v1/sleep'),
  fetchData('http://localhost:3001/api/v1/hydration'),
  fetchData('https://fitlit-api.herokuapp.com/api/v1/activity')
  ]);
} 


export default fetchAll


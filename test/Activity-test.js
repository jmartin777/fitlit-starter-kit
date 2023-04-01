import { expect } from 'chai';
import Activity from '../src/Activity';

describe('Activity', () => {
    let testUser;
    let activityLog;
    beforeEach('data creation', () => {
        activityLog = {
            activityData: [
                { "userID": 1, "date": "2023/03/24", "numSteps": 7362, "minutesActive": 261, "flightsOfStairs": 26 },
                { "userID": 2, "date": "2023/03/24", "numSteps": 3049, "minutesActive": 125, "flightsOfStairs": 43 },
                { "userID": 3, "date": "2023/03/24", "numSteps": 12970, "minutesActive": 282, "flightsOfStairs": 38 },
                { "userID": 4, "date": "2023/03/24", "numSteps": 8934, "minutesActive": 294, "flightsOfStairs": 19 },
                { "userID": 5, "date": "2023/03/24", "numSteps": 8443, "minutesActive": 136, "flightsOfStairs": 43 },
                { "userID": 6, "date": "2023/03/24", "numSteps": 13297, "minutesActive": 116, "flightsOfStairs": 13 },
                { "userID": 7, "date": "2023/03/24", "numSteps": 7765, "minutesActive": 74, "flightsOfStairs": 31 }]
        }
    })
})
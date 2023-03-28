class userHydration {
  constructor(userID, hydrationDataArray) {
    this.userID = userID
    this.hydrationInfo = hydrationDataArray.filter(user => user.userID === userID)
  }

  calculateAllTimeAverageDailyOunces() {
    const allTimeTotalOunces = this.hydrationInfo
      .reduce((acc, cur) => {
        return acc += cur.numOunces
      }, 0)

    const allTimeAverage = allTimeTotalOunces / hydrationData.length

    return allTimeAverage
  }

  calculateSingleDayOunces(day) {

    const allDays = this.hydrationInfo.filter(dayInfo => dayInfo.date === day)
    const totalOunces = allDays.reduce((acc, cur) => {
      return acc += cur.numOunces
    }, 0)

    return totalOunces
  }

  calculateOuncesLastSevenDays(startDate, endDate) {
    // We want this to calc last seven days 
    // needs return an array of numbers 
    // use a forEach to log 
    return this.hydrationInfo.sort()


  }
}
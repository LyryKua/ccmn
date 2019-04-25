export const responseToDwellTime = responseData => {
  const dwellTime = {
    fiveToThirtyMinutes: [],
    thirtyToSixtyMinutes: [],
    oneToFiveHours: [],
    fiveToEightHours: [],
    eightPlusHours: [],
  };
  Object.values(responseData).forEach(data => {
    dwellTime.fiveToThirtyMinutes.push(data['FIVE_TO_THIRTY_MINUTES']);
    dwellTime.thirtyToSixtyMinutes.push(data['THIRTY_TO_SIXTY_MINUTES']);
    dwellTime.oneToFiveHours.push(data['ONE_TO_FIVE_HOURS']);
    dwellTime.fiveToEightHours.push(data['FIVE_TO_EIGHT_HOURS']);
    dwellTime.eightPlusHours.push(data['EIGHT_PLUS_HOURS']);
  });

  return dwellTime;
};

export const responseToDwellTimeDistribution = responseData => ({
  fiveToThirtyMinutes: responseData['FIVE_TO_THIRTY_MINUTES'],
  thirtyToSixtyMinutes: responseData['THIRTY_TO_SIXTY_MINUTES'],
  oneToFiveHours: responseData['ONE_TO_FIVE_HOURS'],
  fiveToEightHours: responseData['FIVE_TO_EIGHT_HOURS'],
  eightPlusHours: responseData['EIGHT_PLUS_HOURS'],
});

export const responseToRepeatVisitors = responseData => {
  const dwellTime = {
    daily: [],
    firstTime: [],
    occasional: [],
    weekly: [],
    yesterday: [],
  };
  Object.values(responseData).forEach(data => {
    dwellTime.daily.push(data['DAILY']);
    dwellTime.firstTime.push(data['FIRST_TIME']);
    dwellTime.occasional.push(data['OCCASIONAL']);
    dwellTime.weekly.push(data['WEEKLY']);
    dwellTime.yesterday.push(data['YESTERDAY']);
  });

  return dwellTime;
};

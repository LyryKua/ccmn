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

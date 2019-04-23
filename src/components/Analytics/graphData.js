/*
 * ----- Proximity / Proximity Distribution ----------------------------------------------------------------------------
 */

const proximityBackgroundColor = ['rgba(76, 175, 80, 0.2)', 'rgba(233, 30, 99, 0.2)', 'rgba(33, 150, 243, 0.2)'];
const proximityBorderColor = ['#6fbf73', '#ed4b82', '#4dabf5'];
const proximityHoverBackgroundColor = proximityBorderColor;

const barProximityLabel = ['Passerby', 'Visitors', 'Connected'];

export const barProximityLabels = [
  '12am-1am',
  '1am-2am',
  '2am-3am',
  '3am-4am',
  '4am-5am',
  '6am-7am',
  '7am-8am',
  '8am-9am',
  '9am-10am',
  '10am-11am',
  '11am-12pm',
  '12pm-1pm',
  '11am-12pm',
  '1pm-2pm',
  '2pm-3pm',
  '3pm-4pm',
  '4pm-5pm',
  '5pm-6pm',
  '6pm-7pm',
  '7pm-8pm',
  '8pm-9pm',
  '9pm-10pm',
  '10pm-11pm',
  '11pm-12am',
];
export const barProximityDatasets = (passerby, visitor, connected) => {
  let data = [
    {
      data: [],
      label: barProximityLabel[0],
      backgroundColor: proximityBackgroundColor[0],
      borderColor: proximityBorderColor[0],
      borderWidth: 1,
      hoverBackgroundColor: proximityHoverBackgroundColor[0],
    },
    {
      data: [],
      label: barProximityLabel[1],
      backgroundColor: proximityBackgroundColor[1],
      borderColor: proximityBorderColor[1],
      borderWidth: 1,
      hoverBackgroundColor: proximityHoverBackgroundColor[1],
    },
    {
      data: [],
      label: barProximityLabel[2],
      backgroundColor: proximityBackgroundColor[2],
      borderColor: proximityBorderColor[2],
      borderWidth: 1,
      hoverBackgroundColor: proximityHoverBackgroundColor[2],
    },
  ];
  if (passerby && visitor && connected) {
    data[0].data = passerby;
    data[1].data = visitor;
    data[2].data = connected;
  }
  return data;
};

export const pieProximityLabels = barProximityLabel;
export const pieProximityDatasets = (totalPasserbyCount, totalVisitorCount, totalConnectedCount) => [{
  data: [totalPasserbyCount, totalVisitorCount, totalConnectedCount],
  backgroundColor: proximityBackgroundColor,
  borderColor: proximityBorderColor,
  borderWidth: 1,
  hoverBackgroundColor: proximityHoverBackgroundColor,
}];

/*
 * ----- Dwell Time / Dwell Time Distribution --------------------------------------------------------------------------
 */

const dwellTimeBackgroundColor = ['rgba(76, 175, 80, 0.2)', 'rgba(233, 30, 99, 0.2)', 'rgba(33, 150, 243, 0.2)', 'rgba(255, 193, 7, 0.2)', 'rgba(101, 115, 195, 0.2)'];
const dwellTimeBorderColor = ['#6fbf73', '#ed4b82', '#4dabf5', '#ffcd38', '#6573c3'];
const dwellTimeHoverBackgroundColor = dwellTimeBorderColor;
const lineDwellTimeLabel = [
  '5-30 mins',
  '30-60 mins',
  '1-5 hours',
  '5-8 hours',
  '8+ hours',
];
export const lineDwellTimeLabels = barProximityLabels;
export const lineDwellTimeDatasets = data => {
  let ret = [
    {
      data: [],
      label: '5-30 mins',
      backgroundColor: dwellTimeBackgroundColor[0],
      borderColor: dwellTimeBorderColor[0],
      borderWidth: 1,
    },
    {
      data: [],
      label: '30-60 mins',
      backgroundColor: dwellTimeBackgroundColor[1],
      borderColor: dwellTimeBorderColor[1],
      borderWidth: 1,
    },
    {
      data: [],
      label: '1-5 hours',
      backgroundColor: dwellTimeBackgroundColor[2],
      borderColor: dwellTimeBorderColor[2],
      borderWidth: 1,
    },
    {
      data: [],
      label: '5-8 hours',
      backgroundColor: dwellTimeBackgroundColor[3],
      borderColor: dwellTimeBorderColor[3],
      borderWidth: 1,
    },
    {
      data: [],
      label: '8+ hours',
      backgroundColor: dwellTimeBackgroundColor[4],
      borderColor: dwellTimeBorderColor[4],
      borderWidth: 1,
    },
  ];
  // console.log(Object.values(data));
  if (data) {
    return ret.map((item, index) => {
      return {
        ...item,
        data: Object.values(data)[index],
      }
    })
  }
  return ret;
};

export const pieDwellTimeLabels = lineDwellTimeLabel;

export const pieDwellTimeDatasets = (fiveToThirtyMinutes, thirtyToSixtyMinutes, oneToFiveHours, fiveToEightHours, eightPlusHours) => [{
  data: [fiveToThirtyMinutes, thirtyToSixtyMinutes, oneToFiveHours, fiveToEightHours, eightPlusHours],
  backgroundColor: dwellTimeBackgroundColor,
  borderColor: dwellTimeBorderColor,
  borderWidth: 1,
  hoverBackgroundColor: dwellTimeHoverBackgroundColor,
}];

/*
 * ----- Repeat Visitors / Repeat Visitors Distribution ----------------------------------------------------------------
 */

const repeatVisitorsBackgroundColor = ['rgba(76, 175, 80, 0.2)', 'rgba(233, 30, 99, 0.2)', 'rgba(33, 150, 243, 0.2)', 'rgba(255, 193, 7, 0.2)', 'rgba(101, 115, 195, 0.2)'];
const repeatVisitorsBorderColor = ['#6fbf73', '#ed4b82', '#4dabf5', '#ffcd38', '#6573c3'];
const lineRepeatVisitorsLabel = [
  'Daily',
  'Weekly',
  'Occasional',
  'First Time',
  'Yesterday',
];
export const lineRepeatVisitorsLabels = barProximityLabels;
export const lineRepeatVisitorsDatasets = (data) => {
  let ret = [
    {
      data: [],
      label: lineRepeatVisitorsLabel[0],
      backgroundColor: repeatVisitorsBackgroundColor[0],
      borderColor: repeatVisitorsBorderColor[0],
      borderWidth: 1,
    },
    {
      data: [],
      label: lineRepeatVisitorsLabel[1],
      backgroundColor: repeatVisitorsBackgroundColor[1],
      borderColor: repeatVisitorsBorderColor[1],
      borderWidth: 1,
    },
    {
      data: [],
      label: lineRepeatVisitorsLabel[2],
      backgroundColor: repeatVisitorsBackgroundColor[2],
      borderColor: repeatVisitorsBorderColor[2],
      borderWidth: 1,
    },
    {
      data: [],
      label: lineRepeatVisitorsLabel[3],
      backgroundColor: repeatVisitorsBackgroundColor[3],
      borderColor: repeatVisitorsBorderColor[3],
      borderWidth: 1,
    },
    {
      data: [],
      label: lineRepeatVisitorsLabel[4],
      backgroundColor: repeatVisitorsBackgroundColor[4],
      borderColor: repeatVisitorsBorderColor[4],
      borderWidth: 1,
    },
  ];
  if (data) {
    let tmp = Object.values(data);
    for (let i = 0; i < tmp.length; i++) {
      ret[0].data.push(tmp[i].DAILY);
      ret[1].data.push(tmp[i].WEEKLY);
      ret[2].data.push(tmp[i].OCCASIONAL);
      ret[3].data.push(tmp[i].FIRST_TIME);
      ret[4].data.push(tmp[i].YESTERDAY);
    }
  }
  return ret
};

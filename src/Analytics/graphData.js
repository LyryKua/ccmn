//
//-----first data-------------------------------------------------------------------------------------------------------
//


const barProximityArr = () => Array.from({length: 16}, () => Math.floor(Math.random() * 15 + 5));
const pieProximityArr = () => Array.from({length: 3}, () => Math.floor(Math.random() * 15 + 5));


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
];
export const barProximityDatasets = Array.from({length: 3}, (v, index) => ({
    data: barProximityArr(),
    label: barProximityLabel[index % 3],
    backgroundColor: proximityBackgroundColor[index % 3],
    borderColor: proximityBorderColor[index % 3],
    borderWidth: 1,
    hoverBackgroundColor: proximityHoverBackgroundColor[index % 3],
}));

export const pieProximityLabels = barProximityLabel;
export const pieProximityDatasets = [{
    data: pieProximityArr(),
    backgroundColor: proximityBackgroundColor,
    borderColor: proximityBorderColor,
    borderWidth: 1,
    hoverBackgroundColor: proximityHoverBackgroundColor,
}];

/*
 * ----- Dwell Time / Dwell Time Distribution --------------------------------------------------------------------------
 */

const lineDwellTimeArr = () => Array.from({length: 16}, () => Math.floor(Math.random() * 15 + 5));
const pieDwellTimeArr = () => Array.from({length: 5}, () => Math.floor(Math.random() * 15 + 5));


const dwellTimeBackgroundColor = ['rgba(76, 175, 80, 0.2)', 'rgba(233, 30, 99, 0.2)', 'rgba(33, 150, 243, 0.2)', 'rgba(255, 193, 7, 0.2)', 'rgba(101, 115, 195, 0.2)',];
const dwellTimeBorderColor = ['#6fbf73', '#ed4b82', '#4dabf5', '#ffcd38', '#6573c3',];
const dwellTimeHoverBackgroundColor = dwellTimeBorderColor;
const lineDwellTimeLabel = [
    '5-30 mins',
    '30-60 mins',
    '1-5 hours',
    '5-8 hours',
    '8+ hours',
];
export const lineDwellTimeLabels = barProximityLabels;
export const lineDwellTimeDatasets = Array.from({length: 5}, (v, index) => ({
    data: lineDwellTimeArr(),
    label: lineDwellTimeLabel[index % 5],
    backgroundColor: dwellTimeBackgroundColor[index % 5],
    borderColor: dwellTimeBorderColor[index % 5],
    borderWidth: 1,
}));

export const pieDwellTimeLabels = lineDwellTimeLabel;
export const pieDwellTimeDatasets = [{
    data: pieDwellTimeArr(),
    backgroundColor: dwellTimeBackgroundColor,
    borderColor: dwellTimeBorderColor,
    borderWidth: 1,
    hoverBackgroundColor: dwellTimeHoverBackgroundColor,
}];

//
//-----third data-------------------------------------------------------------------------------------------------------
//

const lineRepeatVisitorsArr = () => Array.from({length: 16}, () => Math.floor(Math.random() * 15 + 5));
const pieRepeatVisitorsArr = () => Array.from({length: 5}, () => Math.floor(Math.random() * 15 + 5));


const repeatVisitorsBackgroundColor = ['rgba(76, 175, 80, 0.2)', 'rgba(233, 30, 99, 0.2)', 'rgba(33, 150, 243, 0.2)', 'rgba(255, 193, 7, 0.2)', 'rgba(101, 115, 195, 0.2)',];
const repeatVisitorsBorderColor = ['#6fbf73', '#ed4b82', '#4dabf5', '#ffcd38', '#6573c3',];
const repeatVisitorsHoverBackgroundColor = repeatVisitorsBorderColor;
const lineRepeatVisitorsLabel = [
    'Daily',
    'Weekly',
    'Occasional',
    'First Time',
    'Yesterday',
];
export const lineRepeatVisitorsLabels = barProximityLabels;
export const lineRepeatVisitorsDatasets = Array.from({length: 5}, (v, index) => ({
    data: lineRepeatVisitorsArr(),
    label: lineRepeatVisitorsLabel[index % 5],
    backgroundColor: repeatVisitorsBackgroundColor[index % 5],
    borderColor: repeatVisitorsBorderColor[index % 5],
    borderWidth: 1,
}));

export const pieRepeatVisitorsLabels = lineRepeatVisitorsLabel;
export const pieRepeatVisitorsDatasets = [{
    data: pieRepeatVisitorsArr(),
    backgroundColor: repeatVisitorsBackgroundColor,
    borderColor: repeatVisitorsBorderColor,
    borderWidth: 1,
    hoverBackgroundColor: repeatVisitorsHoverBackgroundColor,
}];

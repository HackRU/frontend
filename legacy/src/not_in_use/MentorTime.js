//MentorTime.js

//need to fill in dates
var MentorTime = {
  className: 'extra-right',
  prompt: 'Choose your preferred times.',
  items: [{
    title: 'Saturday Morning',
    id: 'sat-morn-ment-inp',
    name: 'ment-time',
    type: 'checkbox',
    value: 'sat-morn',
    htmlFor: 'sat-morn-ment-inp'
  }, {
    title: 'Saturday Afternoon',
    id: 'sat-noon-ment-inp',
    name: 'ment-time',
    type: 'checkbox',
    value: 'sat-noon',
    htmlFor: 'sat-noon-ment-inp'
  }, {
    title: 'Saturday Evening',
    id: 'sat-night-ment-inp',
    name: 'ment-time',
    type: 'checkbox',
    value: 'sat-night',
    htmlFor: 'sat-night-ment-inp'
  }, {
    title: 'Sunday Morning',
    id: 'sun-ment-inp',
    name: 'ment-time',
    type: 'checkbox',
    value: 'sun',
    htmlFor: 'sun-ment-inp'
  }]
};

export default MentorTime;

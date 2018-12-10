//VolunteerTime.js

//need to fill in dates
var VolunteerTime = {
  className: 'extra-right',
  prompt: 'Choose your preferred times.',
  items: [{
    title: 'Saturday Morning',
    id: 'sat-morn-vol-inp',
    name: 'vol-time',
    type: 'checkbox',
    value: 'sat-morn',
    htmlFor: 'sat-morn-vol-inp'
  }, {
    title: 'Saturday Afternoon',
    id: 'sat-noon-vol-inp',
    name: 'vol-time',
    type: 'checkbox',
    value: 'sat-noon',
    htmlFor: 'sat-noon-vol-inp'
  }, {
    title: 'Saturday Evening',
    id: 'sat-night-vol-inp',
    name: 'vol-time',
    type: 'checkbox',
    value: 'sat-night',
    htmlFor: 'sat-night-vol-inp'
  }, {
    title: 'Sunday Morning',
    id: 'sun-vol-inp',
    name: 'vol-time',
    type: 'checkbox',
    value: 'sun',
    htmlFor: 'sun-vol-inp'
  }]
};

export default VolunteerTime;

//VolunteerArea.js

var VolunteerArea = {
  className: 'extra-left',
  prompt: 'Choose your preferred area.',
  items: [{
    title: 'Setup',
    id: 'set-up-vol-inp',
    name: 'vol-cat',
    type: 'radio',
    value: 'set-up',
    htmlFor: 'set-up-vol-inp'
  }, {
    title: 'Registration',
    id: 'registration-vol-inp',
    name: 'vol-cat',
    type: 'radio',
    value: 'registration',
    htmlFor: 'registration-vol-inp'
  }, {
    title: 'Events',
    id: 'event-vol-inp',
    name: 'vol-cat',
    type: 'radio',
    value: 'event',
    htmlFor: 'event-vol-inp'
  }, {
    title: 'Workshops',
    id: 'workshop-vol-inp',
    name: 'vol-cat',
    type: 'radio',
    value: 'workshop',
    htmlFor: 'workshop-vol-inp'
  }, {
    title: 'Food',
    id: 'food-vol-inp',
    name: 'vol-cat',
    type: 'radio',
    value: 'food',
    htmlFor: 'food-vol-inp'
  }]
};


export default VolunteerArea;





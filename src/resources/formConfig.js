//formConfig.js
const formConfig = {
  'email': {
    'select': false,
    'type': 'email'
  },
  'github': {
    'select': false,
    'type': 'text',
    'searchFn': (i) => fetch(`https://api.github.com/search/users?q=${i}`)
      .then(r => r.json()).then(j => ({options: j.items})),
    'create': false
  },
  'major': {
    'select': true,
    'searchFn': (i) => fetch('majors.json')
      .then(r => r.json()).then(json => ({options: json.items
      .map(i => ({'value': i, 'label': i}))})),
    'create': true
  },
  'shirt_size': {
    'select': true,
    'options': ['Unisex XS', 'Unisex S', 'Unisex M', 'Unisex L', 'Unisex XL']
      .map(v => ({'value': v, 'label': v})),
    'create': false
  },
  'first_name': {
    'select': false,
    'type': 'text'
  },
  'last_name': {
    'select': false,
    'type': 'text'
  },
  'dietary_restrictions': {
    'select': false,
    'type': 'text'
  },
  'special_needs': {
    'select': false,
    'type': 'text'
  },
  'date_of_birth': {
    'select': false,
    'type': 'date'
  },
  'school': {
    'select': true,
    'searchFn': (i) => fetch('https://raw.githubusercontent.com/MLH/mlh-policies/master/schools.csv')
      .then(r => r.text()).then(csv => {
        const rv = csv.split('\n').map(ln => ln.replace(/[\r",]/g, ''))
          .slice(1).map(v => ({'label': v, 'value': v}));
          return {options: rv};
    }),
    'create': false
  },
  'grad_year': {
    'select': true,
    'options': [2018, 2019, 2020, 2021, 2022]
      .map(v => ({'value': v, 'label': v})),
    'create': true
  },
  'level_of_study': {
    'select': true,
    'options': ['University (Undergraduate)', 'University (Graduate)', 'High School']
      .map(v => ({'value': v, 'label': v})),
    'create': true
  },
  'gender': {
    'select': true,
    'options': ['Male', 'Female', 'Non-binary']
      .map(v => ({'value': v, 'label': v})),
    'create': true
  }
};

export default formConfig;

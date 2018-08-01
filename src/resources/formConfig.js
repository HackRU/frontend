//formConfig.js
const formConfig = {
  'email': {
    'select': false,
    'type': 'email',
    'required': true
  },
  'github': {
    'select': false,
    'type': 'text',
    'searchFn': (i) => fetch(`https://api.github.com/search/users?q=${i}`)
      .then(r => r.json()).then(j => ({options: j.items})),
    'create': false,
    'required': false
  },
  'major': {
    'select': true,
    'searchFn': (i) => fetch('majors.json')
      .then(r => r.json()).then(json => ({options: json.items
        .map(i => ({'value': i, 'label': i}))})),
    'create': true,
    'required': true
  },
  'shirt_size': {
    'select': true,
    'options': ['Unisex XS', 'Unisex S', 'Unisex M', 'Unisex L', 'Unisex XL']
      .map(v => ({'value': v, 'label': v})),
    'create': false,
    'required': true
  },
  'first_name': {
    'select': false,
    'type': 'text',
    'required': true
  },
  'last_name': {
    'select': false,
    'type': 'text', 
    'required': true
  },
  'dietary_restrictions': {
    'select': false,
    'type': 'text',
    'required': false
  },
  'special_needs': {
    'select': false,
    'type': 'text',
    'required': false
  },
  'date_of_birth': {
    'select': false,
    'type': 'date',
    'required': true
  },
  'school': {
    'select': true,
    'searchFn': (i) => fetch('https://raw.githubusercontent.com/MLH/mlh-policies/master/schools.csv')
      .then(r => r.text()).then(csv => {
        const rv = csv.split('\n').map(ln => ln.replace(/[\r",]/g, ''))
          .slice(1).map(v => ({'label': v, 'value': v}));
        return {options: rv};
      }),
    'create': false,
    'required': true
  },
  'grad_year': {
    'select': true,
    'options': [2018, 2019, 2020, 2021, 2022]
      .map(v => ({'value': v, 'label': v})),
    'create': true,
    'required': true
  },
  'level_of_study': {
    'select': true,
    'options': ['University (Undergraduate)', 'University (Graduate)', 'High School']
      .map(v => ({'value': v, 'label': v})),
    'create': true,
    'required': true
  },
  'gender': {
    'select': true,
    'options': ['Male', 'Female', 'Non-binary']
      .map(v => ({'value': v, 'label': v})),
    'create': true,
    'required': false
  }
};

export default formConfig;
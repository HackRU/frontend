//formConfig.js
const formConfig = {
  
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
  'phone_number': {
    'select': false,
    'type': 'tel',
    'required': true
  },
  'email': {
    'select': false,
    'type': 'email',
    'required': true
  },
  'school': {
    'select': true,
    'searchFn': (input) => (
      fetch('https://raw.githubusercontent.com/MLH/mlh-policies/master/schools.csv')
        .then(r => r.text())
        .then(csv => csv.split('\n')
          .map(ln => ln.replace(/[\r",]/g, '')).slice(1)
          .map(v => ({'label': v, 'value': v})))
        .then(o => ({options: o}))
    ),
    'create': true,
    'required': true
  },
  'level_of_study': {
    'select': true,
    'options': ['University (Undergraduate)', 'University (Graduate)', 'High School']
      .map(v => ({'value': v, 'label': v})),
    'create': false,
    'required': true
  },
  'major': {
    'select': true,
    'searchFn': (input) => (
      fetch('majors.json')
        .then(r => r.json())
        .then(json => json.items.map(i => ({'label': i, 'value': i})))
        .then(o => ({options: o}))
    ),
    'create': true,
    'required': true
  },
  'grad_year': {
    'select': true,
    'options': (q) => {
      let options = [2018, 2019, 2020, 2021, 2022]
        .map(v => ({'value': v, 'label': v}));
      if(!(options.find(o => o.value === q)) && q) {
        options.push({'label': q, 'value': q});
      }

      return(
        options.sort(function(a,b) {
          return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0);
        })
      );
    },
    'create': true,
    'required': true
  },
  'date_of_birth': {
    'select': false,
    'type': 'date',
    'required': true
  },
  'gender': {
    'select': true,
    'options': (q) => {
      let options = ['Male', 'Female', 'Non-binary']
        .map(v => ({'value': v, 'label': v}));
      if(!(options.find(o => o.value === q)) && q) {
        options.push({'label': q, 'value': q});
      }
      
      return(
        options.sort(function(a,b) {
          return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0);
        })
      );
    },
    'create': true,
    'required': false
  },
  'ethnicity': {
    'select': true,
    'options': (q) => {
      let options = ['American Indian or Alaskan Native', 'Asian / Pacific Islander', 'Black or African American', 'Hispanic', 'White/Caucasian']
        .map(v => ({'value': v, 'label': v}));
      if(!(options.find(o => o.value === q)) && q) {
        options.push({'label': q, 'value': q});
      }

      return(options);
    },
    'create': true,
    'required': false
  },
  'shirt_size': {
    'select': true,
    'options': ['Unisex XS', 'Unisex S', 'Unisex M', 'Unisb1ex L', 'Unisex XL']
      .map(v => ({'value': v, 'label': v})),
    'create': false,
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
  'github': {
    'select': false,
    'type': 'text',
    'searchFn': (i) => fetch(`https://api.github.com/search/users?q=${i}`) //this works but is rate limited so we can't use it :(
      .then(r => r.json())
      .then(b => {
        let res = b.items.map(i => ({'value': i.login, 'label': i.login})).sort();
        return {options: res};
      }),
    'create': false,
    'required': false
  },
  'how_you_heard_about_hackru': {
    'select': true, 
    'options': (q) => {
      let options = ['Mailing List', 'MLH Website', 'Facebook', 'Instagram', 'Twitter', 'Reddit', 'Medium', 'Youtube', 'Twitch']
        .map(v=> ({'value': v, 'label': v}));
      if(!(options.find(o => o.value === q)) && q) {
        options.push({'label': q, 'value': q});
      }

      return(
        options.sort(function(a,b) {
          return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0);
        })
      );
    },
    'create': true,
    'required': true
  }
};

export default formConfig;

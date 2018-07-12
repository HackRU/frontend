var resURLS = {
  logoURL: process.env.PUBLIC_PATH + 'img/logo-white.png',
  wheelURL: process.env.PUBLIC_PATH + 'img/wheel.png',


  //Login Management
  magicLinkRedirect: '?redir=https://hackru.org/dashboard.html?magiclink=',
  lcsAuthURL: 'https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/authorize',
  lcsConsumeURL: 'https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/consume',
  lcsCreateURL: 'https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/create',
  lcsMagicURL: 'https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/createmagiclink',
  mlhResponseType: '&response_type=code&scope=email+education+birthday',
  mlhRedirectURL: 'https://my.mlh.io/oauth/authorize?client_id=bab4ace712bb186d8866ff4776baf96b2c4e9c64d729fb7f88e87357e4badcba&redirect_uri=https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/mlhcallback'
};

export default resURLS;

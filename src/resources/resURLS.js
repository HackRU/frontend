//resURLS.js
const testLCS = 'https://7c5l6v7ip3.execute-api.us-west-2.amazonaws.com/lcs-test/';
const deployLCS = 'https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/';

let LCS = deployLCS;
if(process.env.NODE_ENV === 'development') {
  LCS = testLCS;
}

const resURLS = {
  //assets
  logoURL: 'assets/hackru_lpurple.png',
  wheelURL: 'assets/hackru_lpurple.png',

  eventDate: 'October 6, 2018',
  cutoffBDate: 'October 6, 2000',

  //colors
  background: [255, 255, 255],
  foreground: [120, 82, 201],

  //back-end API
  lcsAuthURL: LCS + 'authorize',
  lcsConsumeURL: LCS + 'consume',
  lcsCreateURL: LCS + 'create',
  lcsEmailTemplates: LCS + 'email-templates',
  lcsEventsURL: LCS + 'dayof-events',
  lcsMagicURL: LCS + 'createmagiclink',
  lcsQRURL: LCS + 'qr',
  lcsReadURL: LCS + 'read',
  lcsSendEmails: LCS + 'send-emails',
  lcsSlackURL: LCS + 'dayof-slack',
  lcsUpdateURL: LCS + 'update',
  

  //NOT USED

  magicLinkRedirect: '?redir=https://hackru.org/dashboard.html?magiclink=',
  mlhResponseType: '&response_type=code&scope=email+education+birthday',
  mlhRedirectURL: 'https://my.mlh.io/oauth/authorize?client_id=bab4ace712bb186d8866ff4776baf96b2c4e9c64d729fb7f88e87357e4badcba&redirect_uri=https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/mlhcallback'
};

export default resURLS;

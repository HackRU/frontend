var React = require('react');

function normalize(time){
  var meridiem = "am";
  var colon = time.indexOf(':');
  var hours =  parseInt(time.slice(0,colon));
  if(hours >= 12){
    hours = hours % 12;
    meridiem = "pm";
  }
  if(hours == 0) hours = 12;
  return hours + time.substring(colon)+meridiem;
}

function cleanupTags(text){
  var ret = text + "";
  var indexlt = ret.indexOf('<');
  ret = ret.replace('<!channel>','');
  ret = ret.replace('<!everyone>','');
  while(indexlt != -1){
    var indexrt = ret.indexOf('>');
    if(ret.charAt(indexlt+1) == '@'){
      var slice = ret.slice(indexlt+1,indexrt+1);
      ret = ret.replace(slice,'');
    }
    else if(ret.indexOf('mailto')==indexlt+1 || ret.indexOf('#')==indexlt+1){
      var slice = ret.slice(indexlt+1,ret.indexOf('|')+1);
      ret = ret.replace(slice,'');
      ret = ret.replace('<','');
      ret = ret.replace('>',''); 
    }
    else if(ret.indexOf('http')==indexlt+1){
      ret = ret.replace('<','');
      ret = ret.replace('>','');  
    }else{
      var left = '';
      var middle = '';
      var right = '';
      if(indexlt > 0) left = ret.substring(0,indexlt);
      middle = ret.slice(indexlt+1,indexrt);
      if(indexrt < indexrt-1) right = ret.substring(indexrt);
      ret = left+middle+right;
    }
    indexlt = ret.indexOf('<');
  }
  ret = ret.replace('&gt','>');
  ret = ret.replace('&lt','<');
  return ret;
}

function cleanup( anouncement){
  var end = anouncement.ts.indexOf('.');
  var unix = parseInt(anouncement.ts.substring(0,end));
  var date = new Date(unix *1000);
   
  var hours = date.getHours();
  var minutes = '0' + date.getMinutes();
  
  return normalize(hours + ':' + minutes.substr(-2)) + '.';
}


module.exports = Anouncement= React.createClass({
  render: function(){
    var anouncement = this.props.anouncement;
    return (
      <p>
        <span className='a-time'> {cleanup(anouncement)}</span>
        <span className='a-text'> {cleanupTags(anouncement.text)} </span>
      </p>
    )
  }
});

var React = require('react');

module.exports = Tweet = React.createClass({
  render: function(){
    var tweet = this.props.tweet;
    return (
      <div className={"tweet" + (tweet.active ? ' active' : '')}>
        
        <div className="tweet-user"> 
          <img src={tweet.avatar} className="avatar"/>
          <a href={"http://www.twitter.com/" + tweet.screenname}>@{tweet.screenname}</a> 
        </div>  
        <p className="content">{tweet.body}</p>
      </div>
    )
  }
});

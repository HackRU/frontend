var React = require('react');
var Events = require('./Events.react.js');

module.exports = EventsApp = React.createClass({

  // Method to add a tweet to our timeline
  addEvent: function(e){

    // Get current application state
    var updated = this.state.events;

    // Increment the unread count
    var count = this.state.count + 1;

    // Increment the skip count
    var skip = this.state.skip + 1;

    // Add tweet to the beginning of the tweets array
    updated.unshift(e);

    // Set application state
    this.setState({events: updated});

  },

  // Method to get JSON from server by page
  getPage: function(page){

    // Setup our ajax request
    var request = new XMLHttpRequest(), self = this;
    request.open('GET', 'page/' + page + "/" + this.state.skip, true);
    request.onload = function() {

      // If everything is cool...
      if (request.status >= 200 && request.status < 400){

        // Load our next page
        self.loadPagedTweets(JSON.parse(request.responseText));

      } else {

        // Set application state (Not paging, paging complete)
        self.setState({paging: false, done: true});

      }
    };

    // Fire!
    request.send();

  },

  // Method to show the unread tweets
  showNewEvents: function(){

    // Get current application state
    var updated = this.state.events;

    // Mark our tweets active
    updated.forEach(function(event){
      event.active = true;
    });

    // Set application state (active tweets + reset unread count)
    this.setState({events: updated, count: 0});

  },

  // Method to load tweets fetched from the server
  loadPagedEvents: function(events){

    // So meta lol
    var self = this;

    // If we still have tweets...
    if(events.length > 0) {

      // Get current application state
      var updated = this.state.events;

      // Push them onto the end of the current tweets array
      events.forEach(function(event){
        updated.push(event);
      });

      // This app is so fast, I actually use a timeout for dramatic effect
      // Otherwise you'd never see our super sexy loader svg
      setTimeout(function(){

        // Set application state (Not paging, add tweets)
        self.setState({tweets: updated, paging: false});

      }, 1000);

    } else {

      // Set application state (Not paging, paging complete)
      this.setState({done: true, paging: false});

    }
  },

  // Method to check if more tweets should be loaded, by scroll position
  //
  /* checkWindowScroll: function(){

    // Get scroll pos & window data
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var s = (document.body.scrollTop || document.documentElement.scrollTop || 0);
    var scrolled = (h + s) > document.body.offsetHeight;

    // If scrolled enough, not currently paging and not complete...
    if(scrolled && !this.state.paging && !this.state.done) {

      // Set application state (Paging, Increment page)
      this.setState({paging: true, page: this.state.page + 1});

      // Get the next page of tweets from the server
      this.getPage(this.state.page);

    }
  },
  */
  
  // Set the initial component state
  getInitialState: function(props){

    props = props || this.props;

    // Set initial application state using props
    return {
      events: props.events,
    };

  },

  componentWillReceiveProps: function(newProps, oldProps){
    this.setState(this.getInitialState(newProps));
  },

  // Called directly after component rendering, only on client
  componentDidMount: function(){

    // Preserve self reference
    var self = this;

    // Initialize socket.io
    var socket = io.connect();

    // On tweet event emission...
    socket.on('event', function (data) {

        // Add a tweet to our queue
        self.addEvent(data);

    });

  },

  // Render the component
  render: function(){

    return (
        <div className="events">
          <Events events={this.state.events} />
        </div>
    )

  }
});

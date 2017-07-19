var React = require('react');
var Anouncements = require('./Anouncements.react.js');

module.exports = AnouncementssApp = React.createClass({
 
  // Set the initial component state
  getInitialState: function(props){

    props = props || this.props;

    // Set initial application state using props
    return {
      anouncements: props.anouncements,
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
    socket.on('anouncement', function (data) {

        // Add a tweet to our queue
        self.addAnouncement(data);

    });

  },

  // Render the component
  render: function(){

    return (
        <div className="anouncements">
          <Anouncements anouncements={this.state.anouncements} />
        </div>
    )

  }
});

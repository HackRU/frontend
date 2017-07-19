
var React = require('react');
var Anouncement = require('./Anouncement.react.js');

module.exports = Anouncements = React.createClass({

  // Render our tweets
  render: function(){

    // Build list items of single tweet components using map
    var content = this.props.anouncements.map(function(anouncement){
      return (
        <Anouncement key={anouncement._id} anouncement={anouncement} />
      )
    });

    // Return ul filled with our mapped tweets
    return (
      <div className="anouncements">{content}</div>
    )

  }

}); 

import React from 'react';
import ReactDOM from 'react-dom';

class VotingModal extends React.Component {

constructor (props){
  super(props);
  this.state = {
    user: props.user,
    token: props.token
  };
  this.componentWillMount = this.componentWillMount.bind(this);
  this.processKey = this.processKey.bind(this);
  this.voteUp = this.voteUp.bind(this);
  this.voteDown = this.voteDown.bind(this);
}

componentWillMount(){
  const userConds = Object.keys(this.state.user.role)
    .map(k => ({["role." + k]: (k == 'organizer' || k == 'hacker')}))
    //ES6 computed keys ^ ... aren't they cool?!
    //Also, the "k == 'organizer' ||" is for testing.
    .concat([{'votes_from': {'$ne': this.state.user.email}}])

  fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/read', {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    headers: {
      //'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': this.state.user.email,
      'token': this.state.token,
      'query': {"$and": userConds},
    })
  }).then(resp => resp.json())
    .then(users => {
      this.setState({hacker: users.body[0]})
  });
}

processKey(evt){
  alert("Press! " + evt.key);
  if(evt.key === "Up"){
    this.voteUp(evt);
  }else if(evt.key === "Down"){
    this.voteDown();
  }/*else if(evt.key === "Space"){
     iff skipping users
  } */
}

voteUp(evt){
  fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/update', {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    headers: {
      //'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'auth_email': this.state.user.email,
      'auth': this.state.token,
      'user_email': this.state.hacker.email,
      'updates': {
        "$inc": {"votes": 1},
        '$push': {'votes_from': this.state.user.email}
      }
    })
  }).then(resp => resp.json())
    .then(data => {
    if(data.statusCode === 200){
      this.componentWillMount();
    }else{
      this.setState({error: data.body});
    }
  });
}

voteDown(evt){
  fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/update', {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    headers: {
      //'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'auth_email': this.state.user.email,
      'auth': this.state.token,
      'user_email': this.state.hacker.email,
      'updates': {
        "$inc": {"votes": -1},
        '$push': {'votes_from': this.state.user.email}
      }
    })
  }).then(resp => resp.json())
    .then(data => {
    if(data.statusCode === 200){
      this.componentWillMount();
    }else{
      this.setState({error: data.body});
    }
  });
}

render() {
  return (
        <div onKeyPress={this.processKey} tabIndex="0">
          <div className="modal-header">
            <h5 className="modal-title font-modal" id="exampleModalLongTitle">Vote on Users</h5><br/>
            <p className="font-modal">You can't use up arrow and down arrow too!</p>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          {
            //hacky ternary... so if !state.hacker, loading
            //else the <div>
            (!this.state.hacker && "Loading...") ||
            <div>
            <div>
              What are they looking for from your experience at HackRU?
            </div>
            <div>
              "{this.state.hacker.short_answer}"
            </div>
            <div>
              Gender
            </div>
            <div>
              "{this.state.hacker.gender}"
            </div>
            <div>
              Grad year
            </div>
            <div>
              "{this.state.hacker.grad_year}"
            </div>
            </div>
          }
          <div>{this.state.error}</div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={this.voteUp} className="btn btn-primary">Vote Up</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" onClick={this.voteDown}className="btn btn-primary">Vote Down</button>
          </div>
        </div>
  );

}

}

export default VotingModal;

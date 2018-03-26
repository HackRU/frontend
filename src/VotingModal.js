import React from 'react';
import ReactDOM from 'react-dom';

class VotingModal extends React.Component {

constructor (props){
  super(props);
  this.state = {
    user: props.user,
    token: props.token,
    loadingMsg: "Loading...",
  };
  this.componentWillMount = this.componentWillMount.bind(this);
  this.processKey = this.processKey.bind(this);
  this.voteUp = this.voteUp.bind(this);
  this.voteDown = this.voteDown.bind(this);
  this.skip = this.skip.bind(this);

}

componentWillMount(){
  const userConds = Object.keys(this.state.user.role)
    .map(k => ({["role." + k]: (/*k == 'organizer' ||*/ k == 'hacker')}))
    //ES6 computed keys ^ ... aren't they cool?!
    //Also, the "k == 'organizer' ||" is for testing.
    .concat([
      {'votes_from': {'$ne': this.state.user.email}},
      {'registration_status': 'registered'}
      //TODO: figure out where query?
    ])


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
      if(!users.body || users.body.length === 0){
        this.setState({loadingMsg: "You're all done, it seems!"});
        return;
      }

      const nonSkipped = users.body.filter(
            (usr) => !usr.skipped_users || usr.skipped_users.every(
              (sk) => sk.email !== this.state.user.email ||
                      sk.short_answer !== usr.short_answer));

      if(nonSkipped.length === 0){
        this.setState({loadingMsg: "You're all done, it seems! But you have skipped some users. Check later: they may have updated their response."});
        return;
      }

      this.setState({hacker: nonSkipped[0]});
  });

}

processKey(evt){
  if(evt.key === "ArrowUp"){
    this.voteUp(evt);
  }else if(evt.key === "ArrowDown"){
    this.voteDown();
  }else if(evt.key === "ArrowRight" || evt.key === "ArrowLeft"){
    this.skip();
  }
}

voteUp(evt){
  if(!this.state.hacker){
    this.setState({loadingMsg: "Patience. You may be done."});
    return;
  }

  const hax0r = this.state.hacker;
  this.setState({hacker: undefined, loadingMsg: "Voted up! Next one inbound..."});

  let upd_obj = [];
  if(hax0r.votes === 2){
    upd_obj = {"$set": {"registration_status": "confirmation"}};
  }else{
    upd_obj = {
      "$inc": {"votes": 1},
      '$push': {'votes_from': this.state.user.email}
    }
  }

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
      'user_email': hax0r.email,
      'updates': upd_obj
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
  if(!this.state.hacker){
    this.setState({loadingMsg: "Patience. You may be done."});
    return;
  }

  const hax0r = this.state.hacker;
  this.setState({hacker: undefined, loadingMsg: "Voted down. Next hacker coming..."});

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
      'user_email': hax0r.email,
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

skip(evt){
  if(!this.state.hacker){
    this.setState({loadingMsg: "Patience. You may be done."});
    return;
  }

  const hax0r = this.state.hacker;
  this.setState({hacker: undefined, loadingMsg: "Skipped. Here's another one..."});

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
      'user_email': hax0r.email,
      'updates': {
        '$push': {
          'skipped_users': {
            'email': this.state.user.email,
            'short_answer': hax0r.short_answer
          }
        }
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
        <div
        onKeyDown={(e) => this.processKey(e)}
        tabIndex="0">
          <div className="modal-header">
            <h4 className="modal-title font-modal mr-3" id="exampleModalLongTitle">Vote on Users</h4><br/>
            <p className="font-modal">Click on the top of the modal, then use the up and down arrow keys to vote! Left or right arrow skip!</p>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          {
            //hacky ternary... so if !state.hacker, loading
            //else the <div>
            (!this.state.hacker && this.state.loadingMsg) ||
            <div>
            <div>
              What are they looking for from their experience at HackRU?
            </div>
            <div>
              <textarea class="form-control mb-2" type="text" placeholder={this.state.hacker.short_answer} readonly />
            </div>
            <div>
              Gender
            </div>
            <div>
              <input class="form-control mb-2" type="text" placeholder={this.state.hacker.gender} readonly />
            </div>
            <div>
              Grad year
            </div>
            <div>
              <input class="form-control mb-2" type="text" placeholder={this.state.hacker.grad_year} readonly />
            </div>
            </div>
          }
          <div>{this.state.error}</div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={this.voteDown}className="btn btn-primary">Vote Down</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" onClick={this.skip}className="btn btn-primary">Skip User</button>
            <button type="button" onClick={this.voteUp} className="btn btn-primary">Vote Up</button>
          </div>
        </div>
  );

}

}

export default VotingModal;

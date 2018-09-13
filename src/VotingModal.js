import React from 'react';
import resURLs from 'resources/resURLS';

class VotingModal extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      user: props.user,
      token: props.token,
      loadingMsg: 'Loading...',
    };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.processKey = this.processKey.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
    this.skip = this.skip.bind(this);

  }

  componentWillMount(){
    const userConds = Object.keys(this.state.user.role)
      .map(k => ({['role.' + k]: (/*k == 'organizer' ||*/ k == 'hacker')}))
    //ES6 computed keys ^ ... aren't they cool?!
    //Also, the "k == 'organizer' ||" is for testing.
      .concat([
        {'votes_from': {'$ne': this.state.user.email}},
        {'registration_status': 'registered'},
        {'gender': {'$ne': ''}},
        {'grad_year': {'$ne': ''}},
        {'short_answer': {'$ne': ''}}
      //TODO: figure out where query?
      ]);


    fetch(resURLs.lcsReadURL, {
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
        'query': {'$and': userConds},
      })
    }).then(resp => resp.json())
      .then(users => {
        if(!users.body || users.body.length === 0){
          this.setState({loadingMsg: 'You\'re all done, it seems!'});
          return;
        }

        const nonSkipped = users.body.filter(
          (usr) => !usr.skipped_users || usr.skipped_users.every(
            (sk) => sk.email !== this.state.user.email ||
                      sk.short_answer !== usr.short_answer));

        if(nonSkipped.length === 0){
          this.setState({loadingMsg: 'You\'re all done, it seems! But you have skipped some users. Check later: they may have updated their response.'});
          return;
        }

        this.setState({hacker: nonSkipped[0], userCount: nonSkipped.length});
      });

  }

  processKey(evt){
    if(evt.key === 'ArrowUp'){
      this.voteUp(evt);
    }else if(evt.key === 'ArrowDown'){
      this.voteDown();
    }else if(evt.key === 'ArrowRight' || evt.key === 'ArrowLeft'){
      this.skip();
    }
  }

  voteUp(evt){
    if(!this.state.hacker){
      this.setState({loadingMsg: 'Patience. You may be done.'});
      return;
    }

    const hax0r = this.state.hacker;
    this.setState({hacker: undefined, loadingMsg: 'Voted up! Next one inbound...'});

    let upd_obj = [];
    if(hax0r.votes === 2){
      upd_obj = {'$set': {'registration_status': 'confirmation'}};
    }else{
      upd_obj = {
        '$inc': {'votes': 1},
        '$push': {'votes_from': this.state.user.email}
      };
    }

    fetch(resURLs.lcsReadURL, {
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
      this.setState({loadingMsg: 'Patience. You may be done.'});
      return;
    }

    const hax0r = this.state.hacker;
    this.setState({hacker: undefined, loadingMsg: 'Voted down. Next hacker coming...'});

    fetch(resURLs.lcsUpdateURL, {
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
          '$inc': {'votes': -1},
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
      this.setState({loadingMsg: 'Patience. You may be done.'});
      return;
    }

    const hax0r = this.state.hacker;
    this.setState({hacker: undefined, loadingMsg: 'Skipped. Here\'s another one...'});

    fetch(resURLs.lcsUpdateURL, {
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
        tabIndex="0"
      >
        <div className="modal-header">
          <h4 className="modal-title font-modal mr-3"
            id="exampleModalLongTitle"
          >Vote on Users</h4><br/>
          <p className="font-modal">Click on the top of the modal, then use the up and down arrow keys to vote! Left or right arrow skip!</p>
          <button aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {
            //hacky ternary... so if !state.hacker, loading
            //else the <div>
            (!this.state.hacker && this.state.loadingMsg) ||
            <div>
              <div>{this.state.userCount} users to vote on (by everybody, DW... the team's gotchu).</div>
              <div>
              What are they looking for from their experience at HackRU?
              </div>
              <div>
                <textarea className="form-control mb-2 textminheightclass"
                  placeholder={this.state.hacker.short_answer}
                  readOnly
                  style={{minHeight: '200px'}}
                  type="text"
                />
              </div>
              <div>
              Gender
              </div>
              <div>
                <input className="form-control mb-2"
                  placeholder={this.state.hacker.gender}
                  readOnly
                  type="text"
                />
              </div>
              <div>
              Grad year
              </div>
              <div>
                <input className="form-control mb-2"
                  placeholder={this.state.hacker.grad_year}
                  readOnly
                  type="text"
                />
              </div>
            </div>
          }
          <div>{this.state.error}</div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary"
            onClick={this.voteDown}
            type="button"
          >Vote Down</button>
          <button className="btn btn-secondary"
            data-dismiss="modal"
            type="button"
          >Close</button>
          <button className="btn btn-primary"
            onClick={this.skip}
            type="button"
          >Skip User</button>
          <button className="btn btn-primary"
            onClick={this.voteUp}
            type="button"
          >Vote Up</button>
        </div>
      </div>
    );

  }

}

export default VotingModal;

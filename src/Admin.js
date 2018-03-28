import React from 'react';
import ReactDOM from 'react-dom';
import {instanceOf} from 'prop-types';
import {CookiesProvider, withCookies, Cookies} from 'react-cookie';
import App from './App';
import VotingModal from './VotingModal';
import ModalError from './modalerror';

class Admin extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

constructor (props){
    super(props);
    this.state = {
      user: props.user,
      token: props.token
    };
    this.doQuery = this.doQuery.bind(this);
    this.logout = this.logout.bind(this);
    this.adminVote = this.adminVote.bind(this);
}

logout() {
  const {cookies} = this.props;
  cookies.remove('authdata');
  ReactDOM.render(<CookiesProvider><App /></CookiesProvider> , document.getElementById('register-root'));
  ReactDOM.render(
  <ModalError />
    , document.getElementById('register-more'));
  ReactDOM.unmountComponentAtNode(document.getElementById('register-admin'))
}

doQuery(){
  let grps = {};
  document.querySelectorAll('.agg-filter')
    .forEach(inp => {
      if(!inp.checked) return;
      let key = inp.getAttribute('id').replace('aggregate-', '');
      grps[key] = '$' + key;
  });

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
      'query': [{'$group': {'_id': grps, 'count': {'$sum': 1}}}],
      'aggregate': true
    })
  }).then(resp => resp.json())
    .then(data => {
      if(data.statusCode === 200)
        this.setState({results: data.body});
      else
        this.setState({results: [{'_id': 'error', 'count': data.body}]})
    });

}

adminVote(){
  ReactDOM.render(<VotingModal user={this.state.user} token={this.state.token}/>, document.getElementById('register-more'));
}

render() {
  if(!this.state.user || (!this.state.user.role.organizer && !this.state.user.role.director)){
    return null;
  }

  return (

    <div className="card row">
      <div className="col-lg-12">
        <div className="text-center">
          <h3 className="text-center">You are logged in as an administrator!</h3>

          <button type="button" className="btn btn-primary custom-btn p-3 mx-1 my-3 " id="launch-modal" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="static"><h4 className="my-0">View/Finish your Application</h4></button>
          <button type="button" className="btn btn-primary custom-btn p-3 my-3" id="launch-modal" data-toggle="modal" onClick={this.adminVote} data-target="#exampleModalCenter" data-backdrop="static"><h4 className="my-0">Vote on Applications</h4></button>
          <button type="button" className="btn btn-primary custom-btn p-3  mx-1 my-3" onClick={this.logout}><h4 className="my-0">Logout</h4></button>
        </div>

      <h1 className="text-center">Admin Dashboard</h1>
      <div className="col-lg-12 text-center">

      { this.state.user &&
        Object.keys(this.state.user).map(k =>
          <div className="form-check form-check-inline">
            <input className="agg-filter form-check-input" type="checkbox" id={"aggregate-" + k} />
            <label className="form-check-label form-text" htmlFor={"aggregate-" + k}>{k}</label>
          </div>
        )
      }
      </div>
        <br />
        <div className="col-lg-12 text-center">
        <button type="button" className="btn btn-primary custom-btn p-3  mx-1 my-3 text-center" onClick={this.doQuery}><h4 className="my-0">Query the DB</h4></button>,
        </div>
        <table className="table table-dark table-fixed smaller-font">
          <thead className="thead-dark">

            { this.state.results &&

                (  <tr>
                      {Object.keys(this.state.results[0]._id)
                      .map(v => (<th className="col">{JSON.stringify(v)}</th>))
                      }
                    <th className="col">Counts</th>
                  </tr>
              )
            }
          </thead>
          <tbody>
          { this.state.results &&
            this.state.results.map(count =>
                <tr>
                    {Object.values(count._id)
                    .map(v => (<td className="col">{JSON.stringify(v)}</td>))
                    }
                  <td className="col">{count.count}</td>
                </tr>
            )
          }
          </tbody>
        </table>
        </div>
      </div>

);

}

}
export default withCookies(Admin);

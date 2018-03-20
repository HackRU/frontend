import React from 'react';
import ReactDOM from 'react-dom';
import md5 from 'md5';

class Admin extends React.Component {

constructor (props){
    super(props);
    this.state = {
      user: props.user,
      token: props.token
    };
    this.doQuery = this.doQuery.bind(this);
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

render() {
  if(!this.state.user || (!this.state.user.role.organizer && !this.state.user.role.director)){
    return null;
  }

  return (

    <div class="card row">
      <div class="col-lg-12">
        <div class="text-center">
          <h3 class="text-center">You are logged in as an administrator!</h3>

          <button type="button" className="btn btn-primary custom-btn p-3 mx-1 my-3 " id="launch-modal" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="static"><h4 className="my-0">View/Finish your Application</h4></button>,
          <button type="button" className="btn btn-primary custom-btn p-3  mx-1 my-3" onClick=""><h4 className="my-0">DoesnotworkLogout!</h4></button>,
        </div>

      <h1 className="text-center">Admin Dashbaord</h1>

      { this.state.user &&
        Object.keys(this.state.user).map(k =>
          <div className="form-check form-check-inline">
            <input className="agg-filter form-check-input" type="checkbox" id={"aggregate-" + k} />
            <label className="form-check-label form-text" htmlFor={"aggregate-" + k}>{k}</label>
          </div>
        )
      }

        <br />
        <button type="button" className="btn btn-primary custom-btn p-3  mx-1 my-3" onClick={this.doQuery}><h4 className="my-0">Query the DB</h4></button>,

        <table class="table table-dark">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
          { this.state.results &&
            this.state.results.map(count =>
                <tr>
                  <th scope="row">{Object.values(count._id)
                    .map(v => '"' + v + '"')
                    .join(" and ")}</th>
                  <td>{count.count}</td>
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
export default Admin;

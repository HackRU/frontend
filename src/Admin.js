import React from 'react';
import ReactDOM from 'react-dom';
import md5 from 'md5';

class Admin extends React.Component {

constructor (props){
    super(props);
    this.state = {
      messageText:'samele message',
    };
}

render() {
  return (

    <div class="card row">
      <div class="col-lg-12">
        <div class="text-center">
          <h3 class="text-center">You are logged in as in administrator!</h3>

          <button type="button" className="btn btn-primary custom-btn p-3 mx-1 my-3 " id="launch-modal" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="static"><h4 className="my-0">View/Finish your Application</h4></button>,
          <button type="button" className="btn btn-primary custom-btn p-3  mx-1 my-3" onClick=""><h4 className="my-0">DoesnotworkLogout!</h4></button>,
        </div>

      <h1 class="text-center">Admin Dashbaord</h1>
        <button type="button" className="btn btn-primary custom-btn p-3 mx-1 my-3  "><h4 className="my-0">Query1</h4></button>
        <button type="button" className="btn btn-primary custom-btn p-3 mx-1 my-3 "><h4 className="my-0">Query2</h4></button>
        <button type="button" className="btn btn-primary custom-btn p-3  mx-1 my-3"><h4 className="my-0">Query3</h4></button>

        <table class="table table-dark">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

);

}

}
export default Admin;

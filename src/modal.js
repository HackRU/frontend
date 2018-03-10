import React from 'react';
import ReactDOM from 'react-dom';
import md5 from 'md5';

class Col extends React.Component {

constructor (props){
    super(props);
}

render() {
  return (
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content font-modal">
          <div class="modal-header">
            <h5 class="modal-title font-modal" id="exampleModalLongTitle">More Registration Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
               <div id="register-more"> </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
);

}

}
export default Col;

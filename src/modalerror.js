import React from 'react';
import ReactDOM from 'react-dom';
import md5 from 'md5';

class ModalError extends React.Component {

constructor (props){
    super(props);
    this.state = {
      messageText:'samele message',
    };
}

render() {
  return (



    <div>

    <div className="modal-header">
      <h5 className="modal-title  font-modal" id="exampleModalLongTitle">Loading....</h5 >
      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <div className="react-form font-modal">
        If form does not load, please close this window and try again.
      </div>

    </div>

    <div className="modal-footer">
    <button type="button" class="btn btn-secondary custom-btn" data-dismiss="modal">Close</button>
    </div>
    </div>
);

}

}
export default ModalError;

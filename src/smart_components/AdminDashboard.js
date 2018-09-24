import React from 'react';
import PropTypes from 'prop-types';
import VotingModal from 'VotingModal';
import AdminEmailing from 'AdminEmailing';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as adminActions from 'action_creators/AdminActions';
import ContentSection from 'dumb_components/ContentSection';

// import Select, { Creatable, AsyncCreatable, Async } from 'react-select';
import 'styles/react-select.css';

import resURLS from 'resources/resURLS';


class AdminDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.doQuery = this.doQuery.bind(this);
  }

  doQuery() {
    let grps = {};

    document.querySelectorAll('.agg-filter')
      .forEach(inp => {
        if(!inp.checked) return;
        let key = inp.getAttribute('id').replace('aggregate-', '');
        grps[key] = '$' + key;
      });

    console.log('GRPS:');
    console.log(grps);
    let queryOut = [{'$group': {'_id': grps, 'count': {'$sum': 1}}}];
    console.log('Query Output');
    console.log(queryOut);
    let user = this.props.userManager;
    this.props.updateData(user.userInfoEmail, user.token, queryOut);
  }

  render() {
    let userInfo = this.props.userManager.userInfo;
    let adminQueryData = this.props.adminManager.queryData;
    console.log(adminQueryData);
    return (
      <div>
        <ContentSection registerRoot title="Vote on Users">
          <VotingModal user={userInfo} token={userInfo.token} />
        </ContentSection>
        <ContentSection registerRoot title="Admin Dashboard:">
          <form className="form-group">
            <div className="text-center">
              <div className="col-lg-12 text-center">
                {Object.keys(userInfo).map(k =>
                  (<div className="form-check form-check-inline">
                    <input className="agg-filter form-check-input"
                      id={'aggregate-' + k}
                      type="checkbox"
                    />
                    <label className="form-check-label form-text" htmlFor={'aggregate-' + k} >{k}</label>
                  </div>)
                )}
              </div>
              <br />
              <div className="col-lg-12 text-center">
                <button className="btn btn-primary custom-btn p-3  mx-1 my-3 text-center"
                  onClick={this.doQuery}
                  type="button"
                ><h4 className="my-0">{'Query the DB'}</h4></button>
              </div>
            </div>
          </form>
        </ContentSection>
        <ContentSection registerRoot title="Query Results:">
          <table className="table table-dark table-fixed smaller-font">
            <thead className="thead-dark">
              <tr>
                { adminQueryData &&
                Object.keys(adminQueryData[0]._id)
                  .map(v => (<th key={v} className="col white">{JSON.stringify(v)}</th>))
                }
                <th className="col white">{'Counts'}</th>
              </tr>
            </thead>
            <tbody>
              { adminQueryData &&
              adminQueryData.map(count =>
                (<tr>
                  {Object.values(count._id)
                    .map(v => (<td key={v} className="col white">{JSON.stringify(v)}</td>))
                  }
                  <td className="col white">{count.count}</td>
                </tr>)
              )
              }
            </tbody>
          </table>
        </ContentSection>
        <ContentSection registerRoot title="Send Email:">
          <AdminEmailing user={userInfo} token={userInfo.token} />
        </ContentSection>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  userManager: PropTypes.shape({
    userInfoEmail: PropTypes.string,
    token: PropTypes.string,
    userInfo: PropTypes.object,
  }).isRequired,
  viewController: PropTypes.shape({
    isAdmin: PropTypes.bool
  }).isRequired,
  adminManager: PropTypes.shape({
    queryData: PropTypes.array
  }).isRequired,
  updateData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    userManager: state.userManager,
    viewController: state.viewController,
    adminManager: state.adminManager
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateData: adminActions.queryDB,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminDashboard);

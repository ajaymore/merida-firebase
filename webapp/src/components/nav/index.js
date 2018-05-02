import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import TopNavPanel from './TopNavPanel';
import ChangeEmail from './ChangeEmail';

class TopNav extends React.Component {
  state = {
    showPanel: false
  };
  render() {
    const { user } = this.props;
    const { showPanel } = this.state;
    return (
      <div className="TopNav">
        <div className="TopNav-left">
          <h2 className="ms-fontWeight-semilight" style={{ paddingLeft: 15 }}>
            EHS Planner
          </h2>
        </div>
        <div className="TopNav-right">
          <div className="TopNav-logout-wrap">
            <button
              className="TopNav-logout-wrap-displayName"
              onClick={() => {
                this.setState({ showPanel: true });
              }}
            >
              {user.displayName}
            </button>
            <span className="TopNav-logout-wrap-separator">&nbsp;</span>
            <button
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              Sign out
            </button>
          </div>
        </div>
        <TopNavPanel
          showPanel={showPanel}
          closePanel={() => this.setState({ showPanel: false })}
          headerText="Change Password"
        >
          <ChangeEmail />
        </TopNavPanel>
      </div>
    );
  }
}

TopNav.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(state => ({ user: state.user }))(TopNav);

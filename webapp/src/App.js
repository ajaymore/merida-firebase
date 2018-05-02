import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import './App.css';
import Main from './components/Main';
import Auth from './components/auth';

const Initializing = () => (
  <div className="Initializing">
    <br />
    <br />
    <Spinner
      size={SpinnerSize.large}
      label="Initializing..."
      ariaLive="assertive"
    />
  </div>
);

const App = ({ user, initializing }) => {
  if (initializing) {
    return <Initializing />;
  }
  if (user) {
    return <Main />;
  }
  return <Auth />;
};

App.defaultProps = {
  user: null
};

App.propTypes = {
  user: PropTypes.object,
  initializing: PropTypes.bool.isRequired
};

export default connect(state => ({
  user: state.user,
  initializing: state.initializing
}))(App);

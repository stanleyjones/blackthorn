import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { authUser, requestPasscode } from '../actions';

import { EnterPasscode, RequestPasscode } from '../components';

const UserLogin = props => props.requestedPasscode
  ? <EnterPasscode authUser={props.authUser} userId={props.requestedPasscode} />
  : <RequestPasscode requestPasscode={props.requestPasscode} />;

UserLogin.propTypes = {
  authUser: PropTypes.func,
  requestPasscode: PropTypes.func,
  requestedPasscode: PropTypes.string,
};

const mapStateToProps = state => ({
  requestedPasscode: state.user.requestedPasscode,
});

const mapDispatchToProps = dispatch => ({
  authUser: (id, passcode) => dispatch(authUser(id, passcode)),
  requestPasscode: email => dispatch(requestPasscode(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);

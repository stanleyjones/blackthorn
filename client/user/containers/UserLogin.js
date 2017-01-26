import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { authUser } from '../actions';

class UserLogin extends PureComponent {
  render() {
    return (
      <div>
        <h1>Please log in.</h1>
        <input ref="email" />
        <button onClick={() => this.props.authUser(this.refs.email.value)}>Submit</button>
      </div>
    );
  }
}

UserLogin.propTypes = {
  authUser: PropTypes.func,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  authUser: email => dispatch(authUser(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);

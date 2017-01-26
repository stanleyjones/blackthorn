import React, { PropTypes, PureComponent } from 'react';

class EnterPasscode extends PureComponent {
  render() {
    return (
      <div>
        <label htmlFor="passcode">Passcode</label>
        <input id="passcode" ref="passcode" />
        <button onClick={() => this.props.authUser(this.props.userId, this.refs.passcode.value)}>
          Submit
        </button>
      </div>
    );
  }
}

EnterPasscode.propTypes = {
  authUser: PropTypes.func,
  userId: PropTypes.string,
};

export default EnterPasscode;

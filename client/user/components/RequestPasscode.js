import React, { PropTypes, PureComponent } from 'react';

class EmailForm extends PureComponent {
  render() {
    return (
      <div>
        <label htmlFor="email">Email Address</label>
        <input id="email" ref="email" />
        <button onClick={() => this.props.requestPasscode(this.refs.email.value)}>Submit</button>
      </div>
    );
  }
}

EmailForm.propTypes = {
  requestPasscode: PropTypes.func,
};

export default EmailForm;

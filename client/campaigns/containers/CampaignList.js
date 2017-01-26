import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { newCampaign } from '../actions';
import { fetchUser } from '../../user/actions';

class CampaignList extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.campaigns.map((campaign, index) => <li key={index}>{campaign.name}</li>)}
        </ul>
        <button onClick={this.props.newCampaign(this.props.userId)}>New Campaign</button>
      </div>
    );
  }
}

CampaignList.propTypes = {
  campaigns: PropTypes.array,
  fetchUser: PropTypes.func,
  newCampaign: PropTypes.func,
  userId: PropTypes.string,
};

const mapStateToProps = state => ({
  campaigns: state.campaigns.data,
  userId: state.user.data.id,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  newCampaign: userId => () => dispatch(newCampaign(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);

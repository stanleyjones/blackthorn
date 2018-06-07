import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { List } from '../../shared/components';
import { fetchUser } from '../../user/actions';

import { createCampaign } from '../actions';

class CampaignList extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { campaigns, createCampaign, userId } = this.props;
    return (
      <div>
        <List items={campaigns} label="Campaigns" path="/campaigns"/>
        <button onClick={createCampaign(userId)}>New Campaign</button>
      </div>
    );
  }
}

CampaignList.propTypes = {
  campaigns: PropTypes.array,
  fetchUser: PropTypes.func,
  createCampaign: PropTypes.func,
  userId: PropTypes.string,
};

const mapStateToProps = state => ({
  campaigns: state.campaigns.data,
  userId: state.user.data.id,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  createCampaign: userId => () => dispatch(createCampaign(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);

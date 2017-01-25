import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const CampaignList = props => (
  <ul>
  {props.campaigns.map(campaign => <li>{campaign.name}</li>)}
  </ul>
);

CampaignList.proptypes = {
  campaigns: PropTypes.array,
};

const mapStateToProps = state => ({
  campaigns: state.campaigns.data || [],
});

export default connect(mapStateToProps)(CampaignList);

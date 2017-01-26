import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { newCampaign, saveCampaign } from '../actions';

const CampaignList = props => (
  <div>
    <ul>
    {props.campaigns.map((campaign, index) => <li key={index}>{campaign.name}</li>)}
    </ul>
    <button onClick={props.newCampaign(props.userId)}>New Campaign</button>
  </div>
);

CampaignList.propTypes = {
  campaigns: PropTypes.array,
  newCampaign: PropTypes.func,
  saveCampaign: PropTypes.func,
  userId: PropTypes.string,
};

const mapStateToProps = state => ({
  campaigns: state.campaigns.data,
  userId: state.user.data.id,
});

const mapDispatchToProps = dispatch => Object.assign(
  bindActionCreators({
    saveCampaign,
  }, dispatch),
  {
    newCampaign: userId => () => dispatch(newCampaign(userId)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);

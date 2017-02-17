import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { deleteCampaign, editCampaign, saveCampaign } from '../actions';
import { fetchUser } from '../../user/actions';

class CampaignEdit extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { campaign, deleteCampaign, editCampaign, saveCampaign, userId } = this.props;
    return (
      <div>
        <input name="name" onChange={editCampaign(campaign.id)} value={campaign.name} />
        <button onClick={saveCampaign(userId, campaign)}>Save</button>
        <button onClick={deleteCampaign(userId, campaign.id)}>Delete</button>
        <Link to={`/campaigns/${campaign.id}`}><button>Cancel</button></Link>
      </div>
    );
  }
}

CampaignEdit.propTypes = {
  campaign: PropTypes.object,
  deleteCampaign: PropTypes.func,
  editCampaign: PropTypes.func,
  fetchUser: PropTypes.func,
  saveCampaign: PropTypes.func,
  userId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  campaign: state.campaigns.data.find(campaign => campaign.id === ownProps.params.id) || {},
  userId: state.user.data.id,
});

const mapDispatchToProps = dispatch => ({
  deleteCampaign: (userId, campaignId) => () => dispatch(deleteCampaign(userId, campaignId)),
  editCampaign: campaignId => e => dispatch(editCampaign(e, campaignId)),
  fetchUser: () => dispatch(fetchUser()),
  saveCampaign: (userId, attrs) => () => dispatch(saveCampaign(userId, attrs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignEdit);

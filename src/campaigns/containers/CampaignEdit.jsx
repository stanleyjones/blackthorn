import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { deleteCampaign, editCampaign, saveCampaign } from '../actions';
import { fetchUser, inviteUser } from '../../user/actions';
import { PlayerList } from '../components';

class CampaignEdit extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.invitePlayer = this.invitePlayer.bind(this);
  }

  invitePlayer() {
    const { campaign, inviteUser } = this.props;
    inviteUser(this.refs.playerEmail.value, campaign.id);
  }

  render() {
    const { campaign, deleteCampaign, editCampaign, saveCampaign } = this.props;
    return (
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" onChange={editCampaign(campaign.id)} value={campaign.name} />

        <br />

        <PlayerList players={campaign.players} />
        <input id="invitePlayer" ref="playerEmail" type="email" />
        <button onClick={this.invitePlayer}>Invite Player</button>

        <br />

        <button onClick={saveCampaign(campaign)}>Save</button>
        <button onClick={deleteCampaign(campaign.id)}>Delete</button>
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
  inviteUser: PropTypes.func,
  saveCampaign: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  campaign: state.campaigns.data.find(campaign => campaign.id === ownProps.params.id) || {},
});

const mapDispatchToProps = dispatch => ({
  deleteCampaign: campaignId => () => dispatch(deleteCampaign(campaignId)),
  editCampaign: campaignId => e => dispatch(editCampaign(e, campaignId)),
  fetchUser: () => dispatch(fetchUser()),
  inviteUser: (email, campaignId) => dispatch(inviteUser(email, campaignId)),
  saveCampaign: attrs => () => dispatch(saveCampaign(attrs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignEdit);

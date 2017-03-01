import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { deleteCampaign, editCampaign, saveCampaign } from '../actions';
import { fetchUser, inviteUser } from '../../user/actions';

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
    const { campaign, deleteCampaign, editCampaign, saveCampaign, userId } = this.props;
    if (!campaign.id) { return <div>Loading...</div>; }
    return (
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" onChange={editCampaign(campaign.id)} value={campaign.name} />

        { campaign.players.map(player => (
          <div key={player.id}>{ player.name } &laquo;{ player.email }&raquo;</div>
        ))}

        <label htmlFor="invitePlayer">Players</label>
        <input id="invitePlayer" ref="playerEmail" type="email" />
        <button onClick={this.invitePlayer}>Invite Player</button>

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
  inviteUser: PropTypes.func,
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
  inviteUser: (email, campaignId) => dispatch(inviteUser(email, campaignId)),
  saveCampaign: (userId, attrs) => () => dispatch(saveCampaign(userId, attrs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignEdit);

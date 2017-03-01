import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchUser } from '../../user/actions';
import { PlayerList } from '../components';

class CampaignShow extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { campaign, userId } = this.props;
    return (
      <div>
        <h1>{campaign.name}</h1>
        <PlayerList players={campaign.players} />
        <Link to="/"><button>Back</button></Link>
        {userId === campaign.userId
          ? <Link to={`/campaigns/${campaign.id}/edit`}><button>Edit</button></Link>
          : null
        }
      </div>
    );
  }
}

CampaignShow.propTypes = {
  campaign: PropTypes.object,
  fetchUser: PropTypes.func,
  userId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  campaign: state.campaigns.data.find(campaign => campaign.id === ownProps.params.id) || {},
  userId: state.user.data.id,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignShow);

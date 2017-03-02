import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchUser } from '../../user/actions';
import { createCharacter } from '../../characters/actions';
import { CharacterList, PlayerList } from '../components';

class CampaignShow extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { campaign, characters, createCharacter, userId } = this.props;
    return (
      <div>
        <h1>{campaign.name}</h1>

        <br />

        <PlayerList players={campaign.players} />

        <br />

        <CharacterList characters={characters} />
        <button onClick={createCharacter(campaign.id, userId)}>New Character</button>

        <br />

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
  characters: PropTypes.array,
  createCharacter: PropTypes.func,
  fetchUser: PropTypes.func,
  userId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  campaign: state.campaigns.data.find(campaign => campaign.id === ownProps.params.id) || {},
  userId: state.user.data.id,
  characters: state.characters.data.filter(character => character.campaign.id === ownProps.params.id),
});

const mapDispatchToProps = dispatch => ({
  createCharacter: (campaignId, userId) => () => dispatch(createCharacter(campaignId, userId)),
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignShow);

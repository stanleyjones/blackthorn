import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchUser } from '../../user/actions';
import { Loader } from '../../shared/components';

class CharacterShow extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { character, userId } = this.props;
    if (!character) { return <Loader />; }
    return (
      <div>
        <h1>{character.name}</h1>
        <h2>{character.description}</h2>
        <Link to={`/campaigns/${character.campaign.id}`}><button>Back</button></Link>
        {userId === character.player.id
          ? <Link to={`/characters/${character.id}/edit`}><button>Edit</button></Link>
          : null
        }
      </div>
    );
  }
}

CharacterShow.propTypes = {
  character: PropTypes.object,
  userId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  character: state.characters.data.find(character => character.id === ownProps.params.id),
  userId: state.user.data.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterShow);

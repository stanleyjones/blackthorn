import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { deleteCharacter, editCharacter, saveCharacter } from '../actions';

class CharacterEdit extends Component {
  render() {
    const { character, deleteCharacter, editCharacter, saveCharacter } = this.props;
    return (
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" onChange={editCharacter(character.id)} value={character.name} />

        <br />

        <label htmlFor="description">Description</label>
        <input id="description" name="description" onChange={editCharacter(character.id)} value={character.description} />

        <br />

        <button onClick={saveCharacter(character)}>Save</button>
        <button onClick={deleteCharacter(character.id, character.campaign.id)}>Delete</button>
        <Link to={`/characters/${character.id}`}><button>Cancel</button></Link>
      </div>
    );
  }
}

CharacterEdit.propTypes = {
  character: PropTypes.object,
  deleteCharacter: PropTypes.func,
  editCharacter: PropTypes.func,
  saveCharacter: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  character: state.characters.data.find(character => character.id === ownProps.params.id) || {},
});

const mapDispatchToProps = dispatch => ({
  deleteCharacter: (characterId, campaignId) =>
    () => dispatch(deleteCharacter(characterId, campaignId)),
  editCharacter: characterId => e => dispatch(editCharacter(e, characterId)),
  saveCharacter: attrs => () => dispatch(saveCharacter(attrs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterEdit);

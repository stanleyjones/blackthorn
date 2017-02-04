import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchUser } from '../../user/actions';

class CampaignEdit extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { campaign, userId } = this.props;
    return (
      <div>
        <h1>{this.props.campaign.name}</h1>
        <Link to={`/campaigns/${campaign.id}`}><button>Done</button></Link>
      </div>
    );
  }
}

CampaignEdit.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignEdit);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { createCampaign } from '../actions';
import { fetchUser } from '../../user/actions';

class CampaignList extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { campaigns, createCampaign, userId } = this.props;
    return (
      <div>
        <ul>
          {campaigns.map((campaign, index) => (
            <li key={index}>
              <Link to={`/campaigns/${campaign.id}`}>{campaign.name}</Link>
            </li>
          ))}
        </ul>
        <button onClick={createCampaign(userId)}>New Campaign</button>
      </div>
    );
  }
}

CampaignList.propTypes = {
  campaigns: PropTypes.array,
  fetchUser: PropTypes.func,
  createCampaign: PropTypes.func,
  userId: PropTypes.string,
};

const mapStateToProps = state => ({
  campaigns: state.campaigns.data,
  userId: state.user.data.id,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  createCampaign: userId => () => dispatch(createCampaign(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);

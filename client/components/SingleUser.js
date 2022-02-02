import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../../store/user';

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.id);
  }

  render() {
    const { user } = this.props;
    return (
      <div className='single-user'>
        <img src={user.profilePic} />
        <p>First name: {user.firstName}</p>
        <p>Last name: {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Employer: {user.bio}</p>
        <p>Job Title: {user.jobTitle}</p>
        <p>Location: {user.location}</p>
        <p>Industry: {user.industry}</p>
        <p>Years in Tech: {user.yearsInTech}</p>
        <p>School: {user.school}</p>
        <p>Area of Study: {user.areaOfStudy}</p>
        <p>End Year: {user.endYear}</p>
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  fetchSingleUser: (id) => dispatch(fetchSingleUser(id)),
});

export default connect(mapState, mapDispatch)(SingleUser);
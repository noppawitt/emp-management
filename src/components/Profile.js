import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Image, Header } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import image from '../images/cat.jpg';
import EditGeneralProfileModal from '../containers/modals/EditGeneralProfileModal';

// const displayInfo = infos => Object.keys(infos).map(key => (
//   <tr>
//     <td style={{ 'padding-right': '40px', 'padding-top': '5px' }}>{key}</td>
//     <td>{infos[key]}</td>
//   </tr>
// ));

// const work = {
//   position: 'Developer',
//   department: 'IT',
//   level: '1',
//   contract: 'Full-time',
//   startdate: '01-01-2018',
//   probationdate: '01-01-2018',
//   boss: 'Noppawit Thairungroj'
// };

// const education = {
//   university: 'Chulalongkorn University',
//   faculty: 'Engineering',
//   major: 'Computer Engineering',
//   gpa: '4.00',
//   honor: 'First honor',
//   graduatedate: '01-01-2018'
// };

// const certification = {
//   toiec: '990'
// };

// const asset = {
//   ownasset: 'Macbook Pro Mid 2017'
// };

const renderProfileBox = (title, EditModal, profile) => {
  if (title === 'General') {
    return (
      <Segment.Group raised size="large">
        <Segment padded inverted color="blue" loading={profile.isFetching}>
          <Image src={image} size="small" centered bordered />
        </Segment>
        <Segment padded textAlign="center" loading={profile.isFetching}>
          <EditModal />
          <h2>{profile.firstName} {profile.lastName} ({profile.nickName})</h2>
          <h4>Citizen ID: {profile.citizenId}</h4>
          <h4>Mobile No.: {profile.mobileNumber}</h4>
          <h4>Email: {profile.email}</h4>
          <h4>Facebook: {profile.facebookId}</h4>
          <h4>Line ID: {profile.lineId}</h4>
        </Segment>
      </Segment.Group>
    );
  }
  return (
    <Segment raised padded size="large">
      <EditModal />
      <Header as="h3">
        {title}
      </Header>
      <p>N/A</p>
    </Segment>
  );
};

const Profile = ({ profile }) => {
  const renderGeneralProfileBox = renderProfileBox('General', EditGeneralProfileModal, profile);
  // const renderWorkProfileBox = renderProfileBox('Work', EditGeneralProfileModal, profile);
  // const renderEducationProfileBox = renderProfileBox('Education', EditGeneralProfileModal, profile);
  // const renderCertificationProfileBox = renderProfileBox('Certification', EditGeneralProfileModal, profile);
  // const renderAssetProfileBox = renderProfileBox('Asset', EditGeneralProfileModal, profile);
  return (
    <div>
      <PageHeader icon="user" text="Profile" />
      <Grid centered>
        <Grid.Column width={12}>
          {renderGeneralProfileBox}
        </Grid.Column>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profile;

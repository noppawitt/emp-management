import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Image, Header } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import image from '../images/cat.jpg';
import EditProfileModal from './modals/EditProfileModal';
import EditGeneralProfileForm from '../containers/forms/EditGeneralProfileForm';

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
          <Header as="h3">
            <EditProfileModal header="Edit general profile">
              <EditGeneralProfileForm />
            </EditProfileModal>
          </Header>
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
      <Header as="h3">
        {title}
        <EditModal header={`Edit ${title.toLowerCase()} profile`}>
          <EditGeneralProfileForm />
        </EditModal>
      </Header>
      <p>N/A</p>
    </Segment>
  );
};

const Profile = ({ profile }) => {
  const renderGeneralProfileBox = renderProfileBox('General', EditProfileModal, profile);
  const renderWorkProfileBox = renderProfileBox('Work', EditProfileModal, profile);
  const renderEducationProfileBox = renderProfileBox('Education', EditProfileModal, profile);
  const renderCertificationProfileBox = renderProfileBox('Certification', EditProfileModal, profile);
  const renderAssetProfileBox = renderProfileBox('Asset', EditProfileModal, profile);
  return (
    <div>
      <PageHeader icon="user" text="Profile" />
      <Grid centered>
        <Grid.Column width={12}>
          {renderGeneralProfileBox}
          {renderWorkProfileBox}
          {renderEducationProfileBox}
          {renderCertificationProfileBox}
          {renderAssetProfileBox}
        </Grid.Column>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Profile;

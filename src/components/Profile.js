import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Image, Header, Icon, List } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import image from '../images/cat.jpg';
import EditGeneralProfileModal from '../containers/modals/EditGeneralProfileModal';
import EditWorkProfileModal from '../containers/modals/EditWorkProfileModal';

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

// const renderProfileBox = (title, EditModal, profile) => (
//   <Segment raised padded size="large">
//     <Grid>
//       <Grid.Row>
//         <Grid.Column floated="left">
//           <Header>{title}</Header>
//         </Grid.Column>
//         <Grid.Column floated="right" computer={1} mobile={2}>
//           <EditModal />
//         </Grid.Column>
//       </Grid.Row>
//       <Grid.Row>
//         <Grid.Column computer={3} mobile={8}>
//           {profile.map(p => (
//             <p key={p.key}>{p.title}</p>
//           ))}
//         </Grid.Column>
//         <Grid.Column computer={6} mobile={8}>
//           {profile.map(p => (
//             <p key={p.key}>{p.value}</p>
//           ))}
//         </Grid.Column>
//       </Grid.Row>
//     </Grid>
//   </Segment>
// );

const renderProfileBox = (title, EditModal, icon, profile) => (
  <Segment raised padded size="large">
    <Grid>
      <Grid.Column only="large screen" computer={3}>
        <Icon name={icon} size="huge" />
      </Grid.Column>
      <Grid.Column computer={8} mobile={14}>
        <Header size="large">{title}</Header>
        <Grid columns={2}>
          <Grid.Column>
            <List>
              {profile.map(p => (
                <List.Item key={p.key}>
                  <List.Header>
                    {p.title}
                  </List.Header>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              {profile.map(p => (
                <List.Item key={p.key}>{p.value}</List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid>
      </Grid.Column>
      <Grid.Column floated="right" computer={1} mobile={2}>
        <EditModal />
      </Grid.Column>
    </Grid>
  </Segment>
);

const Profile = ({ profile }) => {
  const renderWorkProfileBox = renderProfileBox('Work', EditWorkProfileModal, 'suitcase', [
    { key: 'level', title: 'Level', value: profile.levelName },
    { key: 'department', title: 'Department', value: profile.departmentName },
    { key: 'position', title: 'Position', value: profile.positionName },
    { key: 'contract', title: 'Contract', value: profile.contractName },
    { key: 'startDate', title: 'Start date', value: profile.startDate },
    { key: 'endDate', title: 'End date', value: profile.endDate },
    { key: 'probationDate', title: 'Probation date', value: profile.probationDate }
  ]);
  // const renderEducationProfileBox = renderProfileBox('Education', EditGeneralProfileModal, profile);
  // const renderCertificationProfileBox = renderProfileBox('Certification', EditGeneralProfileModal, profile);
  // const renderAssetProfileBox = renderProfileBox('Asset', EditGeneralProfileModal, profile);
  return (
    <div>
      <PageHeader icon="user" text="Profile" />
      <Grid centered>
        <Grid.Column computer={12} mobile={16}>
          <Segment.Group raised size="large">
            <Segment padded inverted color="blue">
              <Image src={image} size="small" centered bordered />
            </Segment>
            <Segment padded textAlign="center">
              <Grid>
                <Grid.Column floated="right" computer={1} mobile={2}>
                  <EditGeneralProfileModal />
                </Grid.Column>
              </Grid>
              <h2>{profile.firstName} {profile.lastName} ({profile.nickName})</h2>
              <h4>Citizen ID: {profile.citizenId}</h4>
              <h4>Mobile No.: {profile.mobileNumber}</h4>
              <h4>Email: {profile.email}</h4>
              <h4>Facebook: {profile.facebookId}</h4>
              <h4>Line ID: {profile.lineId}</h4>
            </Segment>
          </Segment.Group>
          {renderWorkProfileBox}
        </Grid.Column>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profile;

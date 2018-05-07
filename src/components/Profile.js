import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import image from '../images/cat.jpg';
import GeneralProfileBox from '../containers/GeneralProfileBox';
import WorkProfileBox from '../containers/WorkProfileBox';
// import EducationProfileBox from '../containers/EducationProfileBox';

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

const Profile = ({ profile }) => (
  <div>
    <PageHeader icon="user" text="Profile" />
    <Grid centered>
      <Grid.Column computer={12} mobile={16}>
        <GeneralProfileBox image={image} generalProfile={profile.general} />
        <WorkProfileBox workProfile={profile.work} />
      </Grid.Column>
    </Grid>
  </div>
);

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profile;

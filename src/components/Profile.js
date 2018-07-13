import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import PageHeader from './PageHeader';
<<<<<<< HEAD
import image from '../images/cat.jpg';
import { connect } from 'react-redux';
=======
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
import GeneralProfileBox from '../containers/GeneralProfileBox';
import WorkProfileBox from '../containers/WorkProfileBox';
import WorkExperienceProfileBox from '../containers/WorkExperienceProfileBox';
import EducationProfileBox from '../containers/EducationProfileBox';
import CertificateProfilxBox from '../containers/CertificateProfileBox';
import AssetProfileBox from '../containers/AssetProfileBox';
<<<<<<< HEAD
import EvaProfileBox from '../containers/EvaProfileBox'
const Profile = ({ profile, type , id ,profileId}) => (
=======
import Can from '../containers/Can';

const Profile = ({ profile }) => (
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
  <div>
    <PageHeader icon="user" text="Profile" />
    <Grid centered>
      <Grid.Column computer={12} mobile={16}>
<<<<<<< HEAD
        <GeneralProfileBox image={image} generalProfile={profile.general} />
        {type == 'admin' ||  id == profileId || type == 'md'? <EvaProfileBox evaProfile={profile.eva} performanceProfile={profile.perf} selfProfile={profile.self}/> : ''}
=======
        <GeneralProfileBox generalProfile={profile.general} />
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
        <WorkProfileBox workProfile={profile.work} />
        <WorkExperienceProfileBox workExperienceProfile={profile.workExperience} />
        <Can activity="educateView">
          <EducationProfileBox educationsProfile={profile.educations} />
        </Can>
        <CertificateProfilxBox certificatesProfile={profile.certificates} />
        <AssetProfileBox assetsProfile={profile.assets} />
      </Grid.Column>
    </Grid>
  </div>
);

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  profileId: state.profile.id,
  id: state.auth.id,
  type: state.auth.type
});

export default connect(mapStateToProps)(Profile);

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import image from '../images/cat.jpg';
import { connect } from 'react-redux';
import GeneralProfileBox from '../containers/GeneralProfileBox';
import WorkProfileBox from '../containers/WorkProfileBox';
import EducationProfileBox from '../containers/EducationProfileBox';
import CertificateProfilxBox from '../containers/CertificateProfileBox';
import AssetProfileBox from '../containers/AssetProfileBox';
import EvaProfileBox from '../containers/EvaProfileBox'
const Profile = ({ profile, type , id ,profileId}) => (
  <div>
    <PageHeader icon="user" text="Profile" />
    <Grid centered>
      <Grid.Column computer={12} mobile={16}>
        <GeneralProfileBox image={image} generalProfile={profile.general} />
        {type == 'admin' ||  id == profileId || type == 'md'? <EvaProfileBox evaProfile={profile.eva} performanceProfile={profile.perf} selfProfile={profile.self}/> : ''}
        <WorkProfileBox workProfile={profile.work} />
        <EducationProfileBox educationsProfile={profile.educations} />
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

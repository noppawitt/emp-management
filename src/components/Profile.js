import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import GeneralProfileBox from '../containers/GeneralProfileBox';
import WorkProfileBox from '../containers/WorkProfileBox';
import WorkExperienceProfileBox from '../containers/WorkExperienceProfileBox';
import EducationProfileBox from '../containers/EducationProfileBox';
import CertificateProfilxBox from '../containers/CertificateProfileBox';
import AssetProfileBox from '../containers/AssetProfileBox';
import EvaProfileBox from '../containers/EvaProfileBox';
import Can from '../containers/Can';
import { connect } from 'react-redux';


const Profile = ({ profile, type, id, profileId }) => (
  <div>
    <PageHeader icon="user" text="Profile" />
    <Grid centered>
      <Grid.Column computer={12} mobile={16}>
        <GeneralProfileBox generalProfile={profile.general} />
        <Can activity="evaViewOwn" conditions={[id==profileId || type=='1']}>
          <EvaProfileBox evaProfile={profile.eva} performanceProfile={profile.perf} selfProfile={profile.self}/>
        </Can>
        <WorkProfileBox workProfile={profile.work} />
        <Can activity="workExperoenceView">
          <WorkExperienceProfileBox workExperienceProfile={profile.workExperience} />
        </Can>
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
  profileId: state.profile.userId,
  id: state.auth.id,
  type: state.auth.type
});

export default connect(mapStateToProps)(Profile);

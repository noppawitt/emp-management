import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import GeneralProfileBox from '../containers/GeneralProfileBox';
import WorkProfileBox from '../containers/WorkProfileBox';
import WorkExperienceProfileBox from '../containers/WorkExperienceProfileBox';
import EducationProfileBox from '../containers/EducationProfileBox';
import CertificateProfileBox from '../containers/CertificateProfileBox';
import ToeicProfileBox from '../containers/ToeicProfileBox';
import AssetProfileBox from '../containers/AssetProfileBox';
import Can from '../containers/Can';

const Profile = ({ profile }) => (
  <div>
    <PageHeader icon="user" text="Profile" />
    <Grid centered>
      <Grid.Column computer={12} mobile={16}>
        <GeneralProfileBox generalProfile={profile.general} />
        <WorkProfileBox workProfile={profile.work} />
        <Can activity="workExperienceView">
          <WorkExperienceProfileBox workExperienceProfile={profile.workExperiences} />
        </Can>
        <Can activity="educateView">
          <EducationProfileBox educationsProfile={profile.educations} />
        </Can>
        <CertificateProfileBox certificatesProfile={profile.certificates} />
        <Can activity="toeicView">
          <ToeicProfileBox toeicsProfile={profile.toeics} />
        </Can>
        <AssetProfileBox assetsProfile={profile.assets} />
      </Grid.Column>
    </Grid>
  </div>
);

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Profile;

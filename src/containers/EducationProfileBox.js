import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';

const EducationProfileBox = ({ educationsProfile }) => (
  <Segment.Group raised size="large">
    <ProfileBox
      title="Education"
      icon="graduation"
      lists={[
        { key: 'universityName', title: 'University', value: educationsProfile[0].universityName },
        { key: 'degree', title: 'Degree', value: educationsProfile[0].degreeName },
        { key: 'faculty', title: 'Faculty', value: educationsProfile[0].facultyName },
        { key: 'major', title: 'Major', value: educationsProfile[0].majorName },
        { key: 'program', title: 'Program', value: educationsProfile[0].program },
        { key: 'honor', title: 'Honor', value: educationsProfile[0].honorFlag },
        { key: 'gpax', title: 'Gpax', value: educationsProfile[0].gpax },
        { key: 'graduationDate', title: 'Graduation date', value: educationsProfile[0].graduationDate }
      ]}
    />
    {[...educationsProfile].slice(1).map(p => (<ProfileBox
      lists={[
        { key: 'universityName', title: 'University', value: p.universityName },
        { key: 'degree', title: 'Degree', value: p.degreeName },
        { key: 'faculty', title: 'Faculty', value: p.facultyName },
        { key: 'major', title: 'Major', value: p.majorName },
        { key: 'program', title: 'Program', value: p.program },
        { key: 'honor', title: 'Honor', value: p.honor },
        { key: 'gpax', title: 'Gpax', value: p.gpax },
        { key: 'graduationDate', title: 'Graduation date', value: p.graduationDate },
      ]}
    />))}
  </Segment.Group>
);

EducationProfileBox.propTypes = {
  educationsProfile: PropTypes.array.isRequired
};

export default EducationProfileBox;

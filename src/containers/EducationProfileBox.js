import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';

const EducationProfileBox = ({ educationsProfile, onEditClick }) => (
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
      onEditClick={() => onEditClick(educationsProfile[0].id)}
    />
    {[...educationsProfile].slice(1).map(p => (<ProfileBox
      key={p.id}
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
      onEditClick={() => onEditClick(p.id)}
    />))}
  </Segment.Group>
);

EducationProfileBox.propTypes = {
  educationsProfile: PropTypes.array.isRequired,
  onEditClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onEditClick: id => dispatch(openModal(modalNames.EDIT_EDUCATION_PROFILE, { id }))
});

export default connect(null, mapDispatchToProps)(EducationProfileBox);

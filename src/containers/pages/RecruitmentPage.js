import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchRecruitmentRequest, sortRecruitment, filterRecruitment } from '../../actions/recruitment';
import Recruitment from '../../components/Recruitment';
import Loader from '../../components/Loader';
import { getVisibleRecruitment } from '../../selectors/recruitment';

const RecruitmentPage = ({ isFetching, recruitments, onSearchChange, sortByKey, sortKey, direction }) => {
  const handleSort = (key) => {
    if (sortKey !== key) {
      sortByKey(key, 'ascending');
    }
    else {
      sortByKey(key, direction === 'ascending' ? 'descending' : 'ascending');
    }
  };
  return (
    <div>
      {isFetching ?
        <Loader /> :
        <Recruitment
          recruitments={recruitments}
          onSearchChange={onSearchChange}
          sortKey={sortKey}
          direction={direction}
          handleSort={handleSort}
        />}
    </div>
  );
};

RecruitmentPage.defaultProps = {
  isFetching: true
};

RecruitmentPage.propTypes = {
  isFetching: PropTypes.bool,
  recruitments: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  sortByKey: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.recruitment.isFetching,
  recruitments: getVisibleRecruitment(state),
  direction: state.recruitment.direction,
  sortKey: state.recruitment.sortKey
});

const mapDispatchToProps = dispatch => ({
  fetchRecruitment: () => dispatch(fetchRecruitmentRequest()),
  onSearchChange: e => dispatch(filterRecruitment(e.target.value)),
  sortByKey: (key, direction) => dispatch(sortRecruitment(key, direction)),
  // add 'Start evaluate' function
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchRecruitment } = this.props;
      fetchRecruitment();
    }
  })
);

export default enhance(RecruitmentPage);

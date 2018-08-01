import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal as SUIModal, Grid, Menu } from 'semantic-ui-react';
import { closeModal } from '../../actions/modal';
import { categoryModalChange, pageModalChange } from '../../actions/recruitmentProfile';

const ViewResultModal = ({
  result,
  currentCategory,
  onClose,
  changeCategory,
  changePage,
}) => (
  <div>
    <SUIModal
      dimmer="blurring"
      size="large"
      closeIcon
      open
      onClose={onClose}
    >
      <SUIModal.Header>
        Exam result of ID: {this.props.id} (on {this.props.testDate})
        eiei+AAA{console.log(this.props)}AAA+eiei
      </SUIModal.Header>
      <SUIModal.Content scrolling>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Menu vertical size="small" color="teal">
                <Menu.Item name="overall" active={currentCategory === 'overall'} onClick={() => changeCategory('overall')}>
                  Overall
                </Menu.Item>
                <Menu.Item>
                  <Menu.Header>Category</Menu.Header>
                  <Menu.Menu>
                    {this.props.categoryList && this.props.categoryList.map(category => (
                      <Menu.Item
                        name={category}
                        active={this.state.currentCategory === category}
                        onClick={this.handleCategory}
                      >
                        {category.charAt(0).toUpperCase().concat(category.slice(1))}
                      </Menu.Item>
                    ))}
                  </Menu.Menu>
                </Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column width={12}>
              Test2
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </SUIModal.Content>
    </SUIModal>
  </div>
);

ViewResultModal.propTypes = {
  result: PropTypes.array.isRequired,
  currentCategory: PropTypes.string.isRequired,
  changeCategory: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  changeCategory: category => dispatch(categoryModalChange(category)),
  changePage: page => dispatch(pageModalChange(page)),
});

export default connect(null, mapDispatchToProps)(ViewResultModal);

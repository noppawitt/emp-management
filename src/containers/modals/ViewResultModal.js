import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal as SUIModal, Grid, Menu } from 'semantic-ui-react';
import { closeModal } from '../../actions/modal';

class ViewResultModal extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = { currentCategory: 'overall' };
    this.handleCategory = this.handleCategory.bind(this);
  }

  handleCategory(e, { name }) {
    this.setState({ currentCategory: name }, this.forceUpdate());
  }

  render() {
    return (
      <SUIModal
        dimmer="blurring"
        size="large"
        closeIcon
        open
        onClose={this.props.onClose}
      >
        <SUIModal.Header>
          Exam result of ID: {this.props.id} (on {this.props.testDate})
        </SUIModal.Header>
        <SUIModal.Content scrolling>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Menu vertical size="small" color="teal">
                  <Menu.Item name="overall" active={this.state.currentCategory === 'overall'} onClick={this.handleCategory}>
                    Overall
                  </Menu.Item>
                  <Menu.Item>
                    <Menu.Header>Category</Menu.Header>
                    <Menu.Menu>
                      {this.props.categoryList.map(category => (
                        <Menu.Item name={category} active={this.state.currentCategory === category} onClick={this.handleCategory}>
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
      </SUIModal>);
  }
}

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(ViewResultModal);

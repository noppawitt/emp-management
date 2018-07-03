import React from 'react';
import PropTypes from 'prop-types';
// import Modal from '../../components/modal';
import { Segment, Grid, Menu, Table, Pagination } from 'semantic-ui-react';

const questionRenderer = item => (
  <div dangerouslySetInnerHTML={{ __html: item.exQuestion }} />
);

const TakeExam = ({
  id,
  activeItem,
  onClickActiveItem,
  categoryList,
  examObject }) =>
  (
    <Segment.Group>
      <Segment>
        <h1>Timer here</h1>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={3}>
            <Menu vertical tabular>
              {categoryList && categoryList.map(eachRow => (
                <Menu.Item
                  name={eachRow.category}
                  active={activeItem === eachRow.category}
                  onClick={() => onClickActiveItem(eachRow.category)}
                />
              ))}
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <Segment>
              <div> {id} </div>
              <Table>
                {examObject && examObject.map(item => (
                  <Table.Row key={item.exId}>
                    <Table.Row>
                      {questionRenderer(item)}
                    </Table.Row>
                    <Table.Cell>
                      {(item.exChoice).map(choice => (
                        <div>{choice}</div>
                      ))}
                    </Table.Cell>
                  </Table.Row>
                ))}
                <Table.Footer>
                  {categoryList &&
                    <Segment>
                      {categoryList.map(i => (
                        i.category === activeItem ? i.category : null
                      ))}
                    </Segment>
                  }
                  <Pagination />
                </Table.Footer>
              </Table>
            </Segment>
            {/* show exam according to 'activeMenuItem' below this */}
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );

TakeExam.propTypes = {
  id: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  onClickActiveItem: PropTypes.func.isRequired,
  categoryList: PropTypes.array.isRequired,
  examObject: PropTypes.array.isRequired,
};

export default TakeExam;

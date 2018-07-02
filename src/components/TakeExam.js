import React from 'react';
import PropTypes from 'prop-types';
// import Modal from '../../components/modal';
import { Segment, Grid, Menu, Table } from 'semantic-ui-react';

const questionRenderer = item => (
  <div dangerouslySetInnerHTML={{ __html: item.exQuestion }} />
);

const TakeExam = ({
  id,
  activeItem,
  onClickActiveItem,
  eprList,
  examObject }) =>
  (
    <Segment.Group>
      <Segment>
        <h1>Timer here</h1>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              <Menu.Item name="1" active={activeItem === '1'} onClick={() => onClickActiveItem('1')} />
              <Menu.Item name="2" active={activeItem === '2'} onClick={() => onClickActiveItem('2')} />
              <Menu.Item name="3" active={activeItem === '3'} onClick={() => onClickActiveItem('3')} />
              {eprList && eprList.map(eachRow => (
                <Menu.Item
                  name={eachRow.category + eachRow.subCategory}
                  active={activeItem === eachRow.category + eachRow.subCategory}
                  onClick={() => onClickActiveItem(eachRow.category + eachRow.subCategory)}
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
  eprList: PropTypes.array.isRequired,
  examObject: PropTypes.array.isRequired,
};

export default TakeExam;

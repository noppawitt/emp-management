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
  categoryList,
  subCategoryList,
  examObject }) =>
  (
    <Segment.Group>
      <Segment>
        <h1>Timer here</h1>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={3}>
            {/* <Menu vertical tabular>
              {eprList && eprList.map(eachRow => (
                <Menu.Item
                  name={eachRow.eprExCategory + eachRow.eprExSubcategory}
                  active={activeItem === eachRow.eprExCategory + eachRow.eprExSubcategory}
                  onClick={() => onClickActiveItem(eachRow.eprExCategory + eachRow.eprExSubcategory)}
                />
              ))}
            </Menu> */}
            {console.log(categoryList)}
            {console.log(subCategoryList)}
            <Menu vertical tabular>
              {categoryList && categoryList.map(category => (
                <Menu>
                  <Menu.Header name={category.category} />
                  <Menu.Menu>
                    {subCategoryList.map(subCategory => (
                      subCategory.category === categoryList.category ?
                        <Menu.Item
                          name={subCategory.subCategory}
                          active={activeItem === category.category + subCategory.subCategory}
                          onClick={() => onClickActiveItem(category.category + subCategory.subCategory)}
                        /> : null
                    ))}
                  </Menu.Menu>
                </Menu>
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
  categoryList: PropTypes.array.isRequired,
  subCategoryList: PropTypes.array.isRequired,
  examObject: PropTypes.array.isRequired,
};

export default TakeExam;

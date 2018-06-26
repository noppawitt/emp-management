import React from 'react';
import Proptypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const ExamPositionRequired = ({ eprList }) => (
  <div>
    <h2>Exam Required for Position</h2>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell className="one wide center aligned">#</Table.HeaderCell>
          <Table.HeaderCell className="one wide">Category</Table.HeaderCell>
          <Table.HeaderCell className="one wide">Sub-Category</Table.HeaderCell>
          <Table.HeaderCell className="one wide">Type</Table.HeaderCell>
          <Table.HeaderCell className="one wide">Require Number</Table.HeaderCell>
          <Table.HeaderCell className="one wide">Points</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {eprList.map((row, i) => (
          <Table.Row>
            <Table.Cell className="one wide center aligned">{i + 1}</Table.Cell>
            <Table.Cell className="one wide">{row.category}</Table.Cell>
            <Table.Cell className="one wide">{row.subCategory}</Table.Cell>
            <Table.Cell className="one wide">{row.type}</Table.Cell>
            <Table.Cell className="one wide">{row.requiredNumber}</Table.Cell>
            <Table.Cell className="one wide">{row.points}</Table.Cell>
          </Table.Row>
        ))}

      </Table.Body>
    </Table>
  </div>
);

ExamPositionRequired.propTypes = {
  eprList: Proptypes.array.isRequired,
};

export default ExamPositionRequired;

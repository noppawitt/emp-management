import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Input, Table, Button, Icon, Pagination, Checkbox } from 'semantic-ui-react';
import history from '../history';
import PageHeader from './PageHeader';
import Can from '../containers/Can';

const Project = ({
  projects,
  onAddClick,
  onSearchChange,
  sortKey,
  direction,
  handleSort,
  currentPage,
  totalPages,
  handlePageChange,
  handleHasPoNumberChange,
  searchText,
  hasPoNumber
}) => (
    <div>
      <PageHeader text="Project" icon="paste" />
      <Segment.Group raised>
        <Segment>
          <Input icon="search" placeholder="Search projects..." defaultValue={searchText} onChange={onSearchChange} />
          <Checkbox toggle label="PO No." defaultChecked={hasPoNumber} onChange={handleHasPoNumberChange} />
          <Can activity="projectAdd">
            <Button icon labelPosition="left" floated="right" onClick={onAddClick} color="blue" >
              <Icon name="add" />
              Add New Project
          </Button>
          </Can>
        </Segment>
        <Segment>
          <Table fixed striped sortable selectable celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell sorted={sortKey === 'projectId' ? direction : null} onClick={() => handleSort('projectId')}>Proj No.</Table.HeaderCell>
                <Table.HeaderCell sorted={sortKey === 'name' ? direction : null} onClick={() => handleSort('name')}>Name</Table.HeaderCell>
                <Table.HeaderCell sorted={sortKey === 'customer' ? direction : null} onClick={() => handleSort('customer')}>Customer</Table.HeaderCell>
                <Table.HeaderCell sorted={sortKey === 'quotationId' ? direction : null} onClick={() => handleSort('quotationId')}>Quo No.</Table.HeaderCell>
                <Table.HeaderCell sorted={sortKey === 'purchasedOrder' ? direction : null} onClick={() => handleSort('purchasedOrder')}>PO No.</Table.HeaderCell>
                <Table.HeaderCell sorted={sortKey === 'endDate' ? direction : null} onClick={() => handleSort('endDate')}>To</Table.HeaderCell>
                <Table.HeaderCell sorted={sortKey === 'status' ? direction : null} onClick={() => handleSort('status')}>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {projects.map(project => (
                <Table.Row key={project.projectId} style={{ cursor: 'pointer' }} onClick={() => history.push(`/project/${project.projectId}`)}>
                  <Table.Cell>{project.projectId}</Table.Cell>
                  <Table.Cell>{project.name}</Table.Cell>
                  <Table.Cell>{project.customer}</Table.Cell>
                  <Table.Cell>{project.quotationId}</Table.Cell>
                  <Table.Cell>{project.purchasedOrder}</Table.Cell>
                  <Table.Cell>{project.endDate}</Table.Cell>
                  <Table.Cell>{project.status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="7">
                  <Pagination activePage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </Segment.Group>
    </div>
  );

Project.propTypes = {
  projects: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleHasPoNumberChange: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  hasPoNumber: PropTypes.bool.isRequired
};

export default Project;

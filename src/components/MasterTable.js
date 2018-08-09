import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tab } from 'semantic-ui-react';

const panes = masterTable => [
  { menuItem: 'Asset Type',
    render: () => (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {masterTable.assetTypes.map(assetType => (
            <Table.Row key={`${assetType.id}`}>
              <Table.Cell>{`${assetType.name}`}</Table.Cell>
            </Table.Row>
      ))}
        </Table.Body>
      </Table>
    )
  },
  { menuItem: 'Asset',
    render: () => (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
            <Table.HeaderCell>Own Flag</Table.HeaderCell>
            <Table.HeaderCell >Serial Number</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {masterTable.assets.map(asset => (
            <Table.Row key={`${asset.id}`}>
              <Table.Cell>{`${asset.name}`}</Table.Cell>
              <Table.Cell colSpan="3">{asset.description || '-'}</Table.Cell>
              <Table.Cell>{`${asset.ownFlag}`}</Table.Cell>
              <Table.Cell>{`${asset.serialNumber}`}</Table.Cell>
            </Table.Row>
      ))}
        </Table.Body>
      </Table>
    )
  },
  { menuItem: 'Certificate',
    render: () => (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell colSpan="2">Institute</Table.HeaderCell>
            <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {masterTable.certificates.map(certificate => (
            <Table.Row key={`${certificate.id}`}>
              <Table.Cell>{`${certificate.name}`}</Table.Cell>
              <Table.Cell colSpan="2">{certificate.institute}</Table.Cell>
              <Table.Cell colSpan="3">{certificate.description || '-'}</Table.Cell>

            </Table.Row>
      ))}
        </Table.Body>
      </Table>
    )
  },
  { menuItem: 'Contract',
    render: () => (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {masterTable.contracts.map(contract => (
            <Table.Row key={`${contract.id}`}>
              <Table.Cell>{`${contract.name}`}</Table.Cell>
              <Table.Cell colSpan="3">{contract.description || '-'}</Table.Cell>
            </Table.Row>
      ))}
        </Table.Body>
      </Table>
    )
  },
  { menuItem: 'Degree',
    render: () => (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {masterTable.degrees.map(degree => (
            <Table.Row key={`${degree.id}`}>
              <Table.Cell>{`${degree.name}`}</Table.Cell>
              <Table.Cell colSpan="3">{degree.description || '-'}</Table.Cell>
            </Table.Row>
      ))}
        </Table.Body>
      </Table>
    )
  },
  { menuItem: 'Department',
    render: () => (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {masterTable.departments.map(department => (
            <Table.Row key={`${department.id}`}>
              <Table.Cell>{`${department.name}`}</Table.Cell>
            </Table.Row>
      ))}
        </Table.Body>
      </Table>
    )
  },
  { menuItem: 'Faculty',
    render: () => (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell colSpan="2">University</Table.HeaderCell>
            <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {masterTable.faculties.map(faculty => (
            <Table.Row key={`${faculty.id}`}>
              <Table.Cell>{`${faculty.name}`}</Table.Cell>
              <Table.Cell colSpan="2">{`${faculty.universityName}`}</Table.Cell>
              <Table.Cell colSpan="3">{faculty.description || '-'}</Table.Cell>
            </Table.Row>
      ))}
        </Table.Body>
      </Table>
    )
  },
  { menuItem: 'Level',
    render: () => (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
            <Table.HeaderCell>Annual Leave</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {masterTable.levels.map(level => (
            <Table.Row key={`${level.id}`}>
              <Table.Cell>{`${level.name}`}</Table.Cell>
              <Table.Cell colSpan="3">{level.description || '-'}</Table.Cell>
              <Table.Cell>{`${level.annualLeave}`}</Table.Cell>
            </Table.Row>
      ))}
        </Table.Body>
      </Table>
    )
  },
  { menuItem: 'Major',
    render: () => (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Faculty</Table.HeaderCell>
            <Table.HeaderCell colSpan="2">University</Table.HeaderCell>
            <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {masterTable.majors.map(major => (
            <Table.Row key={`${major.id}`}>
              <Table.Cell>{`${major.name}`}</Table.Cell>
              <Table.Cell>{`${major.facultyName}`}</Table.Cell>
              <Table.Cell colSpan="2">{major.universityName}</Table.Cell>
              <Table.Cell colSpan="3">{major.description || '-'}</Table.Cell>
            </Table.Row>
      ))}
        </Table.Body>
      </Table>
    )
  },
  { menuItem: 'Position',
    render: () => (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {masterTable.positions.map(position => (
            <Table.Row key={`${position.id}`}>
              <Table.Cell>{`${position.name}`}</Table.Cell>
              <Table.Cell colSpan="3">{position.description || '-'}</Table.Cell>
            </Table.Row>
      ))}
        </Table.Body>
      </Table>
    )
  },
  { menuItem: 'University',
    render: () => (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {masterTable.universities.map(university => (
            <Table.Row key={`${university.id}`}>
              <Table.Cell>{`${university.name}`}</Table.Cell>
              <Table.Cell colSpan="3">{university.description || '-'}</Table.Cell>
            </Table.Row>
      ))}
        </Table.Body>
      </Table>
    )
  }
];

const MasterTable = ({ masterTable }) => (
  <div>
    <Tab menu={{ secondary: true, pointing: true }} panes={panes(masterTable)} />
  </div>
);

MasterTable.propTypes = {
  masterTable: PropTypes.object.isRequired
};

export default MasterTable;

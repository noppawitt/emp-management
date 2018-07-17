// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Segment, Input, Label, Icon } from 'semantic-ui-react';
// import { compose } from 'recompose';
// import { connect } from 'react-redux';
// import { Field, reduxForm, reset } from 'redux-form';
// import * as validator from '../utils/validator';
import AddRowDetail from '../containers/forms/AddRowDetail';

const imgreader = (imgFile) => {
  const localImageUrl = window.URL.createObjectURL(imgFile);
  return localImageUrl;
};

const arrayHeader = [
  ['Item', 'Suppliers/Customers', 'Description', 'Project No.', 'Amount (Baht)'],
  ['Item', 'ช่วงเวลาใช้เงิน Advance', 'กำหนดเคลียร์คืน', 'Description', 'Amount (Baht)'],
  ['Item', 'ช่วงเวลาใช้เงิน Advance', 'กำหนดเคลียร์คืน', 'Description', 'Amount (Baht)'],
  ['Item', 'ว / ด / ป', 'กรณีวันหยุดให้ระบุ', 'รายการ', 'จำนวนเงิน', 'หมายเหตุ']
];

const headerBill = ['ใบขออนุมัติเบิกค่าใช้จ่าย', 'ใบขออนุมัติเบิกเงินทดรองจ่าย', 'ใบเคลียร์เงินทดรองจ่าย', 'ใบขอเบิกค่าพาหนะ / อื่นๆ'];

const table = (erpdetail, selector, deleteRow, handleSubmit) => {
  switch (selector) {
    case 1:
      return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              {arrayHeader[selector - 1].map(header => (<Table.HeaderCell>{header}</Table.HeaderCell>))}
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {erpdetail.lists.map((data, index) => (
              <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{data.field1}</Table.Cell>
                <Table.Cell>{data.field2}</Table.Cell>
                <Table.Cell>{data.field3}</Table.Cell>
                <Table.Cell>{data.field4}</Table.Cell>
                <Table.Cell> <Icon name="delete" color="red" onClick={() => deleteRow(index)} /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <AddRowDetail onSubmit={handleSubmit} num={selector} />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Footer>
        </Table>
      );
    case 2:
      return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              {arrayHeader[selector - 1].map(header => (<Table.HeaderCell>{header}</Table.HeaderCell>))}
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {erpdetail.lists.map((data, index) => (
              <Table.Row >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{data.field1}</Table.Cell>
                <Table.Cell>{data.field2}</Table.Cell>
                <Table.Cell>{data.field3}</Table.Cell>
                <Table.Cell>{data.field4}</Table.Cell>
                <Table.Cell> <Icon name="delete" color="red" onClick={() => deleteRow(index)} /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <AddRowDetail onSubmit={handleSubmit} num={selector} />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Footer>
        </Table>
      );
    case 3:
      return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              {arrayHeader[selector - 1].map(header => (<Table.HeaderCell>{header}</Table.HeaderCell>))}
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {erpdetail.lists.map((data, index) => (
              <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{data.field1}</Table.Cell>
                <Table.Cell>{data.field2}</Table.Cell>
                <Table.Cell>{data.field3}</Table.Cell>
                <Table.Cell>{data.field4}</Table.Cell>
                <Table.Cell> <Icon name="delete" color="red" onClick={() => deleteRow(index)} /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <AddRowDetail onSubmit={handleSubmit} num={selector} />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Footer>
        </Table>
      );
    case 4:
      return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              {arrayHeader[selector - 1].map(header => (<Table.HeaderCell>{header}</Table.HeaderCell>))}
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {erpdetail.lists.map((data, index) => (
              <Table.Row >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{data.field1}</Table.Cell>
                <Table.Cell>{data.field2}</Table.Cell>
                <Table.Cell>{data.field3}</Table.Cell>
                <Table.Cell>{data.field4}</Table.Cell>
                <Table.Cell>{data.field5}</Table.Cell>
                <Table.Cell> <Icon name="delete" color="red" onClick={() => deleteRow(index)} /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.HeaderCell colSpan="5">
              <AddRowDetail onSubmit={handleSubmit} num={selector} />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Footer>
        </Table>
      );
    default:
      return (
        <div>
          defalut edit table
        </div>
      );
  }
};

const Detailerp = ({ erpdetail, deleteRow, handleSubmit, createErpDetail, handleDeleteImage, handleImageChange, handleDeleteImageUpdate }) => {
  const selector = erpdetail.type;
  return (
    <div>
      <Label content={headerBill[selector - 1]} size="massive" />
      <Segment raised>
        {table(erpdetail, selector, deleteRow, handleSubmit)}
        <Segment>
          <Button> <label htmlFor="file-upload" > Upload File </label> </Button>
          <Input type="file" onChange={e => handleImageChange({ files: e.target.files })} id="file-upload" style={{ display: 'none' }} />

          {erpdetail.img.map((img, index) => (
            <div>
              <Label> {img.filename} </Label>
              <a rel="noopener noreferrer" href={`localhost:3000/static/imgerp/${img.filename}`} target="_blank" > <Icon name="eye" color="black" /> </a>
              <Icon name="delete" color="red" onClick={() => handleDeleteImage(index)} />
            </div>
          ))}

          {erpdetail.imgupdate.map((imgupdate, index) => (
            <div>
              <Label>imgupdate.filename</Label>
              <a rel="noopener noreferrer" target="_blank" href={imgreader(imgupdate.files[0])} > <Icon name="eye" color="black" /> </a>
              <Icon name="delete" color="red" onClick={() => handleDeleteImageUpdate(index)} />
            </div>
          ))}
        </Segment>
        {erpdetail.lists.length > 0 ?
          <Button onClick={() => createErpDetail(erpdetail)} color="green"> Save </Button> :
          <Button color="green" disabled> Save </Button>
        }
      </Segment>
    </div>
  );
};

Detailerp.propTypes = {
  erpdetail: PropTypes.array.isRequired,
  deleteRow: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDeleteImage: PropTypes.func.isRequired,
  handleDeleteImageUpdate: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  createErpDetail: PropTypes.func.isRequired,
};

// const enhance = compose(
//   connect(null, null),
//   reduxForm({
//     form: 'Detailerp',
//     validate,
//   })
// );

export default (Detailerp);

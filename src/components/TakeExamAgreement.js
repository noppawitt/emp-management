import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Table, Form, Grid, Checkbox, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const TakeExamAgreement = ({ onClickAccept, isAgree, onClickCheckbox }) => (
  <div>
    <Table>
      <Table.Body>
        <Segment>
          <h1>Terms and Conditions.</h1>
          {/* this just a temp paragraph,
            replace it with exam-rule and agreement */}
          <p>Compliment interested discretion estimating on stimulated apartments oh.</p>
          <p>Dear so sing when in find read of call. As distrusts behaviour abilities defective is.</p>
          <p>Never at water me might. On formed merits hunted unable merely by mr whence or.</p>
          <p>Possession the unpleasing simplicity her uncommonly.</p>
          <p>Looking started he up perhaps against. How remainder all additions get elsewhere resources.</p>
          <p>One missed shy wishes supply design answer formed. Prevent on present hastily passage an subject in be.</p>
          <p>Be happiness arranging so newspaper defective affection ye. Families blessing he in to no daughter.</p>
          <p>Of friendship on inhabiting diminution discovered as. Did friendly eat breeding building few nor.</p>
          <p>Object he barton no effect played valley afford. Period so to oppose we little seeing or branch.</p>
          <p>Announcing contrasted not imprudence add frequently you possession mrs. Period saw his houses square and misery. Hour had held lain give yet.</p>
          <p>An so vulgar to on points wanted. Not rapturous resolving continued household northward gay.</p>
          <p>By Vangelis Bibakis</p>
        </Segment>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Segment>
            <Form>
              <Grid>
                <Grid.Row>
                  <Button
                    primary
                    type="submit"
                    as={Link}
                    to="/examlogin"
                    onClick={() => onClickAccept()}
                    disabled={!isAgree}
                  >
                    Accept
                  </Button>
                  <Checkbox
                    label=" I agree to the Terms and Conditions."
                    value={!isAgree}
                    checked={isAgree}
                    onClick={(e, { value }) => onClickCheckbox(value)}
                  />
                </Grid.Row>
              </Grid>
            </Form>
          </Segment>
        </Table.Row>
      </Table.Footer>
    </Table>
  </div>
);

TakeExamAgreement.propTypes = {
  onClickAccept: PropTypes.func.isRequired,
  isAgree: PropTypes.bool.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
};

export default TakeExamAgreement;

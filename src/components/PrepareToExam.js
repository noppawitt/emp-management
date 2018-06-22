import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Table, Form, Grid, Checkbox, Button } from 'semantic-ui-react';

const PrepareToExam = ({ submit }) => (
  <div>
    <Table>
      <Table.Body>
        <Segment>
          <h1>Terms and Conditions.</h1>
          {/* this just a temp paragraph,
            replace it with test-rule and agreement */}
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
          <p>He it otherwise supported instantly. Unfeeling agreeable suffering it on smallness newspaper be.</p>
          <p>By Vangelis Bibakis</p>
        </Segment>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Segment>
            {/* here submit is func
              but on we get it and proptype it is bool,
              fix it later */}
            <Form onSubmit={() => submit}>
              <Grid>
                <Grid.Row>
                  <Checkbox label=" I agree to the Terms and Conditions." />
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <Button primary type="submit">Accept</Button>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Button type="submit">Logout</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Segment>
        </Table.Row>
      </Table.Footer>
    </Table>
  </div>
);

PrepareToExam.propTypes = {
  // something here, maybe
  submit: PropTypes.bool.isRequired,
};

export default PrepareToExam;

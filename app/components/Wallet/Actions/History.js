// @flow
import React, { Component } from 'react';
import { Tab, Segment, List } from 'semantic-ui-react';

type Props = {};

export default class History extends Component<Props> {
  props: Props;

  render() {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const options2 = { hour: '2-digit', minute: '2-digit' };
    const today = new Date();

    const content = (
      <Segment className="no-border no-padding">
        <List>
          <List.Item>
            <p>{today.toLocaleDateString('en-US', options)}</p>
            <List.Content>
              <List selection relaxed divided>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
              </List>
            </List.Content>
          </List.Item>

          <List.Item>
            <p>{today.toLocaleDateString('en-US', options)}</p>
            <List.Content>
              <List selection relaxed divided>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {`${today.toLocaleTimeString(
                      'en-US',
                      options2
                    )} Transaction id , name, paramenters`}
                  </List.Content>
                </List.Item>
              </List>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    );

    return <Tab.Pane content={content} className="history" />;
  }
}

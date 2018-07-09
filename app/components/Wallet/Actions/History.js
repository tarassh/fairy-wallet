// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tab, Container } from 'semantic-ui-react';

type Props = {
};

export default class History extends Component<Props> {
    props: Props;
    
    render() {
        const content = <Container>History content</Container>;
        
        return (
            <Tab.Pane content={content} className='history' />
        );
    }
}
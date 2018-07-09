// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tab } from 'semantic-ui-react';

type Props = {
};

export default class History extends Component<Props> {
    props: Props;
    
    render() {
        const content = 'History content';
        
        return (
            <Tab.Pane content={content} />
        );
    }
}
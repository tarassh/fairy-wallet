// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tab } from 'semantic-ui-react';

type Props = {
};

export default class Send extends Component<Props> {
    props: Props;
    
    render() {
        const content = 'Send content';
        
        return (
            <Tab.Pane content={content}  className='send'/>
        );
    }
}
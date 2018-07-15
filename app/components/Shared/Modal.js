// @flow
import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';


class ModalWindow extends Component<Props> {
    state = { open: false, content: '', actions: {}, closable: true}
    
		handleAction = (event: SyntheticEvent, data: object) => {
			
		}
		
    render() {
        const { open, content, actions } = this.state
        
        return (
					<Modal 
						content={content} 
						actions={actions}  
						open={open} 
						closeOnDimmerClick={closable}
						closeOnDocumentClick={closable}
						onActionClick={this.handleAction}/>
        );
    }
}

export default ModalWindow;
import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

type Props = {
  context: any
};

const noop = () => {};

class ErrorContext extends Component<Props> {
  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  renderText = () => {
    const { context } = this.props;

    let text;
    try {
      if (typeof context === 'string') {
        text = JSON.parse(context);
        text = text.error.details;
      } else if (context.name && context.name === 'TransportStatusError') {
        if (context.statusCode === 0x6985) {
          text =
            'Ledger device: Condition of use not satisfied. Denied by user.';
        } else if (context.statusCode === 0x6a80) {
          text = 'Ledger device: Invalid data.';
        } else if (context.statusCode === 0x6b00) {
          text = 'Ledger device: Incorrect parameter P1 or P2.';
        } else {
          text = context.message;
        }
      }
      if (Array.isArray(text)) {
        [text] = text;
      }
      if (text.message) {
        text = text.message.trim();
      }
    } catch (e) {
      noop();
    }

    return <span>{text}</span>;
  };

  renderDetails = () => {
    const { context } = this.props;

    let json;
    try {
      if (typeof context === 'string') {
        json = JSON.parse(context);
      } else {
        json = context;
      }
    } catch (e) {
      noop();
    }

    return (
      <ReactJson
        displayDataTypes={false}
        displayObjectSize={false}
        iconStyle="square"
        name={null}
        src={json}
        theme="monokai"
      />
    );
  };

  render() {
    const { activeIndex } = this.state;
    const content = (
      <div>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <p className="subtitle" style={{ textTransform: 'capitalize' }}>
              <Icon name="dropdown" />
              {this.renderText()}
            </p>
          </Accordion.Title>
          <Accordion.Content
            active={activeIndex === 0}
            style={{ textAlign: 'left' }}
          >
            {this.renderDetails()}
          </Accordion.Content>
        </Accordion>
      </div>
    );

    return content;
  }
}

export default ErrorContext;

import React from 'react';
import PropTypes from 'prop-types';

const SomeProvider = (extraProps) => (Component) => {
  return class extends React.Component {
    static displayName = `${Component.name}ContainerHOC`;
    static contextTypes = {
      someStuff: PropTypes.string,
      someNumber: PropTypes.number
    };

    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.article.id !== this.props.article.id;
    }

    componentWillUpdate(nextProps, nextState) {
      console.log('updating SomeProvider');
    }

    render() {
      return <Component {...this.props} {...extraProps()} someStuff={this.context.someStuff} someNumber={this.context.someNumber} />;
    }
  };
};

export default SomeProvider;

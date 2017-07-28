import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchTerm:''
    };
  }
  doSearch = debounce(() => {
    this.props.doSearch(this.state.searchTerm);
  }, 300);

  handleSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    }, () => {
      this.doSearch();
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.searchTerm !== nextState.searchTerm;
    // return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('updating SearchBar');
  }

  render() {
    return <input
      type="search"
      placeholder="Enter search bruz"
      value={this.state.searchTerm}
      onChange={this.handleSearch}
    />;
  }
}

export default SearchBar;

import React from 'react';
import PropTypes from 'prop-types';

import Perf from 'react-addons-perf';
if(typeof window !== 'undefined') {
  window.Perf = Perf;
}

import DataApi from '../DataApi';
import ArticleList from './ArticleList';

import axios from 'axios';
import pickBy from 'lodash.pickby';
import SearchBar from './SearchBar';

// use PureComponent to cancel unnecessary render

class App extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      articles:this.props.initialData.articles,
      authors:this.props.initialData.authors,
      searchTerm: ''
    };
    // initialise state always to prevent wasted renders
  }

  static childContextTypes = {
    someStuff: PropTypes.string,
    someNumber: PropTypes.number
  };

  getChildContext() {
    return {
      someStuff: 'breaking everything',
      someNumber: 123
    };
  }

  async componentDidMount() {
    const response = await axios.get('/data');
    const api = new DataApi(response.data);

    setImmediate(() => {
      Perf.start();
    });

    setTimeout(() => {
      Perf.stop();
      Perf.printWasted();
    }, 5000);

    this.setState({
      articles: api.getArticles(),
      authors: api.getAuthors()
    });
  }

  articleActions = {
    lookupAuthor: authorId => this.state.authors[authorId]
  };

  handleDoSearch = (searchTerm) => {
    this.setState({
      searchTerm
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.searchTerm !== this.state.searchTerm;
  }

  render() {
    let {articles, searchTerm} = this.state;
    if(searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.toLowerCase().match(searchTerm.toLowerCase()) || value.body.toLowerCase().match(searchTerm.toLowerCase());
      });
    }
    return (
      <div>
        <SearchBar doSearch={this.handleDoSearch.bind(this)} />
        <ArticleList
          articles={articles}
          authors={this.state.authors}
          articleActions={this.articleActions}
        />
      </div>
    );
  }
}

// call ArticleList component to remove wasted render providing it is a stateless component
// {ArticleList({articles, authors: this.state.authors, articleActions: this.articleActions})}

App.propTypes = {
  initialData: PropTypes.object
};

export default App;

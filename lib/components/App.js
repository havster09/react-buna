import React from 'react';
import PropTypes from 'prop-types';
import DataApi from '../DataApi';
import ArticleList from './ArticleList';

import axios from 'axios';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      articles:this.props.initialData.articles,
      authors:this.props.initialData.authors
    };
  }

  static childContextTypes = {
    someStuff: PropTypes.string,
    someNumber: PropTypes.number,
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

    this.setState({
      articles: api.getArticles(),
      authors: api.getAuthors()
    });
  }

  articleActions = {
    lookupAuthor: authorId => this.state.authors[authorId]
  };

  render() {
    return (
      <div>
        <ArticleList
          articles={this.state.articles}
          authors={this.state.authors}
          articleActions={this.articleActions}
        />
      </div>
    );
  }
}

App.propTypes = {
  initialData: PropTypes.object
};

export default App;

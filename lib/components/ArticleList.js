import React from 'react';
import PropTypes from 'prop-types';

import ArticleContainer from './Article';

class ArticleList extends React.PureComponent {
  render() {
    return (
      <div>
        {Object.values(this.props.articles).map(article =>
          <ArticleContainer
            key={article.id}
            article={article}
            author={this.props.articleActions.lookupAuthor(article.authorId)}
          />
        )}
        <pre>
          {JSON.stringify(this.props.articles, null, 4)}
        </pre>
      </div>
    );
  }
}

ArticleList.propTypes = {
  articles: PropTypes.object,
  articleActions: PropTypes.object
};

export default ArticleList;

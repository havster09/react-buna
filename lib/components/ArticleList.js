import React from 'react';
import PropTypes from 'prop-types';

import ArticleContainer from './Article';

const ArticleList = ({articles, articleActions}) =>
  <div>
    {Object.values(articles).map(article =>
      <ArticleContainer
        key={article.id}
        article={article}
        author={articleActions.lookupAuthor(article.authorId)}
      />
    )}
    <pre>
      {JSON.stringify(articles, null, 4)}
    </pre>
  </div>;

ArticleList.propTypes = {
  articles: PropTypes.object,
  articleActions: PropTypes.object
};

export default ArticleList;

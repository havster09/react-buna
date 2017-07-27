import React from 'react';
import 'babel-polyfill';
import ArticleList from '../ArticleList';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('ArticleList', () => {
  const testProps = {
    articles: {
      a: { id: 'a', date: 'Fri Jul 22 2016 00:00:00 GMT+0000 (UTC)' },
      b: { id: 'b', date: 'Fri Jul 22 2016 00:00:00 GMT+0000 (UTC)' },
      c: { id: 'c', date: 'Fri Jul 22 2016 00:00:00 GMT+0000 (UTC)' }
    },
    articleActions: {
      lookupAuthor: jest.fn(() => ({}))
    }
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ArticleList
          articles={testProps.articles}
          articleActions={testProps.articleActions}
        />
      )
      .toJSON();
    expect(tree.children.length).toBe(4);
    expect(tree).toMatchSnapshot();
  });
});

describe('ArticleList Shallow test', () => {
  it('passes a shallow test', () => {
    const testProps = {
      articles: {
        a: { id: 'a', date: 'Fri Jul 22 2016 00:00:00 GMT+0000 (UTC)' },
        b: { id: 'b', date: 'Fri Jul 22 2016 00:00:00 GMT+0000 (UTC)' },
        c: { id: 'c', date: 'Fri Jul 22 2016 00:00:00 GMT+0000 (UTC)' }
      },
      articleActions: {
        lookupAuthor: jest.fn(() => ({}))
      }
    };
    const wrapper = shallow(
        <ArticleList
          {...testProps}
        />
      );
    expect(wrapper.find('ArticleContainerHOC').length).toBe(3);
  });
});

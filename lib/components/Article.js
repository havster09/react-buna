import React from 'react';
import PropTypes from 'prop-types';
import SomeProvider from './SomeProvider';

const styles = {
  article: {
    paddingBottom: 10,
    borderBottomStyle: 'solid',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold'
  },
  date: {
    fontSize: '0.8em',
    color: '#888'
  },
  author: {
    paddingTop: 10,
    paddingBottom: 10
  },
  body: {
    paddingLeft: 20
  }
};

const dateDisplay = dateString => new Date(dateString).toDateString();

const Article = ({ article, author, someStuff, someNumber, experience, npcClass, weapons}) =>
  <div style={styles.article}>
    <div style={styles.title}>
      {article.title}
    </div>
    <div style={styles.date}>
      {dateDisplay(article.date)}
    </div>
    <div style={styles.author}>
      <a href={author.website}>
        {author.firstName} {author.lastName}
      </a>
    </div>
    <div style={styles.body}>
      {article.body}
    </div>
    <h1>{someStuff}</h1>
    <h1>{someNumber}</h1>
    <h1>{experience}</h1>
    <h1>{npcClass}</h1>
    <h1>{JSON.stringify(weapons, null, 4)}</h1>
  </div>;

Article.propTypes = {
  article: PropTypes.shape({
    date: PropTypes.string.isRequired
  }),
  author: PropTypes.object.isRequired,
  someStuff: PropTypes.string,
  experience: PropTypes.string,
  npcClass: PropTypes.string,
  weapons: PropTypes.arrayOf(PropTypes.string)
};

const extraProps = () => {
  return {
    weapons: ['Browning SLP', 'Steyer'],
    experience: 'veteran',
    npcClass: 'rifle_man',
  };
};

export default SomeProvider(extraProps)(Article);

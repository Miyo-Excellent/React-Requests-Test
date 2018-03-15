// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// Components
import Test from './components/Test';

// Libreries

// Styles
import styles from './scss/Home.scss';

const Home = ({ }) => {
  return (
    <div className={`${styles.home}`}>
      <Test />
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Components

// Libreries

// Styles
import styles from './scss/Test.scss';

const Test = ({ getUserToke, test, routes, user }) => {
  return (
    <div className={`${styles.test}`}>
      <nav className={`${styles.nav}`}>

        {/* MENU */}
        <ul className={`${styles.menu}`}>{routes.map((route, index) =>
          <li className={`${styles.item}`} key={index}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        )}</ul>
      </nav>

      {/* Form || Entities Generator List */}
      <section className={`${styles.form}`}>{user.isLogin
        ? (
          <div className={`${styles.userInfo}`}>
            <div className={`${styles.email}`}>
              <span>Bienvenido {user.info.email}</span>
            </div>

            {/* CONTACTS LIST */}
            <section className={`${styles.contacts}`}>{user.entities.map((entitie, i) =>
              <article key={i} className={`${styles.contact}`}>
                <div className={`${styles.photo}`}>
                  <img src={entitie.avatar} alt={entitie.name}/>
                </div>
                <div className={`${styles.info}`}>
                  <div className={`${styles.name}`}>
                    <span>Nombre: {entitie.name}</span>
                  </div>
                  <div className={`${styles.phone}`}>
                    <span>Teléfono: {entitie.phone_number}</span>
                  </div>
                  <div className={`${styles.address}`}>
                    <span>Dirección: {entitie.address}</span>
                  </div>
                </div>
              </article>
            )}</section>
          </div>
        ) : (
          // LOGIN
          <div className={`${styles.login}`}>
            <form className={`${styles.form}`}>
              <label htmlFor="email" className={`${styles.labelEmail}`}>Email</label>
              <input className={`${styles.email}`} type="email" placeholder="mi@email.com" id="email" defaultValue='hello@qroom.biz' required />

              <label htmlFor="password" className={`${styles.labelPassword}`}>password</label>
              <input className={`${styles.password}`} type="password" placeholder="MySecretPassword" id="password" defaultValue='p4sswo1rd!' required />

              <button className={`${styles.btn}`} onClick={(e) => {
                e.preventDefault();
                getUserToke({
                  url: 'https://qroom.biz/api/v1/tests/login',
                  email: document.querySelector('#email').value,
                  password: document.querySelector('#password').value,
                  log: false
                });
              }}>POST</button>
            </form>
          </div>
        )
      }</section>
    </div>
  );
};



const mapStateToProps = state => ({
  routes: state.home.nav.routes,
  user: state.home.user
});

const mapDispatchToProps = dispatch => ({
  getUserToke(userData) {
    dispatch(dispatch => {
      axios.post( 'http://localhost:8080/api/test/login', userData, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
        .then(response => dispatch({
          type: 'LOAD_ENTITIES',
          data: response.data
        })).catch(error => console.log(`ERROR ::: Los datos ingresados son errados ::: error: ${error}`));
    });
  }});

export default connect(mapStateToProps, mapDispatchToProps)(Test);

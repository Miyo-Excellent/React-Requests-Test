// Dependencies
import React from 'react';
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom';

// Routes
import routes from '../shared/routes';

// Styles
import styles from './scss/App.scss';

export default ({ server, location, context }) => {
  const routesMap = routes.map((route, i) => <Route key={i} {...route} />);

  // Client Router
  let router = (
    <BrowserRouter>
      <Switch>
        {routesMap}
      </Switch>
    </BrowserRouter>
  );

  // Server Router
  if (server) {
    router = (
      <StaticRouter location={location} context={context}>
        <Switch>
          {routesMap}
        </Switch>
      </StaticRouter>
    );
  }

  return (
    <div className={styles.app}>
      {router}
    </div>
  );
};

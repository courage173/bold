/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';

import AuthRoute from './HOC/AuthRoute';
import ScholarshipPage from './pages/Scholarship';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route
                exact
                path="/dashboard/scholarship"
                component={ScholarshipPage}
            />
        </Switch>
    );
};

Routes.displayName = 'Routes';

export default Routes;

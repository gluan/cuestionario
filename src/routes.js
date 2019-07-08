import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Student from './components/cuestionario/student';
import Teacher from './components/cuestionario/teacher';
import Book from './components/book/book';
import Instructions from './components/instructions/instructions';
import Page404 from './components/Page404/Page404';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route path='/student' component={Student} />
            <Route path='/tea' component={Teacher} />
            <Route path='/book' component={Book} />
            <Route path='/i' component={Instructions} />
            <Route path='/' component={Student} />
            <Route component={Page404}/>
        </Switch>
    </App>;

    export default AppRoutes;

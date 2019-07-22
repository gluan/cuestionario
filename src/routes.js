import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Student from './components/cuestionario/student';
import Teacher from './components/cuestionario/teacher';
import Book from './components/book/book';
import BookTeacher from './components/book/book-teacher';
import Story from './components/comic/student';
import StoryTeacher from './components/comic/teacher';
import Instructions from './components/instructions/instructions';
import Page404 from './components/Page404/Page404';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route path='/cuestionario-student' component={Student} />
            <Route path='/cuestionario-teacher' component={Teacher} />
            <Route path='/book-student' component={Book} />
			<Route path='/book-teacher' component={BookTeacher} />
            <Route path='/story-student' component={Story} />
			<Route path='/story-teacher' component={StoryTeacher} />
            <Route path='/i' component={Instructions} />
            <Route path={process.env.PUBLIC_URL+'/'} component={Student}/>
            <Route component={Page404}/>
        </Switch>
    </App>;

    export default AppRoutes;

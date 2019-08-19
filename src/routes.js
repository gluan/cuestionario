// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Components
import App from './App';
import Inicio from './components/Inicio/Inicio';
import Page404 from './components/Page404/Page404';
import Student from './components/cuestionario/student';
import Teacher from './components/cuestionario/teacher';
import Book from './components/book/book';
import BookTeacher from './components/book/book-teacher';
import Story from './components/comic/student';
import StoryTeacher from './components/comic/teacher';
import StoryTeacherImage from './components/comic/teacherImage';
const AppRoutes = () =>
    <App>
        <Switch>
            <Route path={process.env.PUBLIC_URL+'/cuestionario-student'} component={Student} />
            <Route path='/cuestionario-teacher' component={Teacher} />
            <Route path='/book-student' component={Book} />
    		<Route path='/book-teacher' component={BookTeacher} />
            <Route path='/story-student' component={Story} />
    		<Route path='/story-teacher' component={StoryTeacher} />
            <Route path='/story-teacher-i' component={StoryTeacherImage} />

            <Route path={process.env.PUBLIC_URL+'/'} component={Inicio}/>
            <Route component={Page404}/>
        </Switch>
    </App>;

    export default AppRoutes;

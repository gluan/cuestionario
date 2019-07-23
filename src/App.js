// import React, { Component } from 'react';
// import { Switch, Route, Link, BrowserRouter as Router} from 'react-router-dom';
//
// import Student from './components/cuestionario/student';
// import Teacher from './components/cuestionario/teacher';
// import Book from './components/book/book';
// import BookTeacher from './components/book/book-teacher';
// import Story from './components/comic/student';
// import StoryTeacher from './components/comic/teacher';
//
// export default class App extends Component {
//   render() {
//       console.log('App');
//       console.log(process.env.PUBLIC_URL)
//       console.log(process.env.PUBLIC_URL+'/')
//     return (
//         <Router basename="/build">
//             <div>
//                 <ul>
//                     <li>
//                         <Link to='/cuestionario-student'>cuestionario-student</Link>
//                     </li>
//                     <li>
//                         <Link to='/cuestionario-teacher'>cuestionario-student</Link>
//                     </li>
//                 </ul>
//                 <Route path={'/cuestionario-student'} component={Student} exact  />
//                 <Route path={'/cuestionario-teacher'} component={Teacher} exact />
//                 <Route path={'/book-student'} component={Book} exact />
//                 <Route path={process.env.PUBLIC_URL+'/book-teacher'} component={BookTeacher} exact />
//                 <Route path={process.env.PUBLIC_URL+'/story-student'} component={Story} exact />
//                 <Route path={process.env.PUBLIC_URL+'/story-teacher'} component={StoryTeacher} exact />
//             </div>
//         </Router>
//
//
//     );
//   }
// }
// Dependencies
import React, { Component } from 'react';
// Components
import Content from './components/Global/Content';

import './App.css';

class App extends Component {

  render() {
    const { children } = this.props;
    return (
      <div className="App">
        <Content body={ children }/>
      </div>
    );
  }
}

export default App;

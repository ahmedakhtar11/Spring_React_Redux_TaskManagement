import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import TodoBoard from './components/TodoBoard';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddTodoTask from './components/TodoTask/AddTodoTask';
import { Provider } from "react-redux";
import store from "./store";
import UpdateTodoTask from './components/TodoTask/UpdateTodoTask';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={TodoBoard} />

            <Route exact path="/addTodoTask" component={AddTodoTask} />
            <Route exact path="/updateTodoTask/:todo_id" component={UpdateTodoTask} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

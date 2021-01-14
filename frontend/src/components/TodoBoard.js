import React, { Component } from "react";
import { Link } from "react-router-dom";
import TodoTaskItem from "./TodoTask/TodoTaskItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../actions/TodoTaskActions";

class TodoBoard extends Component {
    componentDidMount() {
        this.props.getBacklog();
    }
    render() {
        const { todo_tasks } = this.props.todo_tasks;

        let BoardContent;
        let todoItems = [];
        let inProgressItems = [];
        let doneItems = [];

        const BoardAlgorithm = todo_tasks => {
            if (todo_tasks.length < 1) {
                return (
                    <div className="alert alert-info text-center" role="alert">
                        No Tasks Items.
          </div>
                );
            } else {
                const tasks = todo_tasks.map(todo_task => (
                    <TodoTaskItem key={todo_task.id} todo_task={todo_task} />
                ));

                for (let i = 0; i < tasks.length; i++) {
                    if (tasks[i].props.todo_task.status === "TO_DO") {
                        todoItems.push(tasks[i]);
                    }

                    if (tasks[i].props.todo_task.status === "IN_PROGRESS") {
                        inProgressItems.push(tasks[i]);
                    }

                    if (tasks[i].props.todo_task.status === "DONE") {
                        doneItems.push(tasks[i]);
                    }
                }

                return (
                    <React.Fragment>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-primary text-white">
                                            <h3>Task Item</h3>
                                        </div>
                                    </div>

                                    {todoItems}
                                </div>
                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-warning text-white">
                                            <h3>In Progress</h3>
                                        </div>
                                    </div>

                                    {inProgressItems}
                                </div>
                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-success text-white">
                                            <h3>Complete</h3>
                                        </div>
                                    </div>

                                    {doneItems}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            }
        };

        BoardContent = BoardAlgorithm(todo_tasks);

        return (
            <div className="container">
                <Link to="/addTodoTask" className="btn btn-success mb-3">
                    <i className="fas fa-plus-circle"> Create Task Item</i>
                </Link>
                <br />
                <hr />
                {BoardContent}
            </div>
        );
    }
}

TodoBoard.propTypes = {
    getBacklog: PropTypes.func.isRequired,
    todo_tasks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    todo_tasks: state.todo_task
});

export default connect(
    mapStateToProps,
    { getBacklog }
)(TodoBoard);

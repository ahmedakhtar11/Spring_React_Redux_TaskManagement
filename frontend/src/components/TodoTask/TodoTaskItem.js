import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTodoTask } from "../../actions/TodoTaskActions";


class TodoTaskItem extends Component {

    onDeleteClick(todo_id) {
        this.props.deleteTodoTask(todo_id);
    }

    render() {
        const { todo_task } = this.props;
        return (
            <div className="card mb-1 bg-light">
                <div className="card-header text-primary">
                    ID: {todo_task.id}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{todo_task.summary}</h5>
                    <p className="card-text text-truncate ">
                        {todo_task.acceptanceCriteria}
                    </p>
                    <Link to={`updateTodoTask/${todo_task.id}`} className="btn btn-primary">
                        View / Update
                    </Link>

                    <button className="btn btn-danger ml-4"
                        onClick={this.onDeleteClick.bind(this, todo_task.id)}>
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}

TodoTaskItem.propTypes = {
    deleteTodoTask: PropTypes.func.isRequired
};

export default connect(null, { deleteTodoTask })(TodoTaskItem);
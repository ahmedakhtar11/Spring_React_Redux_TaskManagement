import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
    getTodoTask,
    addTodoTask
} from "../../actions/TodoTaskActions";

class UpdateTodoTask extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        const { id, summary, acceptanceCriteria, status } = nextProps.todo_task;

        this.setState({
            id,
            summary,
            acceptanceCriteria,
            status
        });
    }

    componentDidMount() {
        const { todo_id } = this.props.match.params;
        this.props.getTodoTask(todo_id);
    }

    onSubmit(e) {
        e.preventDefault();
        const updatedTask = {
            id: this.state.id,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status
        };

        this.props.addTodoTask(updatedTask, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="addTodoTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <a href="/" className="btn btn-light">
                                Back to Board
              </a>
                            <h4 className="display-4 text-center">
                                Add /Update Project Task
              </h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.summary
                                        })}
                                        name="summary"
                                        placeholder="Project Task summary"
                                        value={this.state.summary}
                                        onChange={this.onChange}
                                    />
                                    {errors.summary && (
                                        <div className="invalid-feedback">{errors.summary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        placeholder="Acceptance Criteria"
                                        name="acceptanceCriteria"
                                        value={this.state.acceptanceCriteria}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.onChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">To-do</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="DONE">Complete</option>
                                    </select>
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateTodoTask.propTypes = {
    todo_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getTodoTask: PropTypes.func.isRequired,
    addTodoTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    todo_task: state.todo_task.todo_task,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getTodoTask, addTodoTask }
)(UpdateTodoTask);
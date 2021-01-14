import axios from "axios";
import {
    GET_ERRORS,
    GET_TODO_TASKS,
    DELETE_TODO_TASK,
    GET_TODO_TASK
} from "./types";

export const addTodoTask = (todo_task, history) => async dispatch => {
    try {
        await axios.post("http://localhost:8080/api/board", todo_task);
        history.push("/");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getBacklog = () => async dispatch => {
    const res = await axios.get("http://localhost:8080/api/board/all");
    dispatch({
        type: GET_TODO_TASKS,
        payload: res.data
    });
};

export const deleteTodoTask = todo_id => async dispatch => {
    if (
        window.confirm(
            `You are deleting a task ${todo_id}, this action cannot be undone`
        )
    ) {
        await axios.delete(`http://localhost:8080/api/board/${todo_id}`);
        dispatch({
            type: DELETE_TODO_TASK,
            payload: todo_id
        });
    }
};

export const getTodoTask = (todo_id, history) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/api/board/${todo_id}`);
        dispatch({
            type: GET_TODO_TASK,
            payload: res.data
        });
    } catch (error) {
        history.push("/");
    }
};
import {
    GET_TODO_TASKS,
    DELETE_TODO_TASK,
    GET_TODO_TASK
} from "../actions/types";

const initialState = {
    todo_tasks: [],
    todo_task: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TODO_TASKS:
            return {
                ...state,
                todo_tasks: action.payload
            };

        case GET_TODO_TASK:
            return {
                ...state,
                todo_task: action.payload
            };

        case DELETE_TODO_TASK:
            return {
                ...state,
                todo_tasks: state.todo_tasks.filter(
                    todo_task => todo_task.id !== action.payload
                )
            };
        default:
            return state;
    }
}
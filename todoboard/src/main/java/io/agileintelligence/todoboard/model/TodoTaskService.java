package io.agileintelligence.todoboard.model;

import io.agileintelligence.todoboard.domain.TodoTask;
import io.agileintelligence.todoboard.repository.TodoTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoTaskService {

    @Autowired
    private TodoTaskRepository todoTaskRepository;

    public TodoTask saveOrUpdateTodoTask(TodoTask todoTask){

        if(todoTask.getStatus()==null || todoTask.getStatus()==""){
            todoTask.setStatus("TO_DO");
        }

        return todoTaskRepository.save(todoTask);
    }

    public Iterable<TodoTask> findAll(){
        return todoTaskRepository.findAll();
    }

    public TodoTask findById(Long id){
        return todoTaskRepository.getById(id);
    }

    public void delete(Long id){
        TodoTask todoTask = findById(id);
        todoTaskRepository.delete(todoTask);
    }
}

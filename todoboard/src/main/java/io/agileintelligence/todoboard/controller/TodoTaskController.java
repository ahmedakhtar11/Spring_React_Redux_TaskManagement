package io.agileintelligence.todoboard.controller;

import io.agileintelligence.todoboard.domain.TodoTask;
import io.agileintelligence.todoboard.model.TodoTaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/board")
@CrossOrigin
public class TodoTaskController {

    @Autowired
    private TodoTaskService todoTaskService;

    @PostMapping("")
    public ResponseEntity<?> addPTToBoard(@Valid @RequestBody TodoTask todoTask, BindingResult result){

        if(result.hasErrors()){

            Map<String, String> errorMap = new HashMap<>();

            for(FieldError error: result.getFieldErrors()){
                errorMap.put(error.getField(),error.getDefaultMessage());
            }

            return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
        }

        TodoTask newPT = todoTaskService.saveOrUpdateTodoTask(todoTask);

        return new ResponseEntity<TodoTask>(newPT, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<TodoTask> getAllPTs(){
        return todoTaskService.findAll();
    }

    @GetMapping("/{todo_id}")
    public ResponseEntity<?> getPTById(@PathVariable Long todo_id) {
        TodoTask todoTask = todoTaskService.findById(todo_id);
        return new ResponseEntity<TodoTask>(todoTask, HttpStatus.OK);
    }

    @DeleteMapping("/{todo_id}")
    public ResponseEntity<?> deleteTodoTask(@PathVariable Long todo_id){
        todoTaskService.delete(todo_id);

        return new ResponseEntity<String>( "Project Task Deleted", HttpStatus.OK);
    }
}

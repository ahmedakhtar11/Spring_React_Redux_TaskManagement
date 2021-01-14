package io.agileintelligence.todoboard.repository;

import io.agileintelligence.todoboard.domain.TodoTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoTaskRepository extends CrudRepository<TodoTask, Long> {

    TodoTask getById(Long id);
}

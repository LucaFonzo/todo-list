package org.lucafonzo.backend.repositories;

import org.lucafonzo.backend.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t JOIN Proyect p ON t.proyect = p  WHERE p.id = :id")
    List<Task> findAll(Long id);
}

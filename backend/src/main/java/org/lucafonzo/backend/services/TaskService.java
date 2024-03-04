package org.lucafonzo.backend.services;

import org.lucafonzo.backend.models.Task;
import org.lucafonzo.backend.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service("TaskService")
public class TaskService implements BaseService<Task>{

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Task> findAll() throws Exception {
        return taskRepository.findAll();
    }

    @Override
    public Task findById(Long id) throws Exception {
        Optional<Task> t = taskRepository.findById(id);
        return t.orElse(null);
    }

    @Override
    public Task save(Task entity) throws Exception {
        return taskRepository.save(entity);
    }

    @Override
    public Task update(Long id,Task entity) throws Exception {
        Optional<Task> aux = taskRepository.findById(id);
        if (aux.isEmpty()){
            return null;
        }
        Task t = aux.get();
        t.setName(entity.getName());
        t.setComplete(entity.isComplete());
        t.setRank(entity.getRank());
        t.setDescription(entity.getDescription());
        return taskRepository.save(t);
    }

    @Override
    public boolean delete(Long id) throws Exception {
        Optional<Task> op = taskRepository.findById(id);
        if (op.isEmpty()){
            return false;
        }
        Task t = op.get();
        taskRepository.delete(t);
        return true;
    }
}

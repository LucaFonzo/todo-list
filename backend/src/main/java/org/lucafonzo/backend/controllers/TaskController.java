package org.lucafonzo.backend.controllers;


import org.lucafonzo.backend.models.Proyect;
import org.lucafonzo.backend.models.Task;
import org.lucafonzo.backend.models.dtos.RequestTaskDto;
import org.lucafonzo.backend.models.dtos.ResponseTaskDto;
import org.lucafonzo.backend.services.ProyectService;
import org.lucafonzo.backend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;



@RestController
@RequestMapping("/api/task")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private ProyectService proyectService;


    @GetMapping("proyect/{proyectId}")
    public ResponseEntity<?> getAll(@PathVariable Long proyectId){
        try {
            ArrayList<ResponseTaskDto> response = new ArrayList<>();
            for (Task t:taskService.findAll(proyectId)){
                response.add(new ResponseTaskDto(t));
            }
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            System.out.printf(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new InternalError("Internal Server Error 505"));
        }
    }
    @PostMapping("")
    public ResponseEntity<?> insert(@RequestBody RequestTaskDto requestTaskDto){
        try {
            Proyect p = proyectService.findById(requestTaskDto.getIdProyect());
            if (p == null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Valid Proyect ID: " + requestTaskDto.getIdProyect());
            }
            Task t = new Task();
            t.setProyect(p);
            t.setName(requestTaskDto.getName());
            t.setDescription(requestTaskDto.getDescription());
            t.setRank(requestTaskDto.getRank());
            t.setComplete(false);
            System.out.printf(t.toString());
            ResponseTaskDto response = new ResponseTaskDto(taskService.save(t));
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch (Exception e){
            System.out.printf(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server Error 500");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody RequestTaskDto entity){
        try {
            Task aux = new Task();
            aux.setName(entity.getName());
            aux.setComplete(entity.isComplete());
            aux.setRank(entity.getRank());
            aux.setDescription(entity.getDescription());
            Task t = taskService.update(id,aux);
            if (t == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("404 Not Found a Task with ID " + id);
            }
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseTaskDto(t));
        }catch (Exception e){
            System.out.printf(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("500 Server Error");
        }
    }
    @GetMapping( "/{id}")
    public ResponseEntity<?> get(@PathVariable Long id){
        try {
            Task t = taskService.findById(id);
            if (t == null){
                return ResponseEntity.status(404).body("404 NOT FOUND ID: " + id);
            }
            return ResponseEntity.status(200).body(new ResponseTaskDto(t));
        }catch (Exception e){
            System.out.printf(e.toString());
            return ResponseEntity.status(400).body("400 BAD REQUEST");
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            Task result = taskService.delete(id);
            System.out.println(result);
            if (result == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found A Task With ID: " + id);
            }
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseTaskDto(result));
        }catch (Exception e){
            System.out.printf(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("500 Interval Server Error");
        }
    }
}

package org.lucafonzo.backend.controllers;

import org.lucafonzo.backend.models.Proyect;
import org.lucafonzo.backend.models.Task;
import org.lucafonzo.backend.models.dtos.RequestProyectDto;
import org.lucafonzo.backend.models.dtos.ResponseProyectDto;
import org.lucafonzo.backend.services.ProyectService;
import org.lucafonzo.backend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/proyect")
public class ProyectController {

    @Autowired
    private ProyectService proyectService;
    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        try {
            ArrayList<ResponseProyectDto> response = new ArrayList<>();
            for (Proyect p:proyectService.findAll()){
                response.add(new ResponseProyectDto(p));
            }
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            System.out.printf(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("500 Internal Server Error");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id){
        try {
            Proyect p = proyectService.findById(id);
            if (p == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("404 Not Found Proyect With ID: " + id);
            }
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseProyectDto(p));
        }catch (Exception e){
            System.out.printf(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("500 Internal Server Error");
        }
    }
    @PostMapping
    public ResponseEntity<?> insert(@RequestBody RequestProyectDto request){
        try {
            Proyect p = new Proyect();
            p.setName(request.getName());
            Set<Task> taskSet = new HashSet<>();
            System.out.println();
            if (request.getIdsTask() !=  null){
                for (Long idTask:request.getIdsTask()){
                    Task aux = taskService.findById(idTask);
                    taskSet.add(aux);
                }
                p.setTasks(taskSet);
            }
            ResponseProyectDto response = new ResponseProyectDto(proyectService.save(p));
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch (Exception e){
            System.out.printf(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("500 Server Error");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody RequestProyectDto request,@PathVariable Long id){
        try {
            Proyect p = new Proyect();
            p.setName(request.getName());
            Set<Task> taskSet = new HashSet<>();
            System.out.println();
            if (request.getIdsTask() !=  null){
                for (Long idTask:request.getIdsTask()){
                    Task aux = taskService.findById(idTask);
                    taskSet.add(aux);
                }
                p.setTasks(taskSet);
            }
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseProyectDto(this.proyectService.update(id,p)));
        }catch (Exception e){
            System.out.printf(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("500 Internal Server Error");
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            boolean result = this.proyectService.delete(id);
            if (result){
                return ResponseEntity.status(HttpStatus.OK).body("Proyect With ID: " + id + " deleted");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("404 Not Found A Proyect With ID: " + id);
        }catch (Exception e){
            System.out.println(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("500 Internal Server Error");
        }
    }
}

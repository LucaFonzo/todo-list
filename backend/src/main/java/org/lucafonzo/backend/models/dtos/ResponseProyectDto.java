package org.lucafonzo.backend.models.dtos;

import lombok.Getter;
import org.lucafonzo.backend.models.Proyect;
import org.lucafonzo.backend.models.Task;

import java.util.ArrayList;

@Getter
public class ResponseProyectDto {

    private Long id;
    private String name;
    private ArrayList<Long> idsTasks;

    public ResponseProyectDto(Proyect p){
        this.id = p.getId();
        this.name = p.getName();
        this.idsTasks = new ArrayList<>();
        for (Task t:p.getTasks()){
            idsTasks.add(t.getId());
        }
    }
}

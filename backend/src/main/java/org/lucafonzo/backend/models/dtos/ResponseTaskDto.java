package org.lucafonzo.backend.models.dtos;


import lombok.Getter;
import org.lucafonzo.backend.models.Task;

@Getter
public class ResponseTaskDto {
    private Long id;
    private String name;
    private String description;
    private Integer rank;
    private boolean isComplete;
    private Long idProyect;

    public ResponseTaskDto(Long id, String name, String description, Integer rank, boolean isComplete, Long idProyect) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rank = rank;
        this.isComplete = isComplete;
        this.idProyect = idProyect;
    }
    public ResponseTaskDto(Task t){
        this.id = t.getId();
        this.name = t.getName();
        this.description = t.getDescription();
        this.rank = t.getRank();
        this.isComplete = t.isComplete();
        this.idProyect = t.getProyect().getId();
    }
}

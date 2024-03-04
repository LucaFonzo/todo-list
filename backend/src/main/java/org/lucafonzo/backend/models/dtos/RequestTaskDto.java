package org.lucafonzo.backend.models.dtos;

import lombok.Getter;

@Getter
public class RequestTaskDto {

    private String name;
    private String description;
    private Integer rank;
    private boolean isComplete;
    private Long idProyect;

    public RequestTaskDto(String name,String description,Integer rank,boolean isComplete,Long idProyect){
        this.name = name;
        this.description = description;
        this.rank = rank;
        this.isComplete = isComplete;
        this.idProyect = idProyect;
    }

}

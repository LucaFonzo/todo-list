package org.lucafonzo.backend.models.dtos;

import lombok.Getter;
import org.lucafonzo.backend.models.Task;

import java.util.ArrayList;
import java.util.Set;

@Getter
public class RequestProyectDto {

    private String name;
    private ArrayList<Long> idsTask;

    @Override
    public String toString() {
        return "RequestProyectDto{" +
                "name='" + name + '\'' +
                ", taskSet=" + idsTask +
                '}';
    }
}

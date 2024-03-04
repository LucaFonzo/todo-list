package org.lucafonzo.backend.models;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Proyect {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String name;

    @OneToMany(mappedBy = "proyect")
    private Set<Task> tasks;

    public Proyect(){
        this.tasks = new HashSet<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    @Override
    public String toString() {
        ArrayList<Long> tasksId = new ArrayList<>();
        for (Task t:this.tasks){
            tasksId.add(t.getId());
        }
        return "Proyect{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", tasks=" + tasksId +
                '}';
    }
}

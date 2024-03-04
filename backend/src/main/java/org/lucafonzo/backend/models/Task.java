package org.lucafonzo.backend.models;


import jakarta.persistence.*;

@Entity
@Table(name = "TASK")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String name;
    @Column
    private String description;
    @Column
    private Integer rank;
    @Column
    private boolean isComplete;
    @ManyToOne
    @JoinColumn(name = "proyect_id",nullable = true)
    private Proyect proyect;

    public Proyect getProyect() {
        return proyect;
    }

    public void setProyect(Proyect proyect) {
        this.proyect = proyect;
    }

    public Task(Long id, String name, String description, Integer rank){
        this.id = id;
        this.name = name;
        this.description = description;
        this.rank = rank;
        this.isComplete = false;
        this.proyect = null;
    }
    public Task(){

    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public boolean isComplete() {
        return isComplete;
    }

    public void setComplete(boolean complete) {
        isComplete = complete;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", rank=" + rank +
                ", isComplete=" + isComplete +
                ", proyect=" + proyect.getId() +
                '}';
    }
}

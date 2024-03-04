package org.lucafonzo.backend.repositories;

import org.lucafonzo.backend.models.Proyect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProyectRepository extends JpaRepository<Proyect,Long> {
}

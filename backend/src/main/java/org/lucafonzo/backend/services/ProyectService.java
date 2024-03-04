package org.lucafonzo.backend.services;

import org.lucafonzo.backend.models.Proyect;
import org.lucafonzo.backend.repositories.ProyectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("proyectService")
public class ProyectService implements BaseService<Proyect>{

    @Autowired
    private ProyectRepository proyectRepository;

    @Override
    public List<Proyect> findAll() throws Exception {
        return proyectRepository.findAll();
    }

    @Override
    public Proyect findById(Long id) throws Exception {
        Optional<Proyect> op = proyectRepository.findById(id);
        return op.orElse(null);
    }

    @Override
    public Proyect save(Proyect entity) throws Exception {
        return proyectRepository.save(entity);
    }

    @Override
    public Proyect update(Long id, Proyect entity) throws Exception {
        Optional<Proyect> op = proyectRepository.findById(id);
        if (op.isEmpty()){
            return null;
        }
        Proyect p = op.get();
        p.setName(entity.getName());
        return proyectRepository.save(p);
    }

    @Override
    public boolean delete(Long id) throws Exception {
        Optional<Proyect> op = proyectRepository.findById(id);
        if (op.isEmpty()){
            return false;
        }
        this.proyectRepository.delete(op.get());
        return true;
    }
}

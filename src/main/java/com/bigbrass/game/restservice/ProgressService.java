package com.bigbrass.game.restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProgressService {

    @Autowired
    ProgressRepository repository;

    public List<Progress> findByUserId(int userId) {
        return repository.findByUserId(userId);
    }

    public Progress startProgressBar(int barId) {
        Progress progressBar = new Progress(barId);
        Progress result = null;
        try {
            result = repository.save(progressBar);
        } catch(Exception e) {
            System.out.println(e);
        }
        return result;
    }
}

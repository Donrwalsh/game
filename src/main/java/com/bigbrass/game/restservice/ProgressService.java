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
}

package com.bigbrass.game.rest.service;

import com.bigbrass.game.rest.model.Completion;
import com.bigbrass.game.rest.repository.CompletionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CompletionService {

    @Autowired
    CompletionRepository completionRepository;

    public Completion getCompletions() {
        return completionRepository.findByUserId(1);
    }
}

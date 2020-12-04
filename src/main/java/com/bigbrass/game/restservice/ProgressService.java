package com.bigbrass.game.restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class ProgressService {

    @Autowired
    ProgressRepository progressRepository;

    @Autowired
    CompletionRepository completionRepository;

    public List<Progress> findByUserId(int userId) {
        return progressRepository.findByUserId(userId);
    }

    public Progress startProgressBar(int barId) {
        Progress progressBar = new Progress(barId);
        Progress result = null;
        try {
            result = progressRepository.save(progressBar);
        } catch(Exception e) {
            System.out.println(e);
        }
        return result;
    }

    public Completion getCompletions() {
        return completionRepository.findByUserId(1);
    }

    @Transactional
    public Completion completeProgressBar(int barId) {
        Progress progress = progressRepository.findByUserIdAndBarId(1, barId);
        if (progress.getEndTime().isBefore(LocalDateTime.now())) {
            progressRepository.deleteByUserIdAndBarId(1, barId);
            Completion completion = completionRepository.findByUserId(1);
            completion.setCount(completion.getCount() + 1);
            completionRepository.save(completion);
            return completion;
        } else {
            return null;
        }
    }
}

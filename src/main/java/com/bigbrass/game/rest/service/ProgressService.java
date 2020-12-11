package com.bigbrass.game.rest.service;

import com.bigbrass.game.rest.model.Bar;
import com.bigbrass.game.rest.model.Completion;
import com.bigbrass.game.rest.model.Progress;
import com.bigbrass.game.rest.model.RequestPojo;
import com.bigbrass.game.rest.repository.BarRepository;
import com.bigbrass.game.rest.repository.CompletionRepository;
import com.bigbrass.game.rest.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class ProgressService {

    @Autowired
    BarRepository barRepository;

    @Autowired
    ProgressRepository progressRepository;

    @Autowired
    CompletionRepository completionRepository;

    public List<Progress> findByUserId(int userId) {
        return progressRepository.findByUserId(userId);
    }

    public Progress findByUserIdAndBarId(int userId, int barId) {
        return progressRepository.findByUserIdAndBarId(userId, barId);
    }

    public void saveProgress(Progress progress) {
        progressRepository.save(progress);
    }

    public Progress startProgressBar(RequestPojo requestPojo) {
        Bar bar = barRepository.findByUserIdAndBarNum(requestPojo.getUserId(), requestPojo.getBarId());
        Progress progressBar = new Progress(bar);
        Progress result = null;
        try {
            result = progressRepository.save(progressBar);
        } catch(Exception e) {
            System.out.println(e);
        }
        return result;
    }

    @Transactional
    public Completion completeProgressBar(RequestPojo requestPojo) {
        Progress progress = progressRepository.findByUserIdAndBarId(requestPojo.getUserId(), requestPojo.getBarId());
        if (progress.getEndTime().minusSeconds(1L).isBefore(LocalDateTime.now())) {
            progressRepository.deleteByUserIdAndBarId(requestPojo.getUserId(), requestPojo.getBarId());
            Completion completion = completionRepository.findByUserId(requestPojo.getUserId());
            completion.setCount(completion.getCount() + 1);
            completionRepository.save(completion);
            return completion;
        } else {
            return null;
        }
    }
}

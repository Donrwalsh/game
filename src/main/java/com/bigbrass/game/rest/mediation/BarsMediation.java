package com.bigbrass.game.rest.mediation;

import com.bigbrass.game.rest.model.*;
import com.bigbrass.game.rest.service.BarService;
import com.bigbrass.game.rest.service.CompletionService;
import com.bigbrass.game.rest.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class BarsMediation {

    @Autowired
    BarService barService;

    @Autowired
    ProgressService progressService;

    @Autowired
    CompletionService completionService;

    public List<Bar> saveBars(List<Bar> bars) {
        return barService.saveBars(bars);
    }

    public Completion completeProgressBar(RequestPojo requestPojo) {
        return progressService.completeProgressBar(requestPojo.getUserId(), requestPojo.getBarId());
    }

    public Init generateInit(int userId) {
        Init init = new Init();
        init.setBars(barService.findByUserId(userId));
        init.setProgresses(progressService.findByUserId(userId));
        return init;
    }

    public Completion getCompletions(int userId) {
        return completionService.getCompletions(userId);
    }

    public List<Integer> resolveAuto(int userId) {
        List<Integer> result = new ArrayList<Integer>();
        List<Bar> bars = barService.findByUserId(userId);
        bars.forEach((bar) ->{
            if (bar.isAuto() && bar.getAutoCount() > 0) {
                Progress progress = progressService.findByUserIdAndBarId(userId, bar.getBarNum());
                if (progress == null) {
                    progress = progressService.startProgressBar(userId, bar.getBarNum());
                }
                LocalDateTime resultTime = progress.getEndTime();
                int completions = 0;
                int maxCompletions = bar.getAutoCount();
                while (maxCompletions > 0 && resultTime.isBefore(LocalDateTime.now())) {
                    resultTime = resultTime.plusSeconds(bar.getDurationSec());
                    completions++;
                    maxCompletions--;
                }
                progress.setEndTime(resultTime);
                progress.setStartTime(resultTime.minusSeconds(bar.getDurationSec()));
                progressService.saveProgress(progress);

                Completion completion = completionService.getCompletions(userId);
                completion.setCount(completion.getCount() + completions);
                completionService.saveCompletion(completion);
                result.add(completions);
            } else {
                result.add(0);
            }
        });
        return result;
    }

    public Progress startProgressBar(RequestPojo requestPojo) {
        return progressService.startProgressBar(requestPojo.getUserId(), requestPojo.getBarId());
    }
}

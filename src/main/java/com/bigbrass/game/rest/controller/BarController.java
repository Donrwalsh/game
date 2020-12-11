package com.bigbrass.game.rest.controller;

import com.bigbrass.game.rest.model.*;
import com.bigbrass.game.rest.service.BarService;
import com.bigbrass.game.rest.service.CompletionService;
import com.bigbrass.game.rest.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("/bars")
@Controller
public class BarController {

    @Autowired
    BarService barService;

    @Autowired
    ProgressService progressService;

    @Autowired
    CompletionService completionService;

    @RequestMapping("/{numericId:[\\d]+}")
    public ModelAndView bars(@PathVariable("numericId") int userId) {
        ModelAndView mv = new ModelAndView();

        List<Bar> bars = barService.findByUserId(userId);
        bars.forEach((bar) ->{
            if (bar.isAuto() && bar.getAutoCount() > 0) {
                Progress progress = progressService.findByUserIdAndBarId(userId, bar.getBarNum());
                LocalDateTime resultTime = progress.getEndTime();
                int completions = 1;
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
            }
        });

        mv.setViewName("bars");
        return mv;
    }

    @GetMapping("/init")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    Init initBars(@RequestParam int userId) {
        Init result = new Init();
        result.setBars(barService.findByUserId(userId));
        result.setProgresses(progressService.findByUserId(userId));
        return result;
    }

    @PostMapping("/begin")
    public ResponseEntity<?> beginBar(@RequestBody RequestPojo requestPojo) {
        Progress result = progressService.startProgressBar(requestPojo);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
    }

    @GetMapping("/completions")
    public ResponseEntity<?> completions(@RequestParam int userId) {
        return new ResponseEntity<>(completionService.getCompletions(userId), HttpStatus.OK);
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeBar(@RequestBody RequestPojo requestPojo) {
        Completion result = progressService.completeProgressBar(requestPojo);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitBar(@RequestBody List<Bar> barDetails) {
        List<Bar> barResult = barService.saveBars(barDetails);
        return new ResponseEntity<>(barResult, HttpStatus.CREATED);
    }
}

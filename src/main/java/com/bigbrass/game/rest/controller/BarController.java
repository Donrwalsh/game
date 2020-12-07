package com.bigbrass.game.rest.controller;

import com.bigbrass.game.rest.model.Completion;
import com.bigbrass.game.rest.model.Progress;
import com.bigbrass.game.rest.model.RequestPojo;
import com.bigbrass.game.rest.service.CompletionService;
import com.bigbrass.game.rest.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BarController {

    @Autowired
    ProgressService progressService;

    @Autowired
    CompletionService completionService;

    @GetMapping("/bars")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    List<Progress> bars() {return progressService.findByUserId(1);}

    @PostMapping("/begin")
    public ResponseEntity<?> beginBar(@RequestBody RequestPojo request) {
        Progress result = progressService.startProgressBar(request.getBarId());
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
    }

    @GetMapping("/completions")
    public ResponseEntity<?> completions() {
        return new ResponseEntity<>(completionService.getCompletions(), HttpStatus.OK);
    }

    @GetMapping("/complete")
    public ResponseEntity<?> completeBar(@RequestParam int barId) {
        Completion result = progressService.completeProgressBar(barId);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }
}

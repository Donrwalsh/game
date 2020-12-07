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
    List<Progress> bars(@RequestParam int userId) {return progressService.findByUserId(userId);}

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
}

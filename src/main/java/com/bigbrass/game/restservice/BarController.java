package com.bigbrass.game.restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BarController {

    @Autowired
    ProgressService service;

    @GetMapping("/bars")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    List<Progress> bars() {return service.findByUserId(1);}

    @GetMapping("/start")
    public ResponseEntity<?> startBar(@RequestParam int barId) {
        Progress result = service.startProgressBar(barId);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
    }
}

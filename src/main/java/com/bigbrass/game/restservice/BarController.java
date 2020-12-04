package com.bigbrass.game.restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BarController {

    @Autowired
    ProgressService service;

    @GetMapping("/bars")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    List<Progress> bars() {return service.findByUserId(1);}
}

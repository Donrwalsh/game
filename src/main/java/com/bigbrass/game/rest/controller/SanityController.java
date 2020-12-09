package com.bigbrass.game.rest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/sanity")
public class SanityController {

    @GetMapping("/check")
    public String sanityCheck() {
        return "Hello World";
    }

    @GetMapping("/time")
    public LocalDateTime timeCheck() {return LocalDateTime.now();}

}

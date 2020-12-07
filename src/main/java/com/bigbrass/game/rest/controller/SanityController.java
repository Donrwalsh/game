package com.bigbrass.game.rest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SanityController {

    @GetMapping("/sanity-check")
    public String sanityCheck() {
        return "Hello World";
    }
}

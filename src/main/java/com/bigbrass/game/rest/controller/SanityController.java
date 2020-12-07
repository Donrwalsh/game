package com.bigbrass.game.rest.controller;

import com.bigbrass.game.rest.model.Completion;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sanity")
public class SanityController {

    @GetMapping("/check")
    public String sanityCheck() {
        return "Hello World";
    }

    @GetMapping("/completion-item")
    public Completion completionItem() {
        return new Completion(1);
    }

}

package com.bigbrass.game.restservice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BarController {

    @GetMapping("/test")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    Payload test() {return new Payload(5);}
}

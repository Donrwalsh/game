package com.bigbrass.game.rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Controller
@RequestMapping("/heartbeat")
public class HeartbeatController {

    @GetMapping("/time")
    @ResponseBody
    public LocalDateTime timeCheck() {return LocalDateTime.now();}
}

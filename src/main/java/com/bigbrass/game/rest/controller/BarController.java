package com.bigbrass.game.rest.controller;

import com.bigbrass.game.rest.mediation.BarsMediation;
import com.bigbrass.game.rest.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RequestMapping("/bars")
@Controller
public class BarController {

    @Autowired
    BarsMediation barsMediation;

    @RequestMapping("/{numericId:[\\d]+}")
    public ModelAndView bars(@PathVariable("numericId") int userId) {
        List<Integer> autoCompletions = barsMediation.resolveAuto(userId);
        ModelAndView mv = new ModelAndView();
        mv.addObject("autoCompletions", autoCompletions);
        mv.addObject("barsActiveSetting", "active");
        mv.addObject("pageTitle", "GCL - Bars");
        mv.setViewName("bars");
        return mv;
    }

    @GetMapping("/init")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    Init initBars(@RequestParam int userId) {
        return barsMediation.generateInit(userId);
    }

    @PostMapping("/begin")
    public ResponseEntity<?> beginBar(@RequestBody RequestPojo requestPojo) {
        Progress result = barsMediation.startProgressBar(requestPojo);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
    }

    @GetMapping("/completions")
    public ResponseEntity<?> completions(@RequestParam int userId) {
        return new ResponseEntity<>(barsMediation.getCompletions(userId), HttpStatus.OK);
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeBar(@RequestBody RequestPojo requestPojo) {
        Completion result = barsMediation.completeProgressBar(requestPojo);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitBar(@RequestBody List<Bar> barDetails) {
        List<Bar> barResult = barsMediation.saveBars(barDetails);
        return new ResponseEntity<>(barResult, HttpStatus.CREATED);
    }
}

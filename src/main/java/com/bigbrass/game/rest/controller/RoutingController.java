package com.bigbrass.game.rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class RoutingController {

    @GetMapping("/")
    public ModelAndView main(Model model) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("home");
        return mv;
    }
}

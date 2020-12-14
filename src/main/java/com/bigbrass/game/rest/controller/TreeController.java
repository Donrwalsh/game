package com.bigbrass.game.rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/tree")
@Controller
public class TreeController {

    @RequestMapping("")
    public ModelAndView tree() {
        ModelAndView mv = new ModelAndView();
        mv.addObject("treeActiveSetting", "active");
        mv.setViewName("tree");
        return mv;
    }
}

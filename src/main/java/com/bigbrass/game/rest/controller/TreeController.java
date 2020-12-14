package com.bigbrass.game.rest.controller;

import com.bigbrass.game.rest.mediation.TreeMediation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/tree")
@Controller
public class TreeController {

    @Autowired
    TreeMediation treeMediation;

    @RequestMapping("")
    public ModelAndView tree() {
        ModelAndView mv = new ModelAndView();
        mv.addObject("treeActiveSetting", "active");
        mv.addObject("pageTitle", "GCL - Tree");
        mv.addObject("init", treeMediation.generateInit());
        mv.setViewName("tree");
        return mv;
    }

}

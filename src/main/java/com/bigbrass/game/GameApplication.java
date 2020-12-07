package com.bigbrass.game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Configuration
@EnableAutoConfiguration
@ComponentScan("com.bigbrass.game")
@Controller
public class GameApplication {

	@RequestMapping("/")
	public String index() {
		return "index.html";
	}

	public static void main(String[] args) {
		SpringApplication.run(GameApplication.class, args);
	}

}
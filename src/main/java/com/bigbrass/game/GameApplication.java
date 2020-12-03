package com.bigbrass.game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
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
package dev.borczeangelov.poc.springboot.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import dev.borczeangelov.poc.springboot.dto.Hello;
import dev.borczeangelov.poc.springboot.dto.User;

@Controller
public class WebChatController {

    @MessageMapping("/hello")
    @SendTo("/topic/hi")
    public Hello greeting(User user) throws Exception {
        return new Hello("Hi, " + user.getName() + "!");
    }
}
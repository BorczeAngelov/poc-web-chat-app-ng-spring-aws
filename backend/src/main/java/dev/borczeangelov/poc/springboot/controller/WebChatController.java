package dev.borczeangelov.poc.springboot.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import dev.borczeangelov.poc.springboot.dal.InMemoryData;
import dev.borczeangelov.poc.springboot.dto.Message;
import dev.borczeangelov.poc.springboot.dto.MessageBoard;

@Controller
public class WebChatController {

    @MessageMapping("/api/ws/send-message")
    @SendTo("/api/ws/send-message-response")
    public MessageBoard postMessage(Message newMessage) {
        return InMemoryData.AddMessage(newMessage);
    }
}
package dev.borczeangelov.poc.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.borczeangelov.poc.springboot.dal.InMemoryData;
import dev.borczeangelov.poc.springboot.dto.Message;
import dev.borczeangelov.poc.springboot.dto.MessageBoard;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MessageBoardController {

    @RequestMapping(value = "/api/messageboard/getmessageboard")
    public MessageBoard getMessageBoard() {
        return InMemoryData.MessageBoard;
    }

    @PostMapping(value = "/api/messageboard/postmessage")
    public MessageBoard postMessage(@RequestBody Message newMessage) {
        return InMemoryData.AddMessage(newMessage);
    }

    @RequestMapping(value = "/api/messageboard/clearmessageboard")
    public MessageBoard clearMessageBoard() {
        return InMemoryData.clearMessageBoard();
    }
}
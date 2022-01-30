package dev.borczeangelov.poc.springboot.dto;

public class MessageBoard {
    private Message[] messages;

    public MessageBoard(Message[] messages) {
        this.messages = messages;
    }

    public Message[] getMessages() {
        return messages;
    }

    public void setMessages(Message[] messages) {
        this.messages = messages;
    }
}
package dev.borczeangelov.poc.springboot.dal;

import java.time.LocalTime;
import java.util.Arrays;

import dev.borczeangelov.poc.springboot.dto.Message;
import dev.borczeangelov.poc.springboot.dto.MessageBoard;

public class InMemoryData {

    public static MessageBoard MessageBoard = InitialiseMessageBoard();

    private static MessageBoard InitialiseMessageBoard() {
        LocalTime localTime = LocalTime.now();
        String title = "Server generated message board." +
                " LocalTime = " + localTime;

        Message[] messages = new Message[] {
                new Message(0, "Cloud Server", "Hi, this is the first message from the cloud", localTime)
        };

        return new MessageBoard(title, messages);
    }

    public static MessageBoard AddMessage(Message newMessage) {
        newMessage.setId(MessageBoard.getMessages().length);
        newMessage.setTimeStamp(LocalTime.now());

        Message[] oldMessages = MessageBoard.getMessages();
        Message[] newMessages = Arrays.copyOf(oldMessages, oldMessages.length + 1);
        newMessages[oldMessages.length] = newMessage;
        MessageBoard.setMessages(newMessages);

        return MessageBoard;
    }

    public static MessageBoard clearMessageBoard() {
        MessageBoard.setMessages(new Message[0]);
        return MessageBoard;
    }
}

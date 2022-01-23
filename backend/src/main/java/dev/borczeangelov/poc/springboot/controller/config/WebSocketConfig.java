package dev.borczeangelov.poc.springboot.controller.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {    

    // Endpoint for client registry
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/socket-registry")
                .setAllowedOrigins("http://localhost:4200")
                .withSockJS();
    }


    // Endpoint for client topic subscription
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        // One channel:
        config.enableSimpleBroker("/api/ws");

        // Further channels:
        // registry.enableSimpleBroker("/api/ws", "/another-channel", "...");
    }
}

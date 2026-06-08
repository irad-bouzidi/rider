package com.ridesharing.user.event;

import com.ridesharing.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserEventConsumer {

    private final UserService userService;

    @RabbitListener(queues = "${rabbitmq.queue.user:user.queue}")
    public void handleUserRegistered(Map<String, Object> event) {
        log.info("Received UserRegistered event: {}", event);
        UUID userId = UUID.fromString((String) event.get("userId"));
        String email = (String) event.get("email");
        String fullName = (String) event.getOrDefault("fullName", "");
        String phone = (String) event.getOrDefault("phone", "");

        userService.createProfile(userId, fullName, email, phone);
        log.info("Created profile for userId={}", userId);
    }
}

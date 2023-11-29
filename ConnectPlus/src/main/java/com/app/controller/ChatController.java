package com.app.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.app.modal.Messages;

@Controller
public class ChatController {

	@SendTo("/topic/public")
	@MessageMapping("/chat.register")
	public Messages register(@Payload Messages message, SimpMessageHeaderAccessor headerAccesor) {
		System.out.println(message);
		headerAccesor.getSessionAttributes().put("username", message.getSender());
		return message;
	}
	@SendTo("/topic/public")
	@MessageMapping("/chat.send")
	public Messages sendMessage(@Payload Messages message) {
		System.out.println(message);
		return message;
	}
	
}

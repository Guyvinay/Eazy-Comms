package com.app.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.app.modal.Greeting;
import com.app.modal.HelloMessage;

@Controller
public class GreetingController  {

	
	@MessageMapping("/hello")
	  @SendTo("/topic/greetings")
	  public Greeting greeting(HelloMessage message) throws Exception {
	    Thread.sleep(1000); // simulated delay
	    return new Greeting(HtmlUtils.htmlEscape(message.getName()));
	  }
	
}

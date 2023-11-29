var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var username = null;
var stompClient = null;

//Entering Username


function connect(event){
	event.preventDefault();
	username = document.querySelector('#name').value.trim();
	//console.log(username);
	
	if(username){		
	   
	   chatPage.classList.remove('hidden');
	   
	   var socket = new SockJS('/connectPlus');
	   stompClient = Stomp.over(socket);
	   
	   stompClient.connect({},onConneced, onError);
	  
	   
	}
	
}

function onConneced(){
	
	stompClient.subscribe('/topic/public',onMessageReceived)
	
	stompClient.send(
		'/app/chat.register',
		{},
		JSON.stringify({sender:username,type:'JOIN'})
	);
	connectingElement.classList.add('hidden');
}

function onError(){}

function onMessageReceived(payload){
	console.log("HIII");
	console.log(payload)
}

function send(event){
	event.preventDefault();
	var messageContent = messageInput.value.trim();
	
	if(messageContent && stompClient){
		var chatMessage = {
			sender : username,
			content : messageContent,
			type : 'CHAT'
		};
		
		stompClient.send(
			'app/chat.send',
			{},
			JSON.stringify(chatMessage)
			);
			messageInput.value = '';
	}
	console.log(chatMessage);
	console.log(stompClient);
}

usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', send, true)


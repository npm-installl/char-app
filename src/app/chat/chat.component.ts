import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
// export class ChatComponent implements OnInit {
//   messages: { user: string, message: string }[] = [];
//   messageContent: string | undefined;
//   user: string = 'User' + Math.floor(Math.random() * 1000);

//   constructor(private chatService: ChatService) { }

//   ngOnInit() {
//     this.fetchMessages();
//     console.log("calling ngOnInit...")
//     this.chatService.receiveMessages().subscribe((message) => {
//       console.log("this is messg",this.messages,message)
//       this.messages.push(message);
      
//     });
//   }

//   fetchMessages() {
//     this.chatService.getMessages().subscribe((messages) => {
//       this.messages = messages;
//     });
//   }

//   sendMessage() {
//     if (this.messageContent) {
//       console.log("this is message content",this.messageContent)
//       this.chatService.sendMessage({ user: this.user, message: this.messageContent });
//       this.messageContent = '';
//     }
//   }
// }

export class ChatComponent implements OnInit {
  messages: { room: string, user: string, message: string }[] = [];
  messageContent: string;
  user: string = 'User' + Math.floor(Math.random() * 1000);
  room: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.receiveMessages().subscribe((message) => {
      console.log("mssg",message)
      if (message.room === this.room) {
        this.messages.push(message);
      }
    });
  }

  joinRoom() {
    if (this.room) {
      this.chatService.joinRoom(this.room);
      this.fetchMessages();
    }
  }

  sendMessage() {
    if (this.messageContent && this.room) {
      this.chatService.sendMessage({ room: this.room, user: this.user, message: this.messageContent });
      this.messageContent = '';
    }
  }

  fetchMessages() {
    if (this.room) {
      this.chatService.getMessages(this.room).subscribe((messages) => {
        console.log("this --- ",messages)
        this.messages = messages;
      });
    }
  }
}
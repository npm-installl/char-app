import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// export class ChatService {
  
//   constructor(private http: HttpClient) { }

//   private apiUrl = 'http://localhost:5000/messages'; // HTTP API endpoint to fetch messages
//   private socket = io('http://localhost:5000');

//   sendMessage(message: { user: string, message: string }) {
//     this.socket.emit('sendMessage', message);
//   }

//   receiveMessages(): Observable<{ user: string, message: string }> {
//     return new Observable(observer => {
//       this.socket.on('receiveMessage', (data) => {
//         // console.log("this is data ------ ",data)
//         observer.next(data);
//       });
//     });
//   }

//   getMessages(): Observable<{ user: string, message: string }[]> {
//     return this.http.get<{ user: string, message: string }[]>(this.apiUrl);
//   }
// }

export class ChatService {
  // private socket = io('https://backend-7sofnw3pt-shahnwazs-projects.vercel.app'); // WebSocket server URL
  // // private apiUrl = 'https://backend-7sofnw3pt-shahnwazs-projects.vercel.app'; // HTTP API endpoint to fetch messages
  // private socket = io('https://chat-server-kappa-opal.vercel.app/'); // WebSocket server URL
  // private apiUrl = 'https://chat-server-kappa-opal.vercel.app/messages'; // HTTP API endpoint to fetch messages
  private socket = io('chat-server-git-main-sks-projects-e9394d4c.vercel.app'); // WebSocket server URL
  private apiUrl = 'chat-server-git-main-sks-projects-e9394d4c.vercel.app/messages'; // HTTP API endpoint to fetch messages
  // private socket = io('http://localhost:5000'); // WebSocket server URL
  // private apiUrl = 'http://localhost:5000/messages'; // HTTP API endpoint to fetch messages

  constructor(private http: HttpClient) { }

  joinRoom(room: string) {
    this.socket.emit('joinRoom', room);
  }

  sendMessage(message: { room: string, user: string, message: string }) {
    this.socket.emit('sendMessage', message);
  }

  receiveMessages(): Observable<{ room: string, user: string, message: string }> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', (data) => {
        observer.next(data);
      });
    });
  }

  getMessages(room: string): Observable<{ room: string, user: string, message: string }[]> {
    return this.http.get<{ room: string, user: string, message: string }[]>(`${this.apiUrl}?room=${room}`);
  }
}

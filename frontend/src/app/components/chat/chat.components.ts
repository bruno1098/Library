import { Component, OnInit, ViewChild, ElementRef, signal, computed } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { trigger, transition, style, animate } from '@angular/animations';

interface ChatMessage {
  username: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'system';
}

@Component({
  selector: 'app-chat',
  template: `
    <div class="chat-page">
      <div class="chat-container" [@fadeAnimation]>
        <div class="chat-header">
          <h2><i class="fas fa-comments"></i> Chat da Biblioteca</h2>
          <div class="online-users">
            <i class="fas fa-users"></i> {{ onlineCount() }} online
          </div>
        </div>
        
        <div class="messages" #messageContainer>
          <div *ngFor="let message of messages()" 
               class="message"
               [ngClass]="{'system-message': message.type === 'system', 
                          'user-message': message.type === 'message'}"
               [@messageAnimation]>
            <div class="message-header">
              <strong>{{ message.username }}</strong>
              <small>{{ message.timestamp | date:'HH:mm' }}</small>
            </div>
            <div class="message-content">{{ message.message }}</div>
          </div>
        </div>

        <div class="input-container">
          <input [(ngModel)]="newMessage" 
                 (keyup.enter)="sendMessage()" 
                 placeholder="Digite sua mensagem..."
                 [disabled]="!username"
                 class="message-input">
          <button (click)="sendMessage()" 
                  [disabled]="!username || !newMessage.trim()"
                  class="send-button">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chat-page {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .chat-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      overflow: hidden;
      height: 600px;
      display: flex;
      flex-direction: column;
    }
    .chat-header {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .chat-header h2 {
      margin: 0;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .online-users {
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .messages {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .message {
      padding: 0.75rem 1rem;
      border-radius: 8px;
      max-width: 80%;
    }
    .system-message {
      background-color: #f8f9fa;
      color: #666;
      font-style: italic;
      align-self: center;
      font-size: 0.9rem;
    }
    .user-message {
      background-color: #e3f2fd;
      align-self: flex-start;
    }
    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }
    .message-content {
      word-break: break-word;
    }
    .input-container {
      padding: 1rem;
      background-color: #f8f9fa;
      border-top: 1px solid #eee;
      display: flex;
      gap: 0.5rem;
    }
    .message-input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s;
    }
    .message-input:focus {
      outline: none;
      border-color: #1e3c72;
      box-shadow: 0 0 0 2px rgba(30,60,114,0.1);
    }
    .send-button {
      background-color: #1e3c72;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      transition: all 0.3s;
    }
    .send-button:hover:not(:disabled) {
      background-color: #2a5298;
      transform: translateY(-1px);
    }
    .send-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ChatComponent implements OnInit {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  
  private socket: Socket;
  messages = signal<ChatMessage[]>([]);
  onlineUsers = signal<Set<string>>(new Set());
  onlineCount = computed(() => this.onlineUsers().size);
  
  username: string = '';
  newMessage: string = '';

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.username = prompt('Digite seu nome para entrar no chat:') || 'Anônimo';
    this.socket.emit('join', this.username);

    this.socket.on('message', (message: ChatMessage) => {
      this.messages.update(msgs => [...msgs, { ...message, type: 'message' }]);
      this.scrollToBottom();
    });

    this.socket.on('userJoined', (username: string) => {
      this.messages.update(msgs => [
        ...msgs, 
        {
          username: 'Sistema',
          message: `${username} entrou no chat`,
          timestamp: new Date(),
          type: 'system'
        }
      ]);
      this.onlineUsers.update(users => {
        const newUsers = new Set(users);
        newUsers.add(username);
        return newUsers;
      });
      this.scrollToBottom();
    });

    this.socket.on('userLeft', (username: string) => {
      this.messages.update(msgs => [
        ...msgs, 
        {
          username: 'Sistema',
          message: `${username} saiu do chat`,
          timestamp: new Date(),
          type: 'system'
        }
      ]);
      this.onlineUsers.update(users => {
        const newUsers = new Set(users);
        newUsers.delete(username);
        return newUsers;
      });
      this.scrollToBottom();
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.username) {
      this.socket.emit('message', this.newMessage);
      this.newMessage = '';
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const element = this.messageContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    });
  }
}
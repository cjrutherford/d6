import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { MessageType } from '../app';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: BehaviorSubject<MessageType[]> = new BehaviorSubject<MessageType[]>([
  ]);

  constructor() { }

  messages$(): Observable<MessageType[]> {
    return this.messages.asObservable();
  }

  addMessage(message: MessageType) {
    this.messages.next([...this.messages.getValue(), message]);
  }

  clearMessages() {
    this.messages.next([]);
  }

  dismiss(index: number) {
    console.log("Dismissing message at index:", index);
    const currentMessages = this.messages.getValue();
    // Ensure index is within bounds
    console.log("Current messages before dismissal:", currentMessages);
    if (index >= 0 && index < currentMessages.length) {
      console.log("Removing message:", currentMessages[index]);
      currentMessages.splice(index, 1);
      console.log("Current messages after dismissal:", currentMessages);
      this.messages.next([...currentMessages]);
      console.log("Messages after dismissal:", this.messages.getValue());
    }
  }
}

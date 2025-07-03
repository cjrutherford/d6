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
    const currentMessages = this.messages.getValue();
    // Ensure index is within bounds
    if (index >= 0 && index < currentMessages.length) {
      currentMessages.splice(index, 1);
      this.messages.next([...currentMessages]);
    }
  }
}

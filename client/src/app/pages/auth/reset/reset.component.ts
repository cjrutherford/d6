import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent {
  resetData = { oldPassword: '', newPassword: '', confirmNewPassword: '', email: '' };
  error: string = '';
  success: string = '';

  constructor(private readonly auth: AuthService, private readonly messageService: MessageService) {}

  reset() {
    if (this.resetData.newPassword !== this.resetData.confirmNewPassword) {
      this.error = 'New passwords do not match.';
      return;
    }
    this.auth.resetPassword(this.resetData).subscribe({
      next: () => {
        this.success = 'Password reset successful!';
        this.error = '';
      },
      error: err => this.messageService.addMessage({
        content: `${err.error?.message}:${err.error?.error ?? 'Reset failed.'}`,
        type: 'error'
      })
    });
  }
}

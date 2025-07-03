import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly auth: AuthService) {}

  canActivate(): boolean {
    const token = this.auth.getAuthToken();
    if (token) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}

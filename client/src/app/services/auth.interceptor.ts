import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('authToken')
  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error occurred:', error);
        if(error.status === 401 || error.status === 403) {
          // Handle unauthorized access, e.g., redirect to login
          console.error('Unauthorized request:', error);
          // Optionally, you can redirect to a login page or show a notification
          localStorage.removeItem('authToken');
          const router = inject(Router);
          router.navigate(['/auth/login']);
        }
        // Return an observable to satisfy the catchError contract
        return throwError(() => error);
      })
    );
  }
  return next(req);
};

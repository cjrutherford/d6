import { About } from './pages/about/about';
import { AuthGuard } from './services/auth.guard';
import { AuthPage } from './pages/auth/auth.page';
import { D4 } from './pages/d4/d4';
import { D6 } from './pages/d6/d6';
import { Feed } from './pages/feed/feed';
import { Help } from './pages/help/help';
import { Profile } from './pages/profile/profile';
import { Routes } from '@angular/router';
import { authRoutes } from './pages/auth/auth.routes';

export const routes: Routes = [
    { path: 'about', component: About },
    { path: 'daily4', component: D4, canActivate: [AuthGuard] },
    { path: 'daily6', component: D6, canActivate: [AuthGuard] },
    { path: '', component: Feed, canActivate: [AuthGuard] },
    { path: 'profile', component: Profile, canActivate: [AuthGuard] },
    // { path: 'help', component: Help, canActivate: [AuthGuard] },
    { path: 'auth', component: AuthPage, children: authRoutes},
    { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect to home for any unknown routes
];

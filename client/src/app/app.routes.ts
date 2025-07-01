import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { D4 } from './pages/d4/d4';
import { D6 } from './pages/d6/d6';
import { Feed } from './pages/feed/feed';
import { Profile } from './pages/profile/profile';
import { Help } from './pages/help/help';

export const routes: Routes = [
    { path: 'about', component: About },
    { path: 'daily4', component: D4 },
    { path: 'daily6', component: D6 },
    { path: 'feed', component: Feed },
    { path: 'profile', component: Profile },
    { path: 'help', component: Help }
];

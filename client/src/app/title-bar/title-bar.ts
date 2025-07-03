import { Component, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title-bar',
  imports: [CommonModule],
  templateUrl: './title-bar.html',
  styleUrl: './title-bar.scss'
})
export class TitleBar {

  navItems = [
    { label: 'About', route: '/about', icon: 'ℹ️ℹ'},
    { label: 'Daily 4', route: '/daily4', icon: '📅4' },
    { label: 'Daily 6', route: '/daily6', icon: '📅6' },
    { label: 'Feed', route: '/feed', icon: '📰' },
    { label: 'Profile', route: '/profile', icon: '👤' },
    { label: 'Help', route: '/help', icon: '❓' },
    { label: 'Authentication', route: '/auth', icon: '🔐' },
  ]

  constructor(private readonly router: Router) {}
  showNav = signal(false);

  toggleNav() {
    const newShow = !this.showNav();
    this.showNav.set(newShow);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  navigateHome() {
    this.router.navigate(['/']);
  }
}

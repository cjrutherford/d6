import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  /**
   * Variant of the loading animation: 'spinner', 'dots', 'bar'
   */
  @Input() variant: 'spinner' | 'dots' | 'bar' = 'spinner';
}

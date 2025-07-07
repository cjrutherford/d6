import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    // Capitalize first letter, then insert space before each uppercase letter (except the first)
    if (!value) return '';
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    return capitalized.replace(/([A-Z])/g, (match, p1, offset) => offset === 0 ? p1 : ' ' + p1);
  }

}

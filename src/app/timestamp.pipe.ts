import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timestamp', standalone: true })
export class timestampPipe implements PipeTransform {
  transform(value: any) {
    return value.toDate();
  }
}

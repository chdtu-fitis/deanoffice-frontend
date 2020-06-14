import {Pipe, PipeTransform} from "@angular/core";
import {Teacher} from "../models/Teacher";

@Pipe({
  name: 'shortened'
})
export class ShortenedPipe implements PipeTransform {
  transform(str: string): string {
    switch (str) {
      case 'диференційований залік': return 'диф.залік';
    }
    return str;
  }
}

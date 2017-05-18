import { Injectable } from '@angular/core';

@Injectable()
export class VigenereCrackService {

  constructor() { }

  repeatDistancesCount = function (text: string, sequenceLength: number): number[] {
    if (!text || !sequenceLength)
      return null;
    let repeats: number[] = [];
    for (let i = 0; i < text.length - sequenceLength + 1; i++) {
      let temp: string = text.substring(i, i + sequenceLength);
      for (let j: number = i + 1; j < text.length - sequenceLength + 1; j++) {
        let temp2: string = text.substring(j, j + sequenceLength);
        if (temp.toLowerCase() === temp2.toLowerCase()) {
          repeats.push(j - i);
        }
      }
    }
    return repeats;
  }
}

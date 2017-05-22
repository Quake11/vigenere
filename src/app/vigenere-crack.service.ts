import { Injectable } from '@angular/core';

@Injectable()
export class VigenereCrackService {

  constructor() { }

  // create array with numbers that represent distances between sequences  
  getRepeatDistancesCount(text: string, sequenceLength: number): number[] {
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

  // get gcd's from array of numbers
  getGCDS(repeats: number[]): number[] {
    if (!repeats)
      return null;
    let gcds: number[] = [];
    for (let i = 0; i < repeats.length; ++i) {
      gcds.push(this.gcd(repeats[i], repeats[i + 1]));
    }
    return gcds;
  }

  // sort array of gcd's, starting with most frequent gcd
  sortGcdsByFrequency(array) {
    if (!array)
      return null;
    let frequency = {};
    let result: any = [];
    array.forEach(function (value) { frequency[value] = 0; }); // fill array with zero frequency values

    let uniques = array.filter(function (value) {
      return ++frequency[value] == 1; // check if equal element already exists
    });

    uniques.sort(function (a, b) {
      return frequency[b] - frequency[a];
    });

    uniques.forEach(element => {
      result.push({
        'value': element,
        'frequency': frequency[element]
      });
    });
    return result;
  }



  splitTextWithKeyLen(text: string, keyLen: number): string[] {
    let result: string[] = [];
    for (let i = 0; i < text.length; i++) {
      typeof result[i % keyLen] === 'undefined' ? result[i % keyLen] = text[i] : result[i % keyLen] += text[i]; // hacky workaround when first element 'undefined' in array
    }
    return result;
  }

  analyseFrequency(text: string, alphabet: any) {
    if (!text)
      return null;

    let alphabetLength = alphabet.length;
    let frequencies: number[] = [];
    let textLength = text.length;

    for (let c in alphabet) {
      frequencies[alphabet[c]] = 0;
    }

    for (let i = 0; i < textLength; i++) {
      let c = text[i];
      frequencies[c]++;
    }
    return frequencies;
  }


  gcd = function (a, b) {
    if (!b)
      return a;
    return this.gcd(b, a % b);
  };
}

import { Injectable } from '@angular/core';
import { VigenereCipherService } from './vigenere-cipher.service';
import { CaesarCipherService } from './caesar-cipher.service';

@Injectable()
export class VigenereCrackService {

  constructor(
    private vigenereCipherService: VigenereCipherService,
    private caesarCipherService: CaesarCipherService
  ) { }

  // create array with numbers that represent distances between sequences
  getRepeatDistancesCount(text: string, sequenceLength: number): number[] {
    if (!text || !sequenceLength) {
      return null;
    }
    const repeats: number[] = [];
    for (let i = 0; i < text.length - sequenceLength + 1; i++) {
      const temp: string = text.substring(i, i + sequenceLength);
      for (let j: number = i + 1; j < text.length - sequenceLength + 1; j++) {
        const temp2: string = text.substring(j, j + sequenceLength);
        if (temp.toLowerCase() === temp2.toLowerCase()) {
          repeats.push(j - i);
        }
      }
    }
    return repeats;
  }

  // get gcd's from array of numbers
  getGCDS(repeats: number[]): number[] {
    if (!repeats) {
      return null;
    }
    const gcds: number[] = [];
    for (let i = 0; i < repeats.length; ++i) {
      gcds.push(this.gcd(repeats[i], repeats[i + 1]));
    }
    return gcds;
  }

  // sort array of gcd's, starting with most frequent gcd
  sortGcdsByFrequency(array) {
    if (!array) {
      return null;
    }
    const frequency = {};
    const result: any = [];
    array.forEach(function (value) { frequency[value] = 0; }); // fill array with zero frequency values

    const uniques = array.filter(function (value) {
      return ++frequency[value] === 1; // check if equal element already exists
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


  analyseFrequency(text: string, alphabet: any) {
    if (!text) {
      return null;
    }
    const alphabetLength = alphabet.length;
    const frequencies: number[] = [];
    const textLength = text.length;


    for (const c in alphabet) {
      if (alphabet.hasOwnProperty(c)) {
        frequencies[alphabet[c]] = 0;
      }
    }

    for (let i = 0; i < textLength; i++) {
      const c = text[i];
      frequencies[c]++;
    }
    return frequencies;
  }


  guessKey(text, keyLength, alphabetObj) {
    const keyShifts: number[] = []; // represent vigenere key as array of shifts
    const decodedParts: any[] = [];
    const alphabet = alphabetObj['alphabet'];
    const alphabetPopularLetter = alphabetObj['popular'];

    const caesarCryptograms = this.vigenereCipherService.splitTextWithKeyLen(text, keyLength);


    for (const crypt in caesarCryptograms) {
      if (caesarCryptograms.hasOwnProperty(crypt)) {
        const frequencies = this.analyseFrequency(caesarCryptograms[crypt], alphabet);
        const mostPopularLetter = this.getMostPopularLetter(frequencies); // most popular letter in encoded text

        // shift of most popular letter in encoded text
        const mostPopularLetterShift = this.vigenereCipherService.getShiftFromLetter(mostPopularLetter, alphabet);
        const popularLetterShift = this.vigenereCipherService.getShiftFromLetter(alphabetPopularLetter, alphabet);
        const shift: number = mostPopularLetterShift - popularLetterShift;
        keyShifts.push((shift + alphabet.length) % alphabet.length);
      }
    }
    return keyShifts;
  }



  getMostPopularLetter(frequencies) {
    return Object.keys(frequencies).reduce(function (a, b) { return frequencies[a] > frequencies[b] ? a : b; });
  }


  gcd = function (a, b) {
    if (!b) {
      return a;
    }
    return this.gcd(b, a % b);
  };
}

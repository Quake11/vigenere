import { Injectable } from '@angular/core';
import { VigenereCipherService } from './vigenere-cipher.service';
import { CaesarCipherService } from './caesar-cipher.service';

@Injectable()
export class VigenereCrackService {

  constructor(
    private vigenereCipherService: VigenereCipherService,
    private caesarCipherService: CaesarCipherService
  ) { }

  // function return array with numbers that represent distances between sequences
  // функция возвращает массив чисел, которые являются расстояниями между одинаковыми последовательностями текста
  getRepeatDistancesCount(text: string, sequenceLength: number): number[] {
    if (!text || !sequenceLength) {
      return null;
    }
    const repeats: number[] = [];
    for (let i = 0; i < text.length - sequenceLength + 1; i++) {
      const temp: string = text.substring(i, i + sequenceLength); // берём первую последовательность нужной длины
      for (let j: number = i + 1; j < text.length - sequenceLength + 1; j++) {
        const temp2: string = text.substring(j, j + sequenceLength); // вторая последовательность текста
        if (temp.toLowerCase() === temp2.toLowerCase()) { // сравнение найденных  последовательностей текста
          repeats.push(j - i); // добавляем расстояние между последовательностями в массив
        }
      }
    }
    return repeats;
  }

  // function returns gcd's array from array of distances
  // функция принимает расстояния между одинаковыми участками текста как массив чисел
  // и возвращает массив всех НОД для этих расстояний
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


    /*for (let i = 0; i < repeats.length; ++i) {
      for (let j = i + 1; j < repeats.length; ++j) {
        gcds.push(this.gcd(repeats[i], repeats[j]));
      }
    }*/


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

  // function returns associative array of letters and their frequencies
  // функция возвращает ассоциативный массив букв и их частот
  analyseFrequency(text: string, alphabet: any) {
    if (!text) {
      return null;
    }
    const alphabetLength = alphabet.length;
    const frequencies: number[] = [];
    const textLength = text.length;
    // создание массива со всеми буквами выбранного алфавита и заполнение их частот нулями
    for (const c in alphabet) {
      if (alphabet.hasOwnProperty(c)) {
        frequencies[alphabet[c]] = 0;
      }
    }
    // подсчёт частот букв из текста
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

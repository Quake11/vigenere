import { Injectable } from '@angular/core';
import { CaesarCipherService } from './caesar-cipher.service';


@Injectable()
export class VigenereCipherService {

  constructor(private caesarCipherService: CaesarCipherService) { }



  Cipher(text: string, keyShifts: number[], alphabet: string, encode: boolean): string {
    const timer = performance.now();
    const caesarCryptograms = this.splitTextWithKeyLen(text, keyShifts.length);

    const decodedParts: any[] = [];
    for (const key in keyShifts) {
      if (keyShifts.hasOwnProperty(key)) {
        decodedParts.push(this.caesarCipherService.caesarCipher(caesarCryptograms[key], keyShifts[key], alphabet, encode).split(''));
      }
    }
    const result = this.mergeDecryptedCaesarCryptograms(decodedParts, text.length);
    console.log('Расшифровка заняла ' + (performance.now() - timer) + ' мс.');
    return result;
  }

  // returns key as string
  getKeyFromShifts(shifts, alphabet): string {
    let result = '';
    for (let i = 0; i < shifts.length; i++) {
      result += this.getLetterFromShift(shifts[i], alphabet);
    }
    return result;
  }

  // returns key shifts from key
  getShiftsFromKey(key, alphabet): number[] {
    const keyShifts: number[] = []; // represent vigenere key as array of shifts
    for (let letter = 0; letter < key.length; letter++) {
      const shift = this.getShiftFromLetter(key[letter], alphabet);
      keyShifts.push((shift + alphabet.length) % alphabet.length);
    }
    return keyShifts;
  }

  getShiftFromLetter(letter, alphabet) {
    const shift: number = alphabet.indexOf(letter);
    return shift === -1 ? console.log('Буква не найдена в алфавите: ' + letter) : alphabet.indexOf(letter);
  }

  getLetterFromShift(shift, alphabet) {
    return alphabet[shift];
  }

  mergeDecryptedCaesarCryptograms(parts, textLength): string {
    let result = '';
    for (let i = 0; i < textLength; i++) {
      const partId = i % parts.length;
      result += parts[partId].shift();
    }
    return result;
  }


  splitTextWithKeyLen(text: string, keyLen: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < text.length; i++) {
      // hacky workaround when first element 'undefined' in array
      typeof result[i % keyLen] === 'undefined' ? result[i % keyLen] = text[i] : result[i % keyLen] += text[i];
    }
    return result;
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class CaesarCipherService {

  constructor() { }

  caesarCipher(ciphertext: string, shiftAmount: number, alphabet: string, encipher: boolean): string {
    shiftAmount = encipher ? -shiftAmount : shiftAmount;
    let plaintext = '';
    for (let i = 0; i < ciphertext.length; i++) {
      const cipherCharacterShift = alphabet.indexOf(ciphertext[i]);
      const shift: number = (alphabet.length + cipherCharacterShift - shiftAmount) % alphabet.length;
      plaintext += alphabet[shift];
    }
    return plaintext;
  }

}

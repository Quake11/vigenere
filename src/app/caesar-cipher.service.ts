import { Injectable } from '@angular/core';

@Injectable()
export class CaesarCipherService {

  constructor() { }

  caesarCipher = function (ciphertext: string, shiftAmount: number, alphabet: string, encipher: boolean) {
    shiftAmount = encipher ? -shiftAmount : shiftAmount;
    let plaintext: string = "";
    for (let i = 0; i < ciphertext.length; i++) {
      let cipherCharacterShift = alphabet.indexOf(ciphertext[i]);
      let shift: number = (alphabet.length + cipherCharacterShift - shiftAmount) % alphabet.length;
      plaintext += alphabet[shift];
    }
    return plaintext;
  }

}

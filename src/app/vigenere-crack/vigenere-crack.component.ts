import { Component, OnInit } from '@angular/core';
import { VigenereCrackService } from '../vigenere-crack.service';
import { CaesarCipherService } from '../caesar-cipher.service';
import { VigenereCipherService } from '../vigenere-cipher.service';
import { UtilsService } from '../utils.service';
import { LANGUAGES } from '../globals';

@Component({
  selector: 'app-vigenere-crack',
  templateUrl: './vigenere-crack.component.html',
  styleUrls: ['./vigenere-crack.component.css']
})

export class VigenereCrackComponent implements OnInit {

  LANGUAGES: typeof LANGUAGES = LANGUAGES;
  encoded_text: string;
  sequenceLength: number;
  keyLength: number;
  gcdList: any;
  deleteSymbols: boolean;
  test: string;
  selectedAlphabetId: number;
  decodedResult: string;
  guessedKey: string;

  constructor(
    private vigenereCrackService: VigenereCrackService,
    private caesarCipherService: CaesarCipherService,
    private vigenereCipherService: VigenereCipherService,
    private utilsService: UtilsService
  ) { }



  ngOnInit() {
    this.encoded_text = 'гксоцоуньйлвбдсауолнбппдроуомкпммимсасплоешньйтвёттвётмеёоенбкпвроезёмёлэептютпгпппчуиоееемамотьоарлптоофтппуаонпмиенланпмромуролрьтпмромутгоигшёйтомоноклёжблйзбкфтбвщитьгргаоьёлядйвтепнйбьлйппхпжйимищьпдйнптмишамсаоупсошицообьлоаннпгпксурнёеерфгйхфзоилогксеролинуткфлйсукбквылаёгподрпмоааппксыуаарёдлинигомотанидомогавымафвёншаоаевфмаодрпмоынищищкбмйппхпжймйнбрпгбоееуообьлуалжёкбкерфгйеггсяинпеурапэе';
    this.selectedAlphabetId = 0;
    this.sequenceLength = 3;
    this.deleteSymbols = true;
  }

  get langNames(): any {
    return this.LANGUAGES;
  }

  get currentAlphabetObject() {
    return this.LANGUAGES[this.selectedAlphabetId];
  }

  get currentAlphabet() {
    return this.currentAlphabetObject['alphabet'];
  }

  onEncodedTextChange(val) {
    if (val && this.deleteSymbols) {
      this.encoded_text = this.utilsService.filterEncodedText(val);
    }
    this.encoded_text = this.encoded_text.toLowerCase();
  }

  onDeleteSymbolsChange(checked) {
    if (checked) {
      this.encoded_text = this.utilsService.filterEncodedText(this.encoded_text);
    }
  }



  crackViginere() {
    this.setGcdList();
    const popularLetter = this.currentAlphabetObject['popular']; // getting most popular letter for current alphabet
    const popularLetterShift = this.currentAlphabet.indexOf(popularLetter); // getting shift of most popular letter in current alphabet

    // represent vigenere key as array of shifts
    const keyShifts: number[] = this.vigenereCrackService.guessKey(this.encoded_text, this.keyLength, this.currentAlphabetObject);

    this.decodedResult = this.vigenereCipherService.Cipher(this.encoded_text, keyShifts, this.currentAlphabet, false);
    this.setGuessedKey(keyShifts);
  }


  setGuessedKey(shifts) {
    this.guessedKey = this.vigenereCipherService.getKeyFromShifts(shifts, this.currentAlphabet);
  }

  onKeyLengthChange(val) {
    this.keyLength = val;
  }

  setGcdList() {
    const timer = performance.now();
    this.gcdList = this.vigenereCrackService.sortGcdsByFrequency(
      this.vigenereCrackService.getGCDS(
        this.repeatDistancesCount
      )
    );
    if (!this.gcdList[0]) {
      return null;
    }
    this.keyLength = this.keyLength ? this.keyLength : this.gcdList[0]['value'];
    console.log('Вычисления НОД заняли  ' + (performance.now() - timer) + ' мс.');
  }

  get maxGcd(): number {
    if (!this.gcdList || !this.gcdList[0]) {
      return null;
    }
    return this.gcdList[0]['value'];
  }

  get repeatDistancesCount() {
    return this.vigenereCrackService.getRepeatDistancesCount(this.encoded_text, this.sequenceLength);
  }
}

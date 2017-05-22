import { Component, OnInit } from '@angular/core';
import { VigenereCrackService } from '../vigenere-crack.service';
import { CaesarCipherService } from '../caesar-cipher.service';

var LANGUAGES: object[] = [
  { id: 0, name: "Русский", alphabet: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя", popular: "о" },
  { id: 1, name: "English", alphabet: "abcdefghijklmnopqrstuvwxyz", popular: "e" }
]

@Component({
  selector: 'app-vigenere-crack',
  templateUrl: './vigenere-crack.component.html',
  styleUrls: ['./vigenere-crack.component.css'],
  outputs: ['inputValueChange']
})

export class VigenereCrackComponent implements OnInit {
  constructor(private vigenereCrackService: VigenereCrackService, private caesarCipherService: CaesarCipherService) { }

  LANGUAGES: typeof LANGUAGES = LANGUAGES;
  encoded_text: string;
  sequenceLength: number;
  keyLength: number;
  gcdList: any;
  deleteSymbols: boolean;
  test: string;
  selectedAlphabetId: number;
  decodedResult: string = "";

  guessedKey: string = "";

  ngOnInit() {
    this.encoded_text = "гксоцоуньйлвбдсауолнбппдроуомкпммимсасплоешньйтвёттвётмеёоенбкпвроезёмёлэептютпгпппчуиоееемамотьоарлптоофтппуаонпмиенланпмромуролрьтпмромутгоигшёйтомоноклёжблйзбкфтбвщитьгргаоьёлядйвтепнйбьлйппхпжйимищьпдйнптмишамсаоупсошицообьлоаннпгпксурнёеерфгйхфзоилогксеролинуткфлйсукбквылаёгподрпмоааппксыуаарёдлинигомотанидомогавымафвёншаоаевфмаодрпмоынищищкбмйппхпжймйнбрпгбоееуообьлуалжёкбкерфгйеггсяинпеурапэе";
    this.selectedAlphabetId = 0;
    this.sequenceLength = 3;
    this.deleteSymbols = true;
  }
  //гксоцоуньйлвбдсауолнбппдроуомкпммимсасплоешньйтвёттвётмеёоенбкпвроезёмёлэептютпгпппчуиоееемамотьоарлптоофтппуаонпмиенланпмромуролрьтпмромутгоигшёйтомоноклёжблйзбкфтбвщитьгргаоьёлядйвтепнйбьлйппхпжйимищьпдйнптмишамсаоупсошицообьлоаннпгпксурнёеерфгйхфзоилогксеролинуткфлйсукбквылаёгподрпмоааппксыуаарёдлинигомотанидомогавымафвёншаоаевфмаодрпмоынищищкбмйппхпжймйнбрпгбоееуообьлуалжёкбкерфгйеггсяинпеурапэе

  get langNames(): any {
    return this.LANGUAGES;
  }

  get currentAlphabetObject() {
    return this.LANGUAGES[this.selectedAlphabetId];
  }

  get currentAlphabet() {
    return this.currentAlphabetObject["alphabet"];
  }

  onEncodedTextChange(val) {
    if (this.deleteSymbols)
      this.filterEncodedText(val);

    this.encoded_text = this.encoded_text.toLowerCase();
  }

  onDeleteSymbolsChange(checked) {
    if (checked) {
      this.filterEncodedText(this.encoded_text);
    }
  }

  filterEncodedText(text) {
    if (text)
      this.encoded_text = text.replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\"\'\+—»«]/g, '').replace(/[0-9]/g, '');
  }

  crackViginere = function () {
    let gcd0 = performance.now();
    this.setGcdList();
    let gcd1 = performance.now();
    let crack0 = performance.now();

    let caesarCryptograms = this.vigenereCrackService.splitTextWithKeyLen(this.encoded_text, this.keyLength);
    let keyShifts: number[] = []; // represent vigenere key as array of shifts
    let popularLetter = this.currentAlphabetObject["popular"]; // getting most popular letter for current alphabet
    let popularLetterShift = this.currentAlphabet.indexOf(popularLetter); // getting shift of most popular letter in current alphabet
    let decodedParts: any[] = [];

    for (var cryptogram in caesarCryptograms) {
      let frequencies = this.vigenereCrackService.analyseFrequency(caesarCryptograms[cryptogram], this.currentAlphabet); // count letters frequency of each caesar cryptogram 

      console.log(frequencies);


      //console.log(caesarCryptograms[cryptogram]);

      let mostPopularEncodedLetter = Object.keys(frequencies).reduce(function (a, b) { return frequencies[a] > frequencies[b] ? a : b }); // most popular letter in encoded text     

      //console.log(mostPopularEncodedLetter);


      let mostPopularEncodedLetterShift = this.currentAlphabet.indexOf(mostPopularEncodedLetter); // shift of most popular letter in encoded text

      //console.log(mostPopularEncodedLetterShift);

      if (mostPopularEncodedLetterShift === -1)
        console.log("Буква не найдена в алфавите: " + mostPopularEncodedLetter);

      let shift: number = mostPopularEncodedLetterShift - popularLetterShift;
      keyShifts.push((shift + this.currentAlphabet.length) % this.currentAlphabet.length);
      decodedParts.push(this.caesarCipherService.caesarCipher(caesarCryptograms[cryptogram], shift, this.currentAlphabet, false).split("")); // put every decoded caesar text into array
    }
    this.setGuessedKey(keyShifts);


    // merge all caesar-decrypted parts into result string
    this.decodedResult = "";
    for (var i = 0; i < this.encoded_text.length; i++) {
      let partId = i % keyShifts.length;
      this.decodedResult += decodedParts[partId].shift();
    }

    let crack1 = performance.now();
    console.log("Вычисления НОД заняли " + (gcd1 - gcd0) + " мс.")
    console.log("Расшифровка заняла " + (crack1 - crack0) + " мс.");

    console.log("Общее время выполнения " + (crack1 - gcd0) + " мс.");
  }


  setGuessedKey(shifts) {
    this.guessedKey = "";
    for (var i = 0; i < shifts.length; i++) {
      this.guessedKey += this.currentAlphabet[shifts[i]];
    }
  }

  onKeyLengthChange(val) {
    this.keyLength = val;
  }

  setGcdList = function () {
    this.gcdList = this.vigenereCrackService.sortGcdsByFrequency(
      this.vigenereCrackService.getGCDS(
        this.repeatDistancesCount
      )
    );
    if (!this.gcdList[0])
      return null;
    this.keyLength = this.keyLength ? this.keyLength : this.gcdList[0]["value"];
  }

  get maxGcd(): number {
    if (!this.gcdList || !this.gcdList[0])
      return null;
    return this.gcdList[0]["value"];
  }

  get repeatDistancesCount() {
    return this.vigenereCrackService.getRepeatDistancesCount(this.encoded_text, this.sequenceLength);
  }
}

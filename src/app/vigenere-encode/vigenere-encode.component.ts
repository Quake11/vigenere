import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { VigenereCipherService } from '../vigenere-cipher.service';
import { LANGUAGES } from '../globals';

@Component({
  selector: 'app-vigenere-encode',
  templateUrl: './vigenere-encode.component.html',
  styleUrls: ['./vigenere-encode.component.css']
})
export class VigenereEncodeComponent implements OnInit {


  LANGUAGES: typeof LANGUAGES = LANGUAGES;
  encoded_text: string;
  deleteSymbols: boolean;
  encodedResult: string;
  key: string;
  selectedAlphabetId: number;

  constructor(private utilsService: UtilsService, private vigenereCipherService: VigenereCipherService) { }

  ngOnInit() {
    this.deleteSymbols = true;
    this.selectedAlphabetId = 0;
    this.encoded_text = 'вкрохотныйквадратокнаподпотолкомлилсясолнечныйсветсветлееоднаковподземельеотэтогопочтинеделалосьнаплотноутоптанномземляномполупокрытомполусгнившейсоломойлежализакутавшисьврваньелюдивсеонибылипохожиилишьодинотличалсяотпрочихонбылнамногокрупнеедругихузниковкрепокимускулисткакбыкаегоогромнаяпокрытаяредкимиволосамиголовабылаувенчанадвумяогромнымишишкамипохожиминарогаодетонбылтакжекакдругиевгрязноетряпье';
    this.key = 'ба';
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
    console.log(this.encoded_text);

  }

  onDeleteSymbolsChange(checked) {
    if (checked) {
      this.encoded_text = this.utilsService.filterEncodedText(this.encoded_text);
    }
  }

  encode() {
    const keyShifts: number[] = this.vigenereCipherService.getShiftsFromKey(this.key, this.currentAlphabet);
    this.encodedResult = this.vigenereCipherService.Cipher(this.encoded_text, keyShifts, this.currentAlphabet, true);
  }

}

import { Component, OnInit } from '@angular/core';
import { VigenereCrackService } from '../vigenere-crack.service';

@Component({
  selector: 'app-vigenere-crack',
  templateUrl: './vigenere-crack.component.html',
  styleUrls: ['./vigenere-crack.component.css']
})
export class VigenereCrackComponent implements OnInit {

  constructor(private vigenereCrackService: VigenereCrackService) { }

  ngOnInit() {
  }
  //гксоцоуньйлвбдсауолнбппдроуомкпммимсасплоешньйтвёттвётмеёоенбкпвроезёмёлэептютпгпппчуиоееемамотьоарлптоофтппуаонпмиенланпмромуролрьтпмромутгоигшёйтомоноклёжблйзбкфтбвщитьгргаоьёлядйвтепнйбьлйппхпжйимищьпдйнптмишамсаоупсошицообьлоаннпгпксурнёеерфгйхфзоилогксеролинуткфлйсукбквылаёгподрпмоааппксыуаарёдлинигомотанидомогавымафвёншаоаевфмаодрпмоынищищкбмйппхпжймйнбрпгбоееуообьлуалжёкбкерфгйеггсяинпеурапэе
  encoded_text: string;
  sequenceLength: number = 3;

  debug: any;
  keyLength: number;


  onEncodedTextChange(val) {
    this.encoded_text = val; // updated value
  }

  get gcdList() {
    return this.sortByFrequency(
      this.getGCDS(
        this.repeatDistancesCount
      )
    );
  }

  get maxGcd(): number {
    if (!this.gcdList)
      return null;
    let kl = this.gcdList[0]["value"];
    this.keyLength = kl;
    //console.log(this.gcdList[0]["value"]);
    return kl;
  }


  crackViginere = function () {
    //console.log("crackViginere()");
    var t0 = performance.now();
    console.log(this.maxGcd);
    var t1 = performance.now();
    console.log("Вычисления заняли " + (t1 - t0) + " мс.")
  }

  get repeatDistancesCount() {
    return this.vigenereCrackService.repeatDistancesCount(this.encoded_text, this.sequenceLength);
  }


  gcd = function (a, b) {
    if (!b)
      return a;
    return this.gcd(b, a % b);
  };

  getGCDS = function (repeats: number[]): number[] {
    if (!repeats)
      return null;
    let nods: number[] = [];
    for (let i = 0; i < repeats.length; ++i) {
      nods.push(this.gcd(repeats[i], repeats[i + 1]));
    }
    return nods;
  }


  sortByFrequency = function (array) {
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

}

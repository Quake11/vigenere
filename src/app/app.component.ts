import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  encoded_text = "гксоцоуньйлвбдсауолнбппдроуомкпммимсасплоешньйтвёттвётмеёоенбкпвроезёмёлэептютпгпппчуиоееемамотьоарлптоофтппуаонпмиенланпмромуролрьтпмромутгоигшёйтомоноклёжблйзбкфтбвщитьгргаоьёлядйвтепнйбьлйппхпжйимищьпдйнптмишамсаоупсошицообьлоаннпгпксурнёеерфгйхфзоилогксеролинуткфлйсукбквылаёгподрпмоааппксыуаарёдлинигомотанидомогавымафвёншаоаевфмаодрпмоынищищкбмйппхпжймйнбрпгбоееуообьлуалжёкбкерфгйеггсяинпеурапэе";

  //digramLength: number = 3;
  debug: any;


  crackViginere = function () {
    var t0 = performance.now();

    console.log(
      this.sortByFrequency(
        this.getGCDS(
          this.repeatCount(this.encoded_text)
        )
      )[0]
    );
    var t1 = performance.now();
    
    console.log("Вычисления заняли " + (t1 - t0) + " мс.")
  }


  repeatCount = function (text: string, digramLength: number = 3): number[] {
    let repeats: number[] = [];
    for (let i = 0; i < text.length - digramLength + 1; i++) {
      let temp: string = text.substring(i, i + digramLength);
      for (let j: number = i + 1; j < text.length - digramLength + 1; j++) {
        let temp2: string = text.substring(j, j + digramLength);
        if (temp.toLowerCase() === temp2.toLowerCase()) {
          console.log(temp);
          repeats.push(j - i);
        }
      }
    }
    return repeats;
  }


  gcd = function (a, b) {
    if (!b)
      return a;
    return this.gcd(b, a % b);
  };

  getGCDS = function (repeats: number[]): number[] {
    let nods: number[] = [];
    for (let i = 0; i < repeats.length; ++i) {
      nods.push(this.gcd(repeats[i], repeats[i + 1]));
    }
    //console.log(this.sortByFrequency(nods));
    //console.log(nods);
    return nods;
  }


  sortByFrequency = function (array) {
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
        'nod': element,
        'frequency': frequency[element]
      });
    });
    return result;
  }
}
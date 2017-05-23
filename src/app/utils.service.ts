import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  filterEncodedText(text) {
    if (text) {
      return text.replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\"\'\+—»«–]/g, '').replace(/[0-9]/g, '');
    }
  }

}


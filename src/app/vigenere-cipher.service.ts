import { Injectable } from '@angular/core';
import { CaesarCipherService } from './caesar-cipher.service';


@Injectable()
export class VigenereCipherService {

  constructor(private caesarCipherService: CaesarCipherService) { }

}

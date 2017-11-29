import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VigenereCrackComponent } from './vigenere-crack/vigenere-crack.component';
import { VigenereDecodeComponent } from './vigenere-decode/vigenere-decode.component';
import { VigenereEncodeComponent } from './vigenere-encode/vigenere-encode.component';

const routes: Routes = [
  {
    path: 'crack', component: VigenereCrackComponent,
    children: []
  },
  {
    path: 'decode', component: VigenereDecodeComponent,
    children: []
  },
  {
    path: 'encode', component: VigenereEncodeComponent,
    children: []
  },
  {
    path: '**', redirectTo: 'crack'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

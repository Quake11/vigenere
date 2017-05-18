import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VigenereCrackComponent } from './vigenere-crack/vigenere-crack.component';
import { VigenereDecodeComponent } from './vigenere-decode/vigenere-decode.component';
import { VigenereEncodeComponent } from './vigenere-encode/vigenere-encode.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/crack', pathMatch: 'full'
  },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

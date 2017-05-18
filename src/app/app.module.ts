import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VigenereCrackComponent } from './vigenere-crack/vigenere-crack.component';
import { VigenereDecodeComponent } from './vigenere-decode/vigenere-decode.component';
import { VigenereEncodeComponent } from './vigenere-encode/vigenere-encode.component';
import { VigenereCrackService } from './vigenere-crack.service';

@NgModule({
  declarations: [
    AppComponent,
    VigenereCrackComponent,
    VigenereDecodeComponent,
    VigenereEncodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [VigenereCrackService],
  bootstrap: [AppComponent]
})
export class AppModule { }

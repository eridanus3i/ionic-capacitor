import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudioBookPageRoutingModule } from './audio-book-routing.module';

import { AudioBookPage } from './audio-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudioBookPageRoutingModule
  ],
  declarations: [AudioBookPage]
})
export class AudioBookPageModule {}

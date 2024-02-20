import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConcatAudioPageRoutingModule } from './concat-audio-routing.module';

import { ConcatAudioPage } from './concat-audio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConcatAudioPageRoutingModule
  ],
  declarations: [ConcatAudioPage]
})
export class ConcatAudioPageModule {}

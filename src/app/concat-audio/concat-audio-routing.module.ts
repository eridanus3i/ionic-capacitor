import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConcatAudioPage } from './concat-audio.page';

const routes: Routes = [
  {
    path: '',
    component: ConcatAudioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConcatAudioPageRoutingModule {}

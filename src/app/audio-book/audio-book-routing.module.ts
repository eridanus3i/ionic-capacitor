import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioBookPage } from './audio-book.page';

const routes: Routes = [
  {
    path: '',
    component: AudioBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioBookPageRoutingModule {}

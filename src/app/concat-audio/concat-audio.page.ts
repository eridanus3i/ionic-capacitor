import { Component, OnInit } from '@angular/core';
declare var FFmpeg: any;

@Component({
  selector: 'app-concat-audio',
  templateUrl: './concat-audio.page.html',
  styleUrls: ['./concat-audio.page.scss'],
})
export class ConcatAudioPage implements OnInit {

  constructor() { }

  ngOnInit() {
    const ffmpeg = FFmpeg.createFFmpeg({ log: true });
  }

}

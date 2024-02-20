import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AudioService } from '../audio.service';
import { Howl, Howler } from "howler";


@Component({
  selector: 'app-concat-audio',
  templateUrl: './concat-audio.page.html',
  styleUrls: ['./concat-audio.page.scss'],
})
export class ConcatAudioPage implements OnInit {

  constructor(private audioService: AudioService, private sanitizer: DomSanitizer) {}
  audioUrl: SafeUrl | undefined;

  ngOnInit() {
    this.concatenateAudioFiles();
  }

  async concatenateAudioFiles() {
    const audioFiles = ['assets/sounds/chapter1.mp3', 'assets/sounds/chapter2.mp3', 'assets/sounds/chapter3.mp3', 'assets/sounds/chapter4.mp3'];
    const concatenatedAudioBlob = await this.audioService.concatenateAudio(audioFiles);
    console.log(concatenatedAudioBlob);
    //download the file
    const url = window.URL.createObjectURL(concatenatedAudioBlob);
    this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    var sound = new Howl({
      src: [url]
    });
    sound.play();

  }

}

import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Filesystem, Directory } from '@capacitor/filesystem';
import {NativeAudio} from '@capacitor-community/native-audio'


@Component({
  selector: 'app-audio-book',
  templateUrl: './audio-book.page.html',
  styleUrls: ['./audio-book.page.scss'],
})
export class AudioBookPage implements OnInit {

  constructor() { 
  }

  async preloadAudio() {
    try {
      await NativeAudio.preload({
        assetId: 'fire',
        assetPath: 'chapter1.mp3', // Adjust the path as per your project structure
        audioChannelNum: 1,
        isUrl: false
      });
      console.log('Audio preloaded successfully');
    } catch (error) {
      console.error('Error preloading audio:', error);
    }
  }


  ngOnInit() {
    SpeechRecognition.available().then((result) => {
      console.log('SpeechRecognition available:', result.available);
    });
  }

  async playAudio() {
    try {
      await NativeAudio.play({ assetId: 'fire' });
      console.log('Audio played successfully');
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  async stopAudio() {
    try {
      await NativeAudio.stop({ assetId: 'fire' });
      console.log('Audio stopped successfully');
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  }

  async unloadAudio() {
    try {
      await NativeAudio.unload({ assetId: 'fire' });
      console.log('Audio unloaded successfully');
    } catch (error) {
      console.error('Error unloading audio:', error);
    }
  }
}

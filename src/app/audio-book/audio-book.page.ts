import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { NativeAudio } from '@capacitor-community/native-audio'


@Component({
  selector: 'app-audio-book',
  templateUrl: './audio-book.page.html',
  styleUrls: ['./audio-book.page.scss'],
})
export class AudioBookPage implements OnInit {
  audioList: any[] | undefined 

  constructor() {
  }


  async preloadAudio(audio: any) {
    try {
      await NativeAudio.preload({
        assetId: 'fire',
        assetPath: audio.path, // Adjust the path as per your project structure
        audioChannelNum: 1,
        isUrl: false
      });
      console.log('Audio preloaded successfully');
    } catch (error) {
      console.error('Error preloading audio:', error);
    }
  }


  ngOnInit() {
    this.audioList = [
      {
        name: 'Chapter 1',
        path: 'chapter1.mp3'
      },
      {
        name: 'Chapter 2',
        path: 'chapter2.mp3'
      },
      {
        name: 'Chapter 3',
        path: 'chapter3.mp3'
      },
      {
        name: 'Chapter 4',
        path: 'chapter4.mp3'
      },
      {
        name: 'Chapter 5',
        path: 'chapter5.mp3'
      },
      {
        name: 'Chapter 6',
        path: 'chapter6.mp3'
      },
      {
        name: 'Chapter 7',
        path: 'chapter7.mp3'
      },
      {
        name: 'Chapter 8',
        path: 'chapter8.mp3'
      },
      {
        name: 'Chapter 9',
        path: 'chapter9.mp3'
      },
      {
        name: 'Chapter 10',
        path: 'chapter10.mp3'
      }
    ]
    
  }

  async playAudio(audio: any) {
    await this.unloadAudio(audio);
    await this.preloadAudio(audio);
    try {
      await NativeAudio.play({ assetId: 'fire' });
      console.log('Audio played successfully');
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  async stopAudio(audio: any) {
    try {
      await NativeAudio.stop({ assetId: 'fire' });
      console.log('Audio stopped successfully');
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  }

  async unloadAudio(audio: any) {
    try {
      await NativeAudio.unload({ assetId: 'fire' });
      console.log('Audio unloaded successfully');
    } catch (error) {
      console.error('Error unloading audio:', error);
    }
  }
}

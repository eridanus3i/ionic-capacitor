import { Component, OnInit, ViewChild } from '@angular/core';
import { NativeAudio } from '@capacitor-community/native-audio';

@Component({
  selector: 'app-audio-book',
  templateUrl: './audio-book.page.html',
  styleUrls: ['./audio-book.page.scss'],
})
export class AudioBookPage implements OnInit {
  @ViewChild('audioPlayer') audioPlayer: any; // ViewChild to access the audio element

  audioList: any[] = [];
  audioDuration: number | undefined;
  currentTime: number = 0;
  currentAudioIndex: number | undefined;
  currentAudioPath: string | undefined;

  constructor() { }

  async preloadAudio(audio: any) {
    try {
      await NativeAudio.preload({
        assetId: audio.path, // Use audio path as assetId
        assetPath: audio.path,
        audioChannelNum: 1,
        isUrl: false
      }).then(async () => {
        console.log('Audio preloaded successfully');
        // const durationResult = await NativeAudio.getDuration({ assetId: audio.path }); // Use audio path
        // this.audioDuration = durationResult.duration;
        console.log('Audio duration:', this.audioDuration);
      });
    } catch (error) {
      console.error('Error preloading audio:', error);
    }
  }

  ngOnInit() {
    this.audioList = [
      { name: 'Chapter 1', path: 'chapter1.mp3' },
      { name: 'Chapter 2', path: 'chapter2.mp3' },
      { name: 'Chapter 3', path: 'chapter3.mp3' },
      { name: 'Chapter 4', path: 'chapter4.mp3' },
      { name: 'Chapter 5', path: 'chapter5.mp3' },
      { name: 'Chapter 6', path: 'chapter6.mp3' },
      { name: 'Chapter 7', path: 'chapter7.mp3' },
      { name: 'Chapter 8', path: 'chapter8.mp3' },
      { name: 'Chapter 9', path: 'chapter9.mp3' },
      { name: 'Chapter 10', path: 'chapter10.mp3' }
      // Add other chapters as needed
    ];
  }

  async playAudio(audio: any) {
    this.currentAudioIndex = this.audioList.indexOf(audio);
    await this.unloadAudio();
    await this.preloadAudio(audio);
    const path = `assets/sounds/${audio.path}`
    this.currentAudioPath = path; // Update currentAudioPath
    await this.audioPlayer.nativeElement.onloadedmetadata;
    // Get duration

    try {
      this.audioDuration = this.audioPlayer.nativeElement.duration;
      console.log('Audio duration:', this.audioDuration);
      // await NativeAudio.play({ assetId: audio.path }); // Use audio path
      console.log('Audio played successfully');
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  async stopAudio() {
    try {
      if (this.currentAudioPath) {
        await NativeAudio.stop({ assetId: this.currentAudioPath });
        console.log('Audio stopped successfully');
      }
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  }

  async unloadAudio() {
    try {
      if (this.currentAudioPath) {
        await NativeAudio.unload({ assetId: this.currentAudioPath });
        console.log('Audio unloaded successfully');
      }
    } catch (error) {
      console.error('Error unloading audio:', error);
    }
  }
}

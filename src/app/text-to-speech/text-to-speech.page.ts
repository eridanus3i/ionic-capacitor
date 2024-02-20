import { Component, OnInit } from '@angular/core';
import { OpenAiService } from '../../services/open-ai.service'
import { AudioService } from '../../app/audio.service';
import { Howl, Howler } from "howler";
import getBlobDuration from 'get-blob-duration'


@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.page.html',
  styleUrls: ['./text-to-speech.page.scss'],
})
export class TextToSpeechPage implements OnInit {


  constructor(
    private openAiService: OpenAiService,
    private audioService: AudioService
  ) { }
  textToSpeak: string = '';
  player: Howl | undefined;
  isPlaying = false;
  paragraphs: string[] = [];
  activeParagraphIndex: number | null = null;
  audioArray: { text: string; start: number; end: number; }[] = [];


  ngOnInit() {
  }

  async getAudioFromText(text: string) {
    const audio = await this.openAiService.getAudioFromText(text);
    const url = window.URL.createObjectURL(new Blob([audio], { type: 'audio/mp3' }));
    const audioElement = new Audio(url);
    audioElement.play();
  }

  text2speech() {
    console.log('text2speech');
    const story = `Once upon a time, in a lush and vibrant meadow, there lived a tiny seed named Sam. Sam was nestled snugly in the rich soil, surrounded by tall grass and colorful flowers. Sam dreamed of adventure beyond the confines of the meadow, but as a seed, it seemed impossible.
One sunny morning, a gentle breeze whispered through the meadow, carrying Sam's wish to the wise old oak tree nearby. The oak tree chuckled softly and rustled its leaves in amusement. "Ah, little seed," the oak tree said, "Adventure is not just for the brave and bold. It's for those who dare to dream."
Inspired by the oak tree's words, Sam began to imagine all the wonders beyond the meadow. With determination in its heart, Sam pushed its roots deeper into the soil, gathering strength and courage for the journey ahead.
Days turned into weeks, and weeks into months. Sam grew taller and stronger, reaching towards the warm sunlight above. Finally, one bright morning, Sam felt a gentle tug from the earth below. The time had come to embark on its grand adventure.
With a final push, Sam burst through the soil's surface, unfurling its delicate green leaves for the first time. The world outside the meadow was vast and breathtaking. Sam marveled at the towering trees, the sparkling streams, and the majestic mountains in the distance.
But as Sam ventured further from home, it encountered challenges along the way. Strong winds threatened to uproot it, and hungry birds pecked at its tender leaves. Yet, with each obstacle, Sam grew wiser and more resilient.
Through perseverance and bravery, Sam overcame every trial, blossoming into a beautiful flower. Along the way, it made friends with creatures big and small, each sharing their own stories of courage and determination.
As the seasons changed and the years passed, Sam's once tiny seedling became a towering tree, its branches stretching high into the sky. From its lofty perch, Sam looked out over the meadow where it all began, grateful for the journey that had shaped it into the mighty tree it had become.
And so, dear children, remember the story of Sam the seed, who dared to dream and embarked on a grand adventure. For like Sam, each of you carries the potential for greatness within you. All it takes is a little courage and a belief in your dreams.`;
    //strim the text
    this.paragraphs = this.textToSpeak.trim().split(".");
    console.log(this.paragraphs);
    //remove empty strings
    this.paragraphs = this.paragraphs.filter((p) => p.trim() !== '');
    // this.getAudioFromText('Hello, how are you?')
    const array = ['Hello, how are you?', 'I am fine, thank you.']
    this.getAudioFromStringArray(this.paragraphs);
  }

  async getAudioFromStringArray(array: string[]) {
    let totalDuration = 0;
    const audioFiles = [];
    for (const text of array) {
      const audio = await this.openAiService.getAudioFromText(text);
      const url = window.URL.createObjectURL(new Blob([audio], { type: 'audio/mp3' }));
      audioFiles.push(url);
      getBlobDuration(new Blob([audio], { type: 'audio/mp3' })).then((duration) => {
        this.audioArray.push({ text, start: totalDuration, end: totalDuration + duration });
        totalDuration += duration;
      });
    }
    console.log('audioFiles', this.audioArray);
    const blob = await this.audioService.concatenateAudio(audioFiles);
    console.log(blob);
    const url = window.URL.createObjectURL(blob);
    const audioElement = new Audio(url);
    // audioElement.play();
    //use howler.js to play the audio
    //download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audio.mp3';
    a.click();
    // console.log('totalDuration', totalDuration);
    // console.log('audioArray', audioArray);
    this.player = new Howl({
      src: [url],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        console.log("onplay");
        this.updateProgress();
      },
      onend: () => {
        console.log("onend");
      },
    });
    this.player.play();
  }
  updateProgress() {
    if (!this.player) return;
    const seek = this.player.seek();
    console.log('seek', seek);
    //check if the seek is within the range of which index in the audioArray
    for (let i = 0; i < this.audioArray.length; i++) {
      const audio = this.audioArray[i];
      if (seek >= audio.start && seek <= audio.end) {
        this.activeParagraphIndex = i;
        break;
      }
    }
    if (this.isPlaying) {
      requestAnimationFrame(() => this.updateProgress());
    }

  }
}

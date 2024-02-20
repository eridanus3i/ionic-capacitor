import { Component, OnInit, ViewChild } from "@angular/core";
import { Howl, Howler } from "howler";
import { IonRange } from "@ionic/angular";


export interface Track {
  name: string;
  path: string;
  audioArray?: any[];
}

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.page.html',
  styleUrls: ['./music-player.page.scss'],
})
export class MusicPlayerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  playlist: Track[] = [
    {
      name: "Chapter 1",
      path: "./assets/sounds/chapter1.mp3",
    },
    {
      name: "Chapter 2",
      path: "./assets/sounds/chapter2.mp3",
    },
    {
      name: "Chapter 3",
      path: "./assets/sounds/chapter3.mp3",
    },
    {
      name: "Chapter 4",
      path: "./assets/sounds/chapter4.mp3",
    },
    {
      name: "Chapter 5",
      path: "./assets/sounds/chapter5.mp3",
    },
    {
      name: "Chapter 6",
      path: "./assets/sounds/chapter6.mp3",
    },
    {
      name: "Chapter 7",
      path: "./assets/sounds/chapter7.mp3",
    },
    {
      name: "Chapter 8",
      path: "./assets/sounds/chapter8.mp3",
    },
    {
      name: "Chapter 9",
      path: "./assets/sounds/chapter9.mp3",
    },
    {
      name: "Chapter 10",
      path: "./assets/sounds/chapter10.mp3",
    },
    {
      name: "concatenated",
      path: "./assets/sounds/concatenated.mp3",
      audioArray: [
        {
          "text": "Once upon a time, in a lush and vibrant meadow, there lived a tiny seed named Sam",
          "start": 0,
          "end": 5.016
        },
        {
          "text": " Sam was nestled snugly in the rich soil, surrounded by tall grass and colorful flowers",
          "start": 5.016,
          "end": 10.440000000000001
        },
        {
          "text": " Sam dreamed of adventure beyond the confines of the meadow, but as a seed, it seemed impossible",
          "start": 10.440000000000001,
          "end": 16.32
        },
        {
          "text": "\n\nOne sunny morning, a gentle breeze whispered through the meadow, carrying Sam's wish to the wise old oak tree nearby",
          "start": 16.32,
          "end": 23.544
        },
        {
          "text": " The oak tree chuckled softly and rustled its leaves in amusement",
          "start": 23.544,
          "end": 27.192
        },
        {
          "text": " \"Ah, little seed,\" the oak tree said, \"Adventure is not just for the brave and bold",
          "start": 27.192,
          "end": 32.184
        },
        {
          "text": " It's for those who dare to dream",
          "start": 32.184,
          "end": 33.912
        },
        {
          "text": "\"",
          "start": 33.912,
          "end": 34.464
        }
      ]
    }
  ];

  activeParagraphIndex: number | null = null;
  activeTrack: Track = { name: "", path: "", audioArray: [] };
  player: Howl | undefined;
  isPlaying = false;
  hiddenContent = false;
  selectedSpeechRate: number = 1;
  progress = 0;
  public currentTime = "0:00"; // Current playback time
  public totalDuration = "0:00"; // Total duration of the track

  @ViewChild("range", { static: false }) range!: IonRange;


  start(track: Track) {
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        console.log("onplay");
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
        console.log("onend");
        this.isPlaying = false;
        this.currentTime = "0:00"; // Reset current time when playback ends
      },
    });
    this.player.play();
  }

  restart() {
    if (this.player) {
      this.player.stop();
      this.player.play();
    }
  }

  trackBackward() {
    const seek = this.player ? this.player.seek() : 0;
    const newSeek = Math.max(seek - 2, 0); // Ensure seek time does not go below 0
    this.player?.seek(newSeek);
    this.updateProgress();
  }
  trackMoveUpard() {
    const seek = this.player ? this.player.seek() : 0;
    const newSeek = Math.max(seek + 2, 0); // Ensure seek time does not go below 0
    this.player?.seek(newSeek);
    this.updateProgress();
  }

  // tracking back 2s

  togglePlayer(pause: boolean) {
    if (!this.player) return;
    this.isPlaying = !pause;
    pause ? this.player.pause() : this.player.play();
  }

  next() {
    const index = this.playlist.findIndex(track => track === this.activeTrack);
    const nextIndex = (index + 1) % this.playlist.length;
    this.start(this.playlist[nextIndex]);
  }

  prev() {
    const index = this.playlist.findIndex(track => track === this.activeTrack);
    const prevIndex = (index - 1 + this.playlist.length) % this.playlist.length;
    this.start(this.playlist[prevIndex]);
  }

  seek() {
    const newValue = +this.range.value;
    const duration = this.player ? this.player.duration() : 0;
    if (!duration) return;
    const seekTime = (duration * newValue) / 100;
    this.player?.seek(seekTime);
  }

  updateProgress() {
    if (!this.player) return;
    const seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    this.currentTime = this.formatTime(Math.round(seek)); // Format current time
    this.totalDuration = this.formatTime(Math.round(this.player?.duration() || 0)); // Format total duration
    // console.log("updateProgress", this.progress, this.currentTime, this.totalDuration);
    console.log('seek', seek);
    if (this.activeTrack.audioArray) {
      for (let i = 0; i < this.activeTrack.audioArray.length; i++) {
        const audio = this.activeTrack.audioArray[i];
        if (seek >= audio.start && seek <= audio.end) {
          this.activeParagraphIndex = i;
          break;
        }
      }
    }

    if (this.isPlaying) {
      requestAnimationFrame(() => this.updateProgress());
    }
  }
  formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const displaySeconds = remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds;
    return `${minutes}:${displaySeconds}`;
  }

  forwardToFirst() {
    //select the first track
    this.start(this.playlist[0]);
  }

  forwardToLast() {
    //select the last track
    this.start(this.playlist[this.playlist.length - 1]);
  }
  OpenContentMenu() {
    this.hiddenContent = !this.hiddenContent;
  }
  speechUp() {
    if (!this.player) {
      return
    }
    console.log(this.selectedSpeechRate);
    this.player.rate(this.selectedSpeechRate)
  }

}

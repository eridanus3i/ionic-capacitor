import { Component, OnInit, ViewChild } from "@angular/core";
import { Howl, Howler } from "howler";
import { IonRange } from "@ionic/angular";


export interface Track {
  name: string;
  path: string;
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
    }
  ];

  activeTrack: Track = { name: "", path: "" };
  player: Howl | undefined;
  isPlaying = false;
  progress = 0;
  currentTime = "0:00"; // Current playback time

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

}

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
      name: "Jazzy Sounds",
      path: "./assets/mp3/jazzy-sounds.mp3",
    },
    {
      name: "Footage Feet",
      path: "./assets/mp3/footage-feet.mp3",
    },
    {
      name: "Death Grips",
      path: "./assets/mp3/death-grips.mp3",
    },
  ];

  activeTrack: Track = { name: "", path: "" };
  player: Howl | undefined;
  isPlaying = false;
  progress = 0;
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
    if (this.isPlaying) {
      requestAnimationFrame(() => this.updateProgress());
    }
  }

}

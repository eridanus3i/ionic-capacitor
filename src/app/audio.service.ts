import { Injectable } from '@angular/core';
import Crunker from 'crunker';
@Injectable({
  providedIn: 'root'
})
export class AudioService {
  constructor() { }
  async concatenateAudio(audioFiles: string[]): Promise<void> {
    const crunker = new Crunker();
    crunker.fetchAudio(...audioFiles).then(buffers => {
      return crunker.concatAudio(buffers);
    }).then((concate) => {
      return crunker.export(concate, 'audio/mp3');
    }).then((output) => {
      crunker.download(output.blob);
    });
  }
}

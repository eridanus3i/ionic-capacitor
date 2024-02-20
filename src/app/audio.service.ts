import { Injectable } from '@angular/core';
import Crunker from 'crunker';
@Injectable({
  providedIn: 'root'
})
export class AudioService {
  async concatenateAudio(audioFiles: string[]): Promise<Blob> {
    const crunker = new Crunker();
    return new Promise<Blob>((resolve, reject) => {
      crunker.fetchAudio(...audioFiles).then(buffers => {
        return crunker.concatAudio(buffers);
      }).then((concate) => {
        return crunker.export(concate, 'audio/mp3');
      }).then((output) => {
        // crunker.download(output.blob);
        resolve(output.blob);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}

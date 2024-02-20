/* eslint-disable @typescript-eslint/naming-convention */
import { EventEmitter, Injectable } from '@angular/core';
// import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from 'openai';
import OpenAI from 'openai';
import { filter, from, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { fetchEventSource } from '@microsoft/fetch-event-source';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  openai: any;
  messages = [];
  fetchEvent = new EventEmitter();
  ctrl = new AbortController();
  listVoice = [
    'alloy',
    'echo',
    'fable',
    'onyx',
    'nova',
    'shimmer',
  ];

  constructor() {
    this.openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true
    });
  }
  clearMessages() {
    this.messages = [];
  }
  changeApiKey(apiKey: string) {
    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }
  // getDataFromOpenAI(text: string, role: any) {
  //   return new Promise<string>((resolve, reject) => {
  //     const messages = [
  //       { role, content: text }
  //     ];
  //     this.messages.push({ role, content: text });
  //     const params: OpenAI.Chat.ChatCompletionCreateParams = {
  //       messages,
  //       model: 'gpt-3.5-turbo',
  //     };
  //     this.openai.chat.completions.create(params).then(async (completion) => {
  //       console.log(completion);
  //       const resp = completion.choices[0].message;
  //       resolve(resp.content);
  //     }).catch((error) => {
  //       console.log(error);
  //       reject(error);
  //     });
  //   });
  // }
  getAudioFromText(text: string, voice = 'alloy' as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer', speed = 1) {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const params: OpenAI.Audio.SpeechCreateParams = {
        input: text,
        model: 'tts-1',
        voice,
        speed
      };
      this.openai.audio.speech.create(params).then(async (resp: any) => {
        console.log(resp);
        const arrayBuffer = await resp.arrayBuffer();
        resolve(arrayBuffer);
      }).catch((error: any) => {
        console.log(error);
        reject(error);
      });
    });
  }
  // async getStreamingDataFromOpenAI(text: string, role: any) {
  //   this.messages.push({ role, content: text });
  //   let content = '';
  //   let roleChat = '';
  //   // const messages = [
  //   //   { role, content: text }
  //   // ];
  //   try {
  //     const requestBody = {
  //       model: 'gpt-3.5-turbo',
  //       messages: this.messages, // here you need to include all the previous messages
  //       stream: true,
  //     };
  //     const requestHeaders = {
  //       Authorization: `Bearer ${environment.openAIToken}`,
  //       'Content-Type': 'application/json',
  //     };
  //     let waiting = true;

  //     const r = []; // this will be filled with the new messages and sent to the front-end via events

  //     await fetchEventSource('https://api.openai.com/v1/chat/completions', {
  //       headers: requestHeaders,
  //       body: JSON.stringify(requestBody),
  //       method: 'POST',
  //       openWhenHidden: false,
  //       signal: this.ctrl.signal,
  //       onmessage: (ev) => {
  //         const response = JSON.parse(ev.data);
  //         try {
  //           const choice = response.choices[0];
  //           if (choice.finish_reason === 'stop') {
  //             this.ctrl.abort();
  //           }
  //           if (waiting) {
  //             waiting = false;
  //             // r[r.length - 1].content = '';
  //             content = '';
  //           }
  //           // console.log(choice.delta);
  //           const textRs = choice.delta.content;
  //           if (typeof textRs === 'string') {
  //             // r[r.length - 1].content += textRs;
  //             content += textRs;
  //           }
  //           else if (typeof choice.delta.role === 'string') {
  //             roleChat = choice.delta.role;
  //           }
  //           console.log(textRs);
  //         } catch (error) {
  //           console.log(error);
  //         }
  //         this.fetchEvent.emit(content);
  //       },
  //       onclose: () => {
  //         // res.end();
  //         console.log('closed');
  //       },
  //       onerror: (error) => {
  //         console.log(error);
  //       },
  //     });

  //   } catch (error) {
  //     if (error.response?.status) {
  //       console.error(error.response.status, error.message);
  //       error.response.data.on('data', data => {
  //         const message = data.toString();
  //         try {
  //           const parsed = JSON.parse(message);
  //           console.error('An error occurred during OpenAI request: ', parsed);
  //         } catch (errorO) {
  //           console.error('An error occurred during OpenAI request: ', message);
  //         }
  //       });
  //     } else {
  //       console.error('An error occurred during OpenAI request', error);
  //     }
  //   }
  //   if (content && roleChat) {
  //     this.messages.push({ role: roleChat, content });
  //   }
  // }
  stropStreamingData() {
    this.ctrl.abort();
    this.ctrl = new AbortController()
  }
}

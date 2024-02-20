import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextToSpeechPage } from './text-to-speech.page';

describe('TextToSpeechPage', () => {
  let component: TextToSpeechPage;
  let fixture: ComponentFixture<TextToSpeechPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TextToSpeechPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

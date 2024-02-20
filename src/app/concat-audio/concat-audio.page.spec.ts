import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcatAudioPage } from './concat-audio.page';

describe('ConcatAudioPage', () => {
  let component: ConcatAudioPage;
  let fixture: ComponentFixture<ConcatAudioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConcatAudioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioBookPage } from './audio-book.page';

describe('AudioBookPage', () => {
  let component: AudioBookPage;
  let fixture: ComponentFixture<AudioBookPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AudioBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

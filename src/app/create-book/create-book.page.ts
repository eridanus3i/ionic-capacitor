import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
// import { translate } from '@vitalets/google-translate-api';
// import createHttpProxyAgent from 'http-proxy-agent';
import { ModalController } from '@ionic/angular';
import {OpenModalComponent } from '../open-modal/open-modal.component';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.page.html',
  styleUrls: ['./create-book.page.scss'],
})
export class CreateBookPage implements OnInit, AfterViewInit {
  @ViewChild('selectableText', { static: true })
  selectableText!: ElementRef;
  @ViewChild('selectableParagraph', { static: true }) selectableParagraph!: ElementRef;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    // const word = 'Hello';
    // const newWord = document.createElement('span');
    // newWord.textContent = word;
    // newWord.style.color = 'red';
    // newWord.style.backgroundColor = 'yellow';
    // newWord.style.fontWeight = 'bold';
    // //add new word to the paragraph
    // console.log('this.selectableParagraph', this.selectableParagraph);
    // this.selectableParagraph.nativeElement.appendChild(newWord);
  }

  ngAfterViewInit() {
    // const paragraphString = `Once upon a time in a quaint little village nestled at the edge of a vast forest, there lived two best friends
    // named Luna and Milo. Luna was a spirited young girl with eyes as bright as the morning sun, and Milo was a
    // mischievous boy with a heart as wild as the forest itself. Together, they shared a bond stronger than the tallest
    // trees that surrounded their village.`;
    // //array from the paragraph string
    // const paragraphArray = paragraphString.split(' ');
    // for (let i = 0; i < paragraphArray.length; i++) {
    //   const word = paragraphArray[i];
    //   const newWord = document.createElement('span');
    //   newWord.textContent = word + ' ';
    //   newWord.style.color = 'red';
    //   newWord.style.backgroundColor = 'yellow';
    //   newWord.style.fontWeight = 'bold';
    //   // Add margin-bottom to create space between lines
    //   newWord.style.marginBottom = '15px';
    //   //add new word to the paragraph
    //   console.log('this.selectableParagraph', this.selectableParagraph);
    //   this.selectableParagraph.nativeElement.appendChild(newWord);
    //   //add click event to the word
    //   newWord.addEventListener('click', () => {
    //     this.showTextRectangle(newWord);
    //   });
    // }
  }

  async handleSelection(event: MouseEvent) {
    console.log('handleSelection');
    const selection = window.getSelection()?.getRangeAt(0); // Get the selection range
    //get the selected text for  android
    console.log('selection', selection);
    const selectedText = selection?.toString().trim(); // Get the selected text
    if (selectedText) {
      const rect = selection?.getBoundingClientRect(); // Get the position of the selected text

      // Clear previously displayed rectangles
      this.clearSelectionRectangles();

      // Create a div for the rectangle
      const rectangle = document.createElement('div');
      rectangle.classList.add('selection-rectangle');
      rectangle.textContent = selectedText;

      const textContent = await this.translateText(selectedText);
      console.log('textContent', textContent);

      if (rect) {
        // Position the rectangle above the selected text within the #selectableText div
        rectangle.style.top = `${rect?.top - this.selectableText.nativeElement.getBoundingClientRect().top}px`;
        rectangle.style.left = `${rect?.left - this.selectableText.nativeElement.getBoundingClientRect().left}px`;
        rectangle.style.border = '1px solid red';
        rectangle.style.position = 'absolute';
        rectangle.style.width = `${rect?.width}px`;
        rectangle.style.height = `${rect?.height}px`;
        rectangle.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        rectangle.style.zIndex = '1000';
        // Append the rectangle to the #selectableText div
        this.selectableText.nativeElement.appendChild(rectangle);
      }
    }
  }

  showTextRectangle(textElement: any) {
    console.log('text', textElement.textContent);
    if (textElement) {
      //clear previously displayed rectangles
      this.clearSelectionRectangles();
      //add rect on the top of textElements
      const rect = textElement.getBoundingClientRect();
      const rectangle = document.createElement('div');
      rectangle.classList.add('selection-rectangle');
      rectangle.textContent = textElement.textContent;
      // Position the rectangle above the selected text within the #selectableText div
      rectangle.style.top = `${rect.top - this.selectableText.nativeElement.getBoundingClientRect().top}px`;
      rectangle.style.left = `${rect.left - this.selectableText.nativeElement.getBoundingClientRect().left}px`;
      rectangle.style.border = '1px solid red';
      rectangle.style.position = 'absolute';
      rectangle.style.width = `${rect.width}px`;
      rectangle.style.height = `${rect.height}px`;
      rectangle.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
      rectangle.style.zIndex = '1000';
      // Append the rectangle to the #selectableText div
      this.selectableText.nativeElement.appendChild(rectangle);
    }
    this.openModal();
  }

  // Function to clear previously displayed rectangles
  clearSelectionRectangles() {
    const existingRectangles = this.selectableText.nativeElement.querySelectorAll('.selection-rectangle');
    existingRectangles.forEach((rectangle: { remove: () => any; }) => rectangle.remove());
  }

  async translateText(textContent: string) {
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: textContent,
        source: "auto",
        target: "en",
        format: "text",
        api_key: ""
      }),
      headers: { "Content-Type": "application/json" }
    });

    console.log(await res.json());
  }

  handleClick(text: string) {
    console.log('text', text);
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: OpenModalComponent,
      // You can pass data to the modal using componentProps if needed
    });
    await modal.present();
  }

  
}

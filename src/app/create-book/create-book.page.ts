import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.page.html',
  styleUrls: ['./create-book.page.scss'],
})
export class CreateBookPage implements OnInit {
  @ViewChild('selectableText', { static: true })
  selectableText!: ElementRef;

  constructor() { }

  ngOnInit() { }

  handleSelection(event: MouseEvent) {
    const selection = window.getSelection()?.getRangeAt(0); // Get the selection range
    const selectedText = selection?.toString().trim(); // Get the selected text
    if (selectedText) {
      const rect = selection?.getBoundingClientRect(); // Get the position of the selected text

      // Clear previously displayed rectangles
      this.clearSelectionRectangles();

      // Create a div for the rectangle
      const rectangle = document.createElement('div');
      rectangle.classList.add('selection-rectangle');
      rectangle.textContent = selectedText;

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

  // Function to clear previously displayed rectangles
  clearSelectionRectangles() {
    const existingRectangles = this.selectableText.nativeElement.querySelectorAll('.selection-rectangle');
    existingRectangles.forEach((rectangle: { remove: () => any; }) => rectangle.remove());
  }
}

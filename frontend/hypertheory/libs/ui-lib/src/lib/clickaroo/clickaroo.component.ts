import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'hypertheory-clickaroo',
  templateUrl: './clickaroo.component.html',
  styleUrls: ['./clickaroo.component.css'],
})
export class ClickarooComponent {
  @Output() buttonClicked = new EventEmitter<string>();
  doIt(el: HTMLInputElement) {
    this.buttonClicked.emit(el.value);
    el.value = '';
    el.focus();
    // clear out the text box.
    // put the cursor focus back into it.
  }
}

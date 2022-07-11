import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.css'],
})
export class LinkButtonComponent implements OnInit {
  @Input() btnStyle: 'primary' | 'danger' | 'success' = 'primary';
  @Input() btnSize: 'sm' | 'md' | 'lg' = 'md';

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-status-indicator',
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.css'],
})
export class StatusIndicatorComponent implements OnInit {
  constructor() {}
  @Input() status: 'success' | 'optional' | 'error' = 'success';
  @Input() statusText = '';
  ngOnInit(): void {
    this.statusText = this.statusText || this.status;
  }
}

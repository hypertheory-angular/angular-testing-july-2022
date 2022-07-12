import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hypertheory-ui-lib-status-indicator',
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.css'],
})
export class StatusIndicatorComponent implements OnInit {

  @Input() status: 'success' | 'optional' | 'error' = 'success';
  @Input() statusText = '';
  ngOnInit(): void {
    this.statusText = this.statusText || this.status;
  }
}

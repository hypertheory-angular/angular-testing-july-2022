import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ui-dev-tip',
  templateUrl: './dev-tip.component.html',
  styleUrls: ['./dev-tip.component.css'],
})
export class DevTipComponent implements OnInit {
  readonly isDev = environment.production === false;

  constructor() {}

  ngOnInit(): void {}
}

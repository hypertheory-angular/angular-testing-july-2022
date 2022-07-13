import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkButtonComponent } from './link-button/link-button.component';
import { RouterModule } from '@angular/router';

import { StatusIndicatorComponent } from './status-indicator/status-indicator.component';
import { ClickarooComponent } from './clickaroo/clickaroo.component';

@NgModule({
  declarations: [
    LinkButtonComponent,

    StatusIndicatorComponent,
      ClickarooComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [LinkButtonComponent, StatusIndicatorComponent, ClickarooComponent],
})
export class UiLibModule {}

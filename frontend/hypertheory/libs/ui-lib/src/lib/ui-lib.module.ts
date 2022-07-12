import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkButtonComponent } from './link-button/link-button.component';
import { RouterModule } from '@angular/router';

import { StatusIndicatorComponent } from './status-indicator/status-indicator.component';

@NgModule({
  declarations: [
    LinkButtonComponent,

    StatusIndicatorComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [LinkButtonComponent, StatusIndicatorComponent],
})
export class UiLibModule {}

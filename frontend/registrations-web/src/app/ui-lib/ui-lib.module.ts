import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkButtonComponent } from './link-button/link-button.component';
import { RouterModule } from '@angular/router';
import { DevTipComponent } from './dev-tip/dev-tip.component';
import { StatusIndicatorComponent } from './status-indicator/status-indicator.component';

@NgModule({
  declarations: [
    LinkButtonComponent,
    DevTipComponent,
    StatusIndicatorComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [LinkButtonComponent, DevTipComponent, StatusIndicatorComponent],
})
export class UiLibModule {}

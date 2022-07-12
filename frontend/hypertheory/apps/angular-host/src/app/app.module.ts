import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiLibModule } from '@hypertheory/ui-lib'
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, UiLibModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

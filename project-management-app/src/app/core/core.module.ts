import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    WelcomePageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }

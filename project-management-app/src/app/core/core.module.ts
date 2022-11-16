import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { L10nTranslationModule, L10nIntlModule } from 'angular-l10n';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { l10nConfig } from './constants/l10n-config';

const routes: Routes = [{ path: '', component: WelcomePageComponent }];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NotFoundPageComponent, WelcomePageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    L10nTranslationModule.forRoot(l10nConfig),
    L10nIntlModule,
  ],
  exports: [HeaderComponent, FooterComponent, WelcomePageComponent],
})
export class CoreModule {}

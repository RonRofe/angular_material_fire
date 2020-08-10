import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SideNavListComponent } from './navigation/side-nav-list/side-nav-list.component';

import { AuthGuard } from './auth/auth-guard.service';

import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/traning.service';
import { UIService } from './shared/ui.service';

import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SideNavListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),

    MaterialModule,
    AuthModule,
    TrainingModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    TrainingService,
    UIService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

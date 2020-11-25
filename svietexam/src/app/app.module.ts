import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from './material/material.module';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { AuthguardGuard } from './guard/authguard.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ExamlistComponent } from './components/examlist/examlist.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExamComponent } from './components/exam/exam.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthserviceService } from './service/authservice.service';
import { DialogboxComponent } from './components/dialogbox/dialogbox.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExamlistComponent,
    LoaderComponent,
    PagenotfoundComponent,
    HeaderComponent,
    FooterComponent,
    ExamComponent,
    DialogboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthguardGuard,
    AuthserviceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

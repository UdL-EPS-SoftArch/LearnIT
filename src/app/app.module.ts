import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AboutComponent} from './about/about.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NotFoundComponent} from './error-handler/error-alert/not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbCollapseModule, NgbDropdownModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {NgxHalClientModule} from '@lagoshny/ngx-hal-client';
import {LoginBasicModule} from './login-basic/login-basic.module';
import {ErrorHandlerModule} from './error-handler/error-handler.module';
import {AuthenticationBasicService} from './login-basic/authentication-basic.service';
import {LoggedInGuard} from './login-basic/loggedin.guard';
import {HttpErrorInterceptor} from './error-handler/http-error-interceptor';
import {AuthInterceptor} from './login-basic/auth-interceptor';
import {ExternalConfigurationService} from './external-configuration-service';
import { StudentSearchComponent } from './student/student-search/student-search.component';
import { StudentRegisterComponent } from './student/student-register/student-register.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentEditComponent } from './student/student-edit/student-edit.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { StudentDeleteComponent } from './student/student-delete/student-delete.component';
import {StudentService} from './student/student.service';
import {QuestionService} from './question/question.service';
import {NewQuestionComponent} from './question/question-add/question-add.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {QuestionListComponent} from './question/question-list/question-list.component';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    StudentSearchComponent,
    StudentRegisterComponent,
    StudentListComponent,
    StudentEditComponent,
    StudentDetailComponent,
    StudentDeleteComponent,
    NewQuestionComponent,
    QuestionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgxHalClientModule.forRoot(),
    LoginBasicModule,
    ErrorHandlerModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NoopAnimationsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },
    AuthenticationBasicService, LoggedInGuard, StudentService, QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

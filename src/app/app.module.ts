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
import {QuestionDeleteComponent} from './question/question-delete/question-delete.component';
import {QuestionDetailComponent} from './question/question-detail/question-detail.component';
import {QuestionEditComponent} from './question/question-edit/question-edit.component';
import {LevelService} from './level/level.service';
import {LevelListComponent} from './level/level-list/level-list.component';
import {LevelDetailComponent} from './level/level-detail/level-detail.component';
import {TopicService} from './topic/topic.service';
import {TheoryService} from './theory/theory.service';
import {NewTheoryComponent} from './theory/theory-add/theory-add.component';
import {TheoryListComponent} from './theory/theory-list/theory-list.component';
import {TheoryDetailComponent} from './theory/theory-detail/theory-detail.component';
import {TheoryDeleteComponent} from './theory/theory-delete/theory-delete.component';
import {TheoryEditComponent} from './theory/theory-edit/theory-edit.component';
import {YouTubePlayerModule} from '@angular/youtube-player';



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
    QuestionListComponent,
    QuestionDeleteComponent,
    QuestionDetailComponent,
    QuestionEditComponent,
    LevelListComponent,
    LevelDetailComponent,
    QuestionEditComponent,
    NewTheoryComponent,
    TheoryListComponent,
    TheoryDetailComponent,
    TheoryDeleteComponent,
    TheoryEditComponent
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
    BrowserAnimationsModule,
    YouTubePlayerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },
    AuthenticationBasicService, LoggedInGuard, StudentService, QuestionService, LevelService, TopicService,TheoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

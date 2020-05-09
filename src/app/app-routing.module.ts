import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './error-handler/error-alert/not-found.component';
import {StudentRegisterComponent} from './student/student-register/student-register.component';
import {StudentEditComponent} from './student/student-edit/student-edit.component';
import {StudentDeleteComponent} from './student/student-delete/student-delete.component';
import {StudentDetailComponent} from './student/student-detail/student-detail.component';
import {StudentListComponent} from './student/student-list/student-list.component';
import {NewQuestionComponent} from './question/question-add/question-add.component';
import {QuestionListComponent} from './question/question-list/question-list.component';
import {QuestionDeleteComponent} from './question/question-delete/question-delete.component';
import {QuestionDetailComponent} from './question/question-detail/question-detail.component';
import {QuestionEditComponent} from './question/question-edit/question-edit.component'
import {NewTheoryComponent} from './theory/theory-add/theory-add.component';
import {TheoryListComponent} from './theory/theory-list/theory-list.component';
import {TheoryDetailComponent} from './theory/theory-detail/theory-detail.component';
import {TheoryDeleteComponent} from './theory/theory-delete/theory-delete.component';
import {TheoryEditComponent} from './theory/theory-edit/theory-edit.component';
import {NewFinalLevelExamComponent} from './FinalLevelExam/FinalLevelExam-add/FinalLevelExam-add.component';
import {FinalLevelExamListComponent} from './FinalLevelExam/FinalLevelExam-list/FinalLevelExam-list.component';
import {FinalLevelExamDetailComponent} from './FinalLevelExam/FinalLevelExam-detail/FinalLevelExam-detail.component';
import {FinalLevelExamDeleteComponent} from './FinalLevelExam/FinalLevelExam-delete/FinalLevelExam-delete.component';
import {FinalLevelExamEditComponent} from './FinalLevelExam/FinalLevelExam-edit/FinalLevelExam-edit.component';


const routes: Routes = [
  { path: 'register', component: StudentRegisterComponent},
  { path: 'students/:id/edit', component: StudentEditComponent, canActivate: [LoggedInGuard] },
  { path: 'students/:id/delete', component: StudentDeleteComponent, canActivate: [LoggedInGuard] },
  { path: 'students/:id', component: StudentDetailComponent, canActivate: [LoggedInGuard] },
  { path: 'students', component: StudentListComponent, canActivate: [LoggedInGuard] },
  { path: 'questions', component: QuestionListComponent, canActivate: [LoggedInGuard] },
  { path: 'questions/:id/delete', component: QuestionDeleteComponent, canActivate: [LoggedInGuard] },
  { path: 'questions/:id', component: QuestionDetailComponent, canActivate: [LoggedInGuard] },
  { path: 'questions/:id/edit', component: QuestionEditComponent, canActivate: [LoggedInGuard] },
  { path: 'newQuestion', component: NewQuestionComponent, canActivate: [LoggedInGuard] },
  { path: 'newTheory', component: NewTheoryComponent, canActivate: [LoggedInGuard] },
  { path: 'theories', component: TheoryListComponent, canActivate: [LoggedInGuard] },
  { path: 'theories/:id', component: TheoryDetailComponent, canActivate: [LoggedInGuard] },
  { path: 'theories/:id/delete', component: TheoryDeleteComponent, canActivate: [LoggedInGuard] },
  { path: 'theories/:id/edit', component: TheoryEditComponent, canActivate: [LoggedInGuard] },
  { path: 'about', component: AboutComponent },
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'newFinalLevelExam', component: NewFinalLevelExamComponent, canActivate: [LoggedInGuard] },
  { path: 'finalLevelExams', component: FinalLevelExamListComponent, canActivate: [LoggedInGuard] },
  { path: 'finalLevelExams/:id', component: FinalLevelExamDetailComponent, canActivate: [LoggedInGuard] },
  { path: 'finalLevelExams/:id/delete', component: FinalLevelExamDeleteComponent, canActivate: [LoggedInGuard] },
  { path: 'finalLevelExams/:id/edit', component: FinalLevelExamEditComponent, canActivate: [LoggedInGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


import { Component, OnInit } from '@angular/core';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Router} from '@angular/router';

import { Exam } from '../exam';
import { ExamService } from '../exam.service';
import {Level} from '../../level/level';
import {LevelService} from '../../level/level.service';
import { Topic } from '../../topic/topic';
import { TopicService } from '../../topic/topic.service';
import { Student } from '../../student/student';
import { StudentService } from '../../student/student.service';
import { StudentExam } from '../../manytomany/students_exams';
import { StudentExamService } from '../../manytomany/students_exams.service';

import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';


@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html'
})

export class ExamListComponent implements OnInit {

  public exams: Exam[] = [];

  public student: Student;

  public studentsExams: StudentExam[] = [];

  public levels: Level[] = [];
  public level: Level;

  public topics: Topic[] = [];
  public topic: Topic;

  public pageSize = 10;
  public page = 1;
  public totalRecipes = 0;

  private sorting: Sort[] = [{ path: 'statement', order: 'ASC' }];

  constructor(
    public router: Router,
    private examService: ExamService,
    private studentExamService: StudentExamService,
    private authenticationService: AuthenticationBasicService) {
      console.log('list exam constructor');
  }

  ngOnInit() {
    console.log('list exam init');

    if (this.isRole('Student')) {

      this.student = this.authenticationService.getCurrentUser();
       // console.log(this.student);

      this.studentExamService.findByStudent(this.student).subscribe(
        (resultStudentsExams: StudentExam[]) => {
           // console.log(resultStudentsExams)

          for (const studentExam of resultStudentsExams) {
             // console.log(student_exam);

            studentExam._embedded.exam.pendent = studentExam.pendent;
            studentExam._embedded.exam.mark = studentExam.mark;
            studentExam._embedded.exam._links = studentExam._links;
            studentExam._embedded.exam.uri = studentExam._embedded.exam.uri;

            this.exams.push(studentExam._embedded.exam);
          }
          console.log(this.exams);
        });
    }
    else {
      this.examService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
        (exams: Exam[]) => {
          this.exams = exams;
          this.totalRecipes = this.examService.totalElement();
          console.log(this.exams)
        });
      }
  }

  changePage() {
    console.log('list exam change page');

    this.examService.page(this.page - 1).subscribe(
      (exams: Exam[]) => this.exams = exams);
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  changeLevel(value: any) {
    console.log('change theory filter level');
  }

  changeTopic(value: any) {
      console.log('change theory filter topic');
  }
}



//

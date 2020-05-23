
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Sort} from '@lagoshny/ngx-hal-client';
import {NgForm} from '@angular/forms';

import {Exam} from '../exam';
import {ExamService} from '../exam.service';

import {Question} from '../../question/question';
import {QuestionService} from '../../question/question.service';

import { Student } from '../../student/student';
import { StudentService } from '../../student/student.service';

import { StudentExam } from '../../manytomany/students_exams';
import { StudentExamService } from '../../manytomany/students_exams.service';

import { ExamQuestion } from '../../manytomany/exams_questions';
import { ExamQuestionService } from '../../manytomany/exams_questions.service';



@Component({
  selector: 'app-exam-add',
  templateUrl: './exam-add.component.html'
})

export class NewExamComponent implements OnInit {

  public exam: Exam;

  public name: string = '';

  public numberOfQuestions = 0;
  public mark = 1;
  public pendent: boolean = true;

  public questions: Question[] = [];
  public question: Question;

  public QuestionsSelected: string[] = [];
  public StudentsSelected: string[] = [];

  public EXAM_QUESTION: ExamQuestion;
  public STUDENT_EXAM: StudentExam;

  public students: Student[] = [];
  public student: Student;

   // public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'statement', order: 'ASC' }];

  constructor(
    private router: Router,
    private examService: ExamService,
    private questionService: QuestionService,
    private studentService: StudentService,
    private studentExamService: StudentExamService,
    private examQuestionService: ExamQuestionService) {

      console.log('new exam constructor');
  }

  ngOnInit(): void {
    console.log('new exam init');

    this.exam = new Exam();

    this.questionService.getAll({sort: this.sorting}).subscribe(
      (questions: Question[]) => {
        console.log(questions);

         // this.totalRecipes = this.questionService.totalElement();

        this.questions = questions;
      });

    this.studentService.getAll({sort: this.sorting}).subscribe(
      (students: Student[]) => {
        console.log(students);

        this.students = students;
      });
  }


  onSubmit(form: NgForm): void {
    console.log('new exam submit');
    console.log(form);

    this.exam.nbOfQuestions = this.QuestionsSelected.length;

     // console.log(this.exam);
     // console.log(this.questions_selected);
     // console.log(this.students_selected);

    this.examService.create(this.exam).subscribe(
      (exam: Exam) => {
        this.exam = exam;
        console.log(this.exam);
        console.log(this.exam._links.self.href);

        for (let Q_SELECTED of this.QuestionsSelected) {

          let QUESTION_ID = Q_SELECTED.split('/')[2];

          this.EXAM_QUESTION = new ExamQuestion();

          this.questionService.get(QUESTION_ID).subscribe(
            (question: Question) => {
              console.log(question);
              console.log(question._links.self.href);

              this.EXAM_QUESTION.question = question;
               // this.exam_question.question = question._links.self.href;
               // this.exam_question.question_id = question_id;

              this.EXAM_QUESTION.exam = this.exam;
               // this.exam_question.exam = this.exam._links.self.href;
               // this.exam_question.exam_id = this.exam.id;
              console.log(this.EXAM_QUESTION);

              this.examQuestionService.create(this.EXAM_QUESTION).subscribe(
                (examQuestion: ExamQuestion) => {
                  console.log(examQuestion);
                });

            });
        }

        for (let sSelected of this.StudentsSelected) {

          let studentId = sSelected.split('/')[2];

          this.STUDENT_EXAM = new StudentExam();

          this.studentService.get(studentId).subscribe(
            (student: Student) => {
              this.STUDENT_EXAM.exam = this.exam;
              this.STUDENT_EXAM.student = student;

              this.studentExamService.create(this.STUDENT_EXAM).subscribe(
                (studentExam: StudentExam) => {
                  this.router.navigate(['exams']);
                }
              );
            });
        }

      });

  }

}



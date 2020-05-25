
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

  public mark = 1;
  public pendent = true;

  public questions: Question[] = [];
  public question: Question;

  public questionsSelected: string[] = [];
  public studentsSelected: string[] = [];

  public examQuestion: ExamQuestion;
  public studentExam: StudentExam;

  public students: Student[] = [];
  public student: Student;

  public totalRecipes = 0;
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
        // console.log(questions);
        this.questions = questions;
      });

    this.studentService.getAll({sort: this.sorting}).subscribe(
      (students: Student[]) => {
        // console.log(students);
        this.students = students;
      });
  }


  onSubmit(form: NgForm): void {
    console.log('new exam submit');
    console.log(form);

    this.exam.nbOfQuestions = this.questionsSelected.length;

    this.examService.create(this.exam).subscribe(
      (exam: Exam) => {
        this.exam = exam;
        console.log(this.exam);
        console.log(this.exam._links.self.href);

        for (const qSelected of this.questionsSelected) {

          const questionId = qSelected.split('/')[2];

          this.examQuestion = new ExamQuestion();

          this.questionService.get(questionId).subscribe(
            (question: Question) => {
              // console.log(question);

              this.examQuestion.question = question;

              this.examQuestion.exam = this.exam;
              console.log(this.examQuestion);

              this.examQuestionService.create(this.examQuestion).subscribe(
                (resultExamQuestion: ExamQuestion) => {
                  console.log(resultExamQuestion);
                });

            });
        }

        for (const sSelected of this.studentsSelected) {

          const studentId = sSelected.split('/')[2];

          this.studentExam = new StudentExam();

          this.studentService.get(studentId).subscribe(
            (resultStudent: Student) => {
              // console.log(resultStudent);

              this.studentExam.exam = this.exam;
              this.studentExam.student = student;

              this.studentExamService.create(this.studentExam).subscribe(
                (results
                  resultStudentExam: StudentExam) => {
                  // console.log(resultStudentExam);
                }
              );
            });
        }

      });


    this.router.navigate(['exams'])
  }

}




//

import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../../services';
import { Question } from '../../model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  questions: Question[];
  sub: any;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.sub = this.questionService.getQuestions().subscribe(questions => this.questions = questions);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';

import { Category, Question, Answer } from '../../model';
import { CategoryService, TagService, QuestionService } from '../../services';

@Component({
  selector: 'app-question-add-update',
  templateUrl: './question-add-update.component.html',
  styleUrls: ['./question-add-update.component.scss']
})
export class QuestionAddUpdateComponent implements OnInit, OnDestroy {

  categories: Category[];
  sub: any;

  tags: string[];
  sub2: any;

  questionForm: FormGroup;
  question: Question;

  autoTags: string[] = [];
  enteredTags: string[] = [];

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }
  get tagsArray(): FormArray {
    return this.questionForm.get('tagsArray') as FormArray;
  }

  constructor(private fb: FormBuilder, private router: Router,
              private categoryService: CategoryService, private tagService: TagService,
              private questionService: QuestionService) { }

  ngOnInit() {
    this.question = new Question();
    this.createForm(this.question);

    const questionControl = this.questionForm.get('questionText');

    questionControl.valueChanges.debounceTime(500).subscribe(v => this.computeAutoTags());
    this.answers.valueChanges.debounceTime(500).subscribe(v => this.computeAutoTags());

    this.sub = this.categoryService.getCategories()
                .subscribe(categories => this.categories = categories);

    this.sub2 = this.tagService.getTags()
                .subscribe(tags => this.tags = tags);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  addTag() {
    const tag = this.questionForm.get('tags').value;
    if (tag) {
      if (this.enteredTags.indexOf(tag) < 0) {
        this.enteredTags.push(tag);
      }
      this.questionForm.get('tags').setValue('');
    }
    this.setTagsArray();
  }

  removeEnteredTag(tag) {
    this.enteredTags = this.enteredTags.filter(t => t !== tag);
    this.setTagsArray();
  }

  onSubmit() {
    this.questionForm.updateValueAndValidity();
    if (this.questionForm.invalid) {
      return;
    }
    console.log(this.questionForm.value);
    const question: Question = this.getQuestionFromFormValue(this.questionForm.value);
    console.log(question);
    this.saveQuestion(question);
  }

  getQuestionFromFormValue(formValue: any): Question {
    let question: Question;

    question = new Question();
    question.questionText = formValue.questionText;
    question.answers = formValue.answers;
    question.categoryIds = [formValue.category];
    question.tags = [...this.autoTags, ...this.enteredTags];
    question.ordered = formValue.ordered;
    question.explanation = formValue.explanation;

    return question;
  }

  createForm(question: Question) {

    const fgs: FormGroup[] = question.answers.map(answer => {
      const fg = new FormGroup({
        answerText: new FormControl(answer.answerText, Validators.required),
        correct: new FormControl(answer.correct),
      });
      return fg;
    });
    const answersFA = new FormArray(fgs);

    let fcs: FormControl[] = question.tags.map(tag => {
      const fc = new FormControl(tag);
      return fc;
    });
    if (fcs.length === 0) {
      fcs = [new FormControl('')];
    }
    const tagsFA = new FormArray(fcs);

    this.questionForm = this.fb.group({
      category: [(question.categories.length > 0 ? question.categories[0] : ''), Validators.required],
      questionText: [question.questionText, Validators.required],
      tags: '',
      tagsArray: tagsFA,
      answers: answersFA,
      ordered: [question.ordered],
      explanation: [question.explanation]
    }, {validators: questionFormValidator});
  }

  setTagsArray() {
    this.tagsArray.controls = [];
    [...this.autoTags, ...this.enteredTags].forEach(tag => this.tagsArray.push(new FormControl(tag)));
  }

  saveQuestion(question: Question) {
    this.questionService.saveQuestion(question).subscribe(response => {
      console.log('navigating...');
      this.router.navigate(['/questions']);
    });
  }

  computeAutoTags() {
    const formValue = this.questionForm.value;

    const allTextValues: string[] = [formValue.questionText];
    formValue.answers.forEach(answer => allTextValues.push(answer.answerText));

    const wordString: string = allTextValues.join(' ');

    const matchingTags: string[] = [];
    this.tags.forEach(tag => {
      const patt = new RegExp('\\b(' + tag.replace("+", "\\+") + ')\\b', 'ig');
      if ( wordString.match(patt)) {
        matchingTags.push(tag);
      }
    });
    this.autoTags = matchingTags;

    this.setTagsArray();
  }
}

function questionFormValidator(fg: FormGroup): {[key: string]: boolean} {
  const answers: Answer[] = fg.get('answers').value;
  if (answers.filter(answer => answer.correct).length !== 1) {
    return {'correctAnswerCountInvalid': true};
  }
  const tags: string[] = fg.get('tagsArray').value;
  if (tags.length < 3) {
    return {'tagCountInvalid': true};
  }
  return null;
}

import { Routes } from '@angular/router';
import { CategoryComponent, TagComponent, QuestionComponent, QuestionAddUpdateComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/categories',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    component: CategoryComponent
  },
  {
    path: 'tags',
    component: TagComponent
  },
  {
    path: 'questions',
    component: QuestionComponent
  },
  {
    path: 'question/add',
    component: QuestionAddUpdateComponent
  }
];

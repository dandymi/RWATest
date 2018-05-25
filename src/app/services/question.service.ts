import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
//    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private prefix = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.prefix + '/questions');
  }

  saveQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.prefix + '/questions', question, httpOptions);
  }

}

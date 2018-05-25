import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import './rxjs-extensions';
import { MatCardModule,
         MatCommonModule,
         MatSidenavModule,
         MatButtonModule,
         MatListModule,
         MatIconModule,
         MatToolbarModule,
         MatChipsModule,
         MatSelectModule,
         MatInputModule,
         MatCheckboxModule } from '@angular/material';
import {PlatformModule} from '@angular/cdk/platform';
import {ObserversModule} from '@angular/cdk/observers';

import { AppComponent, CategoryComponent, TagComponent, QuestionComponent, QuestionAddUpdateComponent } from './components';
import { CategoryService, QuestionService } from './services';
import { routes } from './app.route';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    TagComponent,
    QuestionComponent,
    QuestionAddUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatCommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ObserversModule,
    PlatformModule
  ],
  exports: [
    MatCardModule,
    MatCommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ObserversModule,
    PlatformModule
  ],
  providers: [CategoryService, QuestionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

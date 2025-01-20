import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { ChatComponent } from './components/chat/chat.components';
import { AuthorBooksListComponent } from './components/author-book-list/author-book-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorListComponent,
    BookListComponent,
    ChatComponent,
    AuthorBooksListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/autores', pathMatch: 'full' },
      { path: 'autores', component: AuthorListComponent },
      { path: 'livros', component: BookListComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'autores/:id/livros', component: AuthorBooksListComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
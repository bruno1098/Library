import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { ChatComponent } from './components/chat/chat.components';
import { AuthorBooksListComponent } from './components/author-book-list/author-book-list.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';

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
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'autores', component: AuthorListComponent },
      { path: 'autores/:id/livros', component: AuthorBooksListComponent },
      { path: 'livros', component: BookListComponent },
      { path: 'chat', component: ChatComponent }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { ChatComponent } from './components/chat/chat.components';

@NgModule({
  declarations: [
    AppComponent,
    AuthorListComponent,
    BookListComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'autores', component: AuthorListComponent },
      { path: 'livros', component: BookListComponent },
      { path: 'chat', component: ChatComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
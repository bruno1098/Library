import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-author-books-list',
  template: `
    <div class="books-container">
      <h2>Livros do Autor</h2>
      <ul class="books-list">
        <li *ngFor="let book of books" class="book-item">
          <div class="book-title">{{ book.title }}</div>
          <div class="book-details">
            <span class="publication-date">{{ book.publicationDate | date:'yyyy' }}</span>
            <span class="separator">|</span>
            <span class="author-name">{{ book.author.name }}</span>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .books-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    h2 {
      margin-bottom: 1.5rem;
      text-align: center;
      color: #1e3c72;
    }
    .books-list {
      list-style-type: none;
      padding: 0;
    }
    .book-item {
      padding: 1rem;
      border-bottom: 1px solid #ddd;
      transition: background-color 0.3s;
    }
    .book-item:hover {
      background-color: #f1f1f1;
    }
    .book-title {
      font-size: 1.2rem;
      font-weight: bold;
      color: #333;
    }
    .book-details {
      font-size: 0.9rem;
      color: #666;
      display: flex;
      align-items: center;
    }
    .separator {
      margin: 0 0.5rem;
    }
    .author-name {
      font-style: italic;
    }
  `]
})
export class AuthorBooksListComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService
  ) {}

  ngOnInit() {
    const authorId = this.route.snapshot.paramMap.get('id');
    if (authorId) {
      this.authorService.getAuthorBooks(+authorId).subscribe((data) => {
        this.books = data;
      });
    }
  }
} 
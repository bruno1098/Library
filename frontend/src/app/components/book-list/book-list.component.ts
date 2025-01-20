import { Component, OnInit, signal } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';
import { Book } from '../../models/book.model';
import { Author } from '../../models/author.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  template: `
    <div class="page-container">
      <div class="header-actions">
        <h2>Livros</h2>
        <button *ngIf="!showAddForm" (click)="showAddForm = true" class="add-button">
          <i class="fas fa-plus"></i> Adicionar Livro
        </button>
      </div>

      <!-- Formulário de Livro -->
      <div class="form-container" *ngIf="showAddForm">
        <h3>{{ editingBook ? 'Editar' : 'Novo' }} Livro</h3>
        <form (ngSubmit)="saveBook()">
          <div class="form-group">
            <label for="title">Título:</label>
            <input 
              type="text" 
              id="title" 
              [(ngModel)]="newBook.title" 
              name="title" 
              required
              placeholder="Digite o título do livro"
            >
          </div>
          <div class="form-group">
            <label for="publicationDate">Data de Publicação:</label>
            <input 
              type="date" 
              id="publicationDate" 
              [(ngModel)]="newBook.publicationDate" 
              name="publicationDate" 
              required
            >
          </div>
          <div class="form-group">
            <label for="author">Autor:</label>
            <select 
              id="author" 
              [(ngModel)]="newBook.authorId" 
              name="author" 
              required
              class="select-input"
            >
              <option value="">Selecione um autor</option>
              <option *ngFor="let author of authors()" [value]="author.id">
                {{ author.name }}
              </option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="primary">
              {{ editingBook ? 'Atualizar' : 'Adicionar' }}
            </button>
            <button type="button" class="secondary" (click)="cancelEdit()">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Lista de Livros -->
      <div class="grid-container">
        <div *ngFor="let book of books()" class="card">
          <div class="card-content">
            <h3>{{ book.title }}</h3>
            <p class="info">
              <i class="fas fa-calendar"></i>
              Data de Publicação: {{ book.publicationDate | date:'dd/MM/yyyy' }}
            </p>
            <p class="author-info">
              <i class="fas fa-user"></i>
              Autor: {{ book.author.name }}
            </p>
          </div>
          <div class="card-actions">
            <button (click)="editBook(book)" class="edit-button">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button (click)="deleteBook(book.id)" class="delete-button">
              <i class="fas fa-trash"></i> Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .header-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    h2 {
      font-size: 2rem;
      color: #2c3e50;
      margin: 0;
    }
    .form-container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 500;
    }
    .form-group input, .select-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    .form-group input:focus, .select-input:focus {
      border-color: #3498db;
      outline: none;
      box-shadow: 0 0 0 2px rgba(52,152,219,0.2);
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .card-content {
      padding: 1.5rem;
    }
    .card h3 {
      margin: 0 0 1rem 0;
      color: #2c3e50;
      font-size: 1.25rem;
    }
    .info, .author-info {
      color: #666;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .card-actions {
      padding: 1rem 1.5rem;
      border-top: 1px solid #eee;
      display: flex;
      gap: 1rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .add-button {
      background-color: #3498db;
      color: white;
    }
    .add-button:hover {
      background-color: #2980b9;
    }
    .primary {
      background-color: #3498db;
      color: white;
    }
    .primary:hover {
      background-color: #2980b9;
    }
    .secondary {
      background-color: #95a5a6;
      color: white;
    }
    .secondary:hover {
      background-color: #7f8c8d;
    }
    .edit-button {
      background-color: #f39c12;
      color: white;
      flex: 1;
    }
    .edit-button:hover {
      background-color: #d35400;
    }
    .delete-button {
      background-color: #e74c3c;
      color: white;
      flex: 1;
    }
    .delete-button:hover {
      background-color: #c0392b;
    }
  `]
})
export class BookListComponent implements OnInit {
  books = signal<Book[]>([]);
  authors = signal<Author[]>([]);
  showAddForm = false;
  editingBook: Book | null = null;
  newBook: any = {
    title: '',
    publicationDate: new Date(),
    authorId: ''
  };

  constructor(
    private bookService: BookService,
    private authorService: AuthorService
  ) {}

  ngOnInit() {
    this.loadBooks();
    this.loadAuthors();
  }

  loadBooks() {
    this.bookService.getBooks()
      .pipe(
        map(books => books.sort((a, b) => 
          new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
        ))
      )
      .subscribe(books => this.books.set(books));
  }

  loadAuthors() {
    this.authorService.getAuthors()
      .subscribe(authors => this.authors.set(authors));
  }

  saveBook() {
    const bookData = {
      ...this.newBook,
      author: { id: this.newBook.authorId }
    };

    if (this.editingBook) {
      this.bookService.updateBook(this.editingBook.id, bookData)
        .subscribe(() => {
          this.loadBooks();
          this.resetForm();
        });
    } else {
      this.bookService.createBook(bookData)
        .subscribe(() => {
          this.loadBooks();
          this.resetForm();
        });
    }
  }

  editBook(book: Book) {
    this.editingBook = book;
    this.newBook = {
      title: book.title,
      publicationDate: new Date(book.publicationDate),
      authorId: book.author.id
    };
    this.showAddForm = true;
  }

  deleteBook(id: number) {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.bookService.deleteBook(id)
        .subscribe(() => {
          this.loadBooks();
        });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.showAddForm = false;
    this.editingBook = null;
    this.newBook = {
      title: '',
      publicationDate: new Date(),
      authorId: ''
    };
  }
}
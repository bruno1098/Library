import { Component, OnInit, signal } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  template: `
    <div class="page-container">
      <div class="header-actions">
        <h2>Autores</h2>
        <button *ngIf="!showAddForm" (click)="showAddForm = true" class="add-button">
          <i class="fas fa-plus"></i> Adicionar Autor
        </button>
      </div>

   
      <div class="form-container" *ngIf="showAddForm">
        <h3>{{ editingAuthor ? 'Editar' : 'Novo' }} Autor</h3>
        <form (ngSubmit)="saveAuthor()">
          <div class="form-group">
            <label for="name">Nome:</label>
            <input 
              type="text" 
              id="name" 
              [(ngModel)]="newAuthor.name" 
              name="name" 
              required
              placeholder="Digite o nome do autor"
            >
          </div>
          <div class="form-group">
            <label for="birthDate">Data de Nascimento:</label>
            <input 
              type="date" 
              id="birthDate" 
              [(ngModel)]="newAuthor.birthDate" 
              name="birthDate" 
              required
            >
          </div>
          <div class="form-actions">
            <button type="submit" class="primary">
              {{ editingAuthor ? 'Atualizar' : 'Adicionar' }}
            </button>
            <button type="button" class="secondary" (click)="cancelEdit()">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div class="grid-container">
        <div *ngFor="let author of authors()" class="card">
          <div class="card-content">
            <h3>{{ author.name }}</h3>
            <p class="info">
              <i class="fas fa-calendar"></i>
              Data de Nascimento: {{ author.birthDate | date:'dd/MM/yyyy' }}
            </p>
            <div class="books-section">
              <h4><i class="fas fa-book"></i> Livros:</h4>
              <ul>
                <li *ngFor="let book of author.books">
                  {{ book.title }} ({{ book.publicationDate | date:'yyyy' }})
                </li>
                <li *ngIf="author.books?.length === 0" class="no-books">
                  Nenhum livro cadastrado
                </li>
              </ul>
            </div>
          </div>
          <div class="card-actions">
            <button (click)="editAuthor(author)" class="edit-button">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button (click)="deleteAuthor(author.id)" class="delete-button">
              <i class="fas fa-trash"></i> Excluir
            </button>
            <button (click)="viewBooks(author.id)" class="view-books-button">
              <i class="fas fa-eye"></i> Ver Livros
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
    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    .form-group input:focus {
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
    .info {
      color: #666;
      margin-bottom: 1rem;
    }
    .books-section {
      border-top: 1px solid #eee;
      padding-top: 1rem;
    }
    .books-section h4 {
      color: #2c3e50;
      margin: 0 0 0.5rem 0;
    }
    .books-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .books-section li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
      color: #666;
    }
    .no-books {
      color: #999;
      font-style: italic;
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
    .view-books-button {
      background-color: #1e3c72;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .view-books-button:hover {
      background-color: #2a5298;
    }
  `]
})
export class AuthorListComponent implements OnInit {
  authors = signal<Author[]>([]);
  showAddForm = false;
  editingAuthor: Author | null = null;
  newAuthor: Partial<Author> = {
    name: '',
    birthDate: new Date()
  };

  constructor(
    private authorService: AuthorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAuthors().subscribe((data) => {
      this.authors.set(data);
    });
  }

  saveAuthor() {
    if (this.editingAuthor) {
      this.authorService.updateAuthor(this.editingAuthor.id, this.newAuthor)
        .subscribe(() => {
          this.loadAuthors();
          this.resetForm();
        });
    } else {
      this.authorService.createAuthor(this.newAuthor)
        .subscribe(() => {
          this.loadAuthors();
          this.resetForm();
        });
    }
  }

  editAuthor(author: Author) {
    this.editingAuthor = author;
    this.newAuthor = {
      name: author.name,
      birthDate: new Date(author.birthDate)
    };
    this.showAddForm = true;
  }

  deleteAuthor(id: number) {
    if (confirm('Tem certeza que deseja excluir este autor?')) {
      this.authorService.deleteAuthor(id).subscribe(() => {
        this.loadAuthors();
      });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.showAddForm = false;
    this.editingAuthor = null;
    this.newAuthor = {
      name: '',
      birthDate: new Date()
    };
  }

  viewBooks(authorId: number) {
    this.router.navigate(['/autores', authorId, 'livros']);
  }
}
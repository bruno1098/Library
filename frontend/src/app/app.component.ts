import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header>
        <h1>Sistema de Biblioteca</h1>
        <nav>
          <a routerLink="/autores" routerLinkActive="active">
            <i class="fas fa-users"></i> Autores
          </a>
          <a routerLink="/livros" routerLinkActive="active">
            <i class="fas fa-book"></i> Livros
          </a>
          <a routerLink="/chat" routerLinkActive="active">
            <i class="fas fa-comments"></i> Chat
          </a>
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    header {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      padding: 1.5rem 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    h1 {
      font-size: 2rem;
      margin: 0 0 1rem 0;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    nav {
      display: flex;
      gap: 1.5rem;
    }
    nav a {
      color: white;
      text-decoration: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }
    nav a:hover {
      background-color: rgba(255,255,255,0.15);
      transform: translateY(-2px);
    }
    nav a.active {
      background-color: rgba(255,255,255,0.2);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    main {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    i {
      font-size: 1.1rem;
    }
  `]
})
export class AppComponent {
  title = 'Sistema de Biblioteca';
}
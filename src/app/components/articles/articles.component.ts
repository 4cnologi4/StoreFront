import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Article } from '../../models/article.models';
import { ArticleService } from '../../services/articles.service';


@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  selectedClient: Article | null = null;
  showModal = false;
  articleForm: FormGroup;

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {
    this.articleForm = this.fb.group({
      id: [''],
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }

  openModal(client?: Article): void {
    if (client) {
      this.selectedClient = { ...client }; // Clonar el cliente para no modificar directamente los datos originales
      this.articleForm.patchValue(this.selectedClient);
    } else {
      this.selectedClient = null;
      this.articleForm.reset();
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.selectedClient = null;
    this.articleForm.reset();
    this.showModal = false;
  }

  saveArticle(): void {
    if (this.articleForm.valid) {
      const clientData: Article = this.articleForm.value;
      if (this.selectedClient) {
        // Editar cliente existente
        this.articleService.updateArticle(clientData.id, clientData).subscribe(
          (response) => {
            this.getArticles(); // Refrescar la lista de clientes después de la actualización
            this.closeModal();
            alert(response.message);
          },
          error => {
            alert(error)
            console.error(error);
          }
        );
      } else {
        // Crear nuevo cliente
        this.articleService.addArticle(clientData).subscribe(
          () => {
            this.getArticles(); // Refrescar la lista de clientes después de la adición
            this.closeModal();
          },
          error => {
            console.error(error);
          }
        );
      }
    }
  }

  deleteArticle(id: number): void {
    this.articleService.deleteArticle(id).subscribe((response) => {
      this.getArticles(); // Refrescar la lista de clientes después de la eliminación
      this.closeModal();
      alert(response.message);
    });
  }

}

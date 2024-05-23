import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente-service.service';
import { Cliente } from './cliente.model';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class ClienteComponent implements OnInit {
  clients: Cliente[] = [];
  selectedClient: Cliente | null = null;
  showModal = false;
  clientForm: FormGroup;

  constructor(
    private clientService: ClienteService,
    private fb: FormBuilder
  ) {
    this.clientForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      password: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  openModal(client?: Cliente): void {
    if (client) {
      this.selectedClient = { ...client }; // Clonar el cliente para no modificar directamente los datos originales
      this.clientForm.patchValue(this.selectedClient);
    } else {
      this.selectedClient = null;
      this.clientForm.reset();
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.selectedClient = null;
    this.clientForm.reset();
    this.showModal = false;
  }

  saveClient(): void {
    if (this.clientForm.valid) {
      const clientData: Cliente = this.clientForm.value;
      if (this.selectedClient) {
        // Editar cliente existente
        this.clientService.updateClient(clientData.id, clientData).subscribe(
          (response) => {
            this.getClients(); // Refrescar la lista de clientes después de la actualización
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
        this.clientService.addClient(clientData).subscribe(
          () => {
            this.getClients(); // Refrescar la lista de clientes después de la adición
            this.closeModal();
          },
          error => {
            console.error(error);
          }
        );
      }
    }
  }

  deleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe((response) => {
      this.getClients(); // Refrescar la lista de clientes después de la eliminación
      this.closeModal();
      alert(response.message);
    });
  }

}

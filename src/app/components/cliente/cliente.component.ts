import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})

export class ClienteComponent implements OnInit {

  clients: any[] = [];
  selectedClient: any = {};
  showModal = false;

  constructor(private clientservice: ClienteService) { }

  ngOnInit(): void {
    console.log("Hello")
    this.getClients();
  }

  getClients(): void {
    this.clientservice.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  openModalEdit(cliente: any): void {
    this.selectedClient = { ...cliente }; // Clonar el cliente para no modificar directamente los datos originales
    this.showModal = true;
  }

  saveClientEdit(): void {
    // Lógica para guardar el cliente editado y cerrar el modal
    // Se llama al servicio para actualizar el cliente
    this.clientservice.updateClient(this.selectedClient.id, this.selectedClient).subscribe(() => {
      this.showModal = false;
      this.getClients(); // Refrescar la lista de clients después de la actualización
    });
  }

  deleteClient(id: number): void {
    // Lógica para eliminar un cliente
    this.clientservice.deleteClient(id).subscribe(() => {
      this.getClients(); // Refrescar la lista de clients después de la eliminación
    });
  }

}

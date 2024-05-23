import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '../../models/store.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {
  stores: Store[] = [];
  selectedStore: Store | null = null;
  showModal = false;
  storeForm: FormGroup;

  constructor(
    private storeService: StoreService,
    private fb: FormBuilder
  ) {
    this.storeForm = this.fb.group({
      id: [''],
      sucursal: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getStore();
  }

  getStore(): void {
    this.storeService.getStore().subscribe(stores => {
      this.stores = stores;
    });
  }

  openModal(store?: Store): void {
    if (store) {
      this.selectedStore = { ...store };
      this.storeForm.patchValue(this.selectedStore);
    } else {
      this.selectedStore = null;
      this.storeForm.reset();
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.selectedStore = null;
    this.storeForm.reset();
    this.showModal = false;
  }

  saveStore(): void {
    if (this.storeForm.valid) {
      const storeData: Store = this.storeForm.value;
      if (this.selectedStore) {
        this.storeService.updateStore(storeData.id, storeData).subscribe(
          (response) => {
            this.getStore();
            this.closeModal();
            alert(response.message);
          },
          error => {
            alert(error)
            console.error(error);
          }
        );
      } else {
        this.storeService.addStore(storeData).subscribe(
          () => {
            this.getStore();
            this.closeModal();
          },
          error => {
            console.error(error);
          }
        );
      }
    }
  }

  deleteStore(id: number): void {
    this.storeService.deleteStore(id).subscribe((response) => {
      this.getStore();
      this.closeModal();
      alert(response.message);
    });
  }

}

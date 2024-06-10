import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  addModal(id: string) {
    this.modals.next([...this.modals.value, id]);
  }

  removeModal(id: string) {
    this.modals.next(this.modals.value.filter(i => i!== id));
  }

  isOpen(id: string): boolean {
    return this.modals.value.includes(id);
  }

  open(id: string) {
    this.addModal(id);
  }

  close(id: string) {
    this.removeModal(id);
  }
}

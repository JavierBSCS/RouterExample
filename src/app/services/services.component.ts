import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetailsComponent } from './../service-details/service-details.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServiceDetailsComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: { id: number; name: string; category: string; description: string; showDescription: boolean }[] = [];
  serviceToEdit: { id: number; name: string; category: string; description: string } | null = null;
service: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    const savedServices = localStorage.getItem('services');
    this.services = savedServices ? JSON.parse(savedServices) : [];
  }

  addService(newService: any) {
    if (this.serviceToEdit) {
      const index = this.services.findIndex(service => service.id === this.serviceToEdit?.id);
      if (index !== -1) {
        this.services[index] = { ...newService, showDescription: false };
      }
      this.serviceToEdit = null;
    } else {
      const newId = this.services.length > 0 ? Math.max(...this.services.map(service => service.id)) + 1 : 1;
      const serviceWithId = { ...newService, id: newId, showDescription: false };
      this.services.push(serviceWithId);
    }

    this.updateLocalStorage();
  }

  editService(service: any) {
    this.serviceToEdit = { ...service };
  }

  onDelete(index: number) {
    this.services.splice(index, 1);
    this.updateLocalStorage();
  }

  toggleDescription(index: number) {
    // Toggle the 'showDescription' property of the service at the given index
    this.services[index].showDescription = !this.services[index].showDescription;
  }


  private updateLocalStorage() {
    localStorage.setItem('services', JSON.stringify(this.services));
  }
}

import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})

export class ServiceDetailsComponent implements OnChanges {
  @Input() serviceToEdit: { id: number; name: string; category: string; description: string } | null = null;
  @Output() serviceAdded = new EventEmitter<any>();

  serviceId: number = 0;
  serviceName: string = '';
  serviceCategory: string = '';
  serviceDescription: string = '';


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['serviceToEdit'] && this.serviceToEdit) {
      this.serviceId = this.serviceToEdit.id;
      this.serviceName = this.serviceToEdit.name;
      this.serviceCategory = this.serviceToEdit.category;
      this.serviceDescription = this.serviceToEdit.description;
    }
  }


  submitService() {
    const newService = {
      id: this.serviceId,
      name: this.serviceName,
      category: this.serviceCategory,
      description: this.serviceDescription,
    };

    this.serviceAdded.emit(newService);

    // Reset form fields after submission
    this.serviceId = 0;
    this.serviceName = '';
    this.serviceCategory = '';
    this.serviceDescription = '';
  }
}

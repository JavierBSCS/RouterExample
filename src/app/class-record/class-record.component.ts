import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-record',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './class-record.component.html',
  styleUrls: ['./class-record.component.css']
})
export class ClassRecordComponent implements OnInit {
  students: { id: number; name: string; activityType: string }[] = [];
  currentPage = 1;
  pageSize = 5;
  totalStudents = 0;
  selectedStudent: { id: number; name: string; activityType: string } | null = null;
  newStudent = { id: 0, name: '', activityType: '' };
  editStudent: { id: number; name: string; activityType: string } | null = null;
  editMode = false;
  sortKey: keyof typeof this.newStudent | null = null;

  ngOnInit(): void {
    this.loadStudents(); 
  }

  addStudent(): void {
    if (this.newStudent.id && this.newStudent.name && this.newStudent.activityType) {
      
      const studentExists = this.students.some(s => s.id === this.newStudent.id);
      if (studentExists) {
        alert('Student ID already exists! Please use a unique ID.');
      } else {
        this.students.push({ ...this.newStudent });
        this.newStudent = { id: 0, name: '', activityType: '' };
        this.saveStudents();
        this.totalStudents = this.students.length;
        alert('Student added successfully!');
      }
    } else {
      alert('Please fill in all fields.');
    }
  }
  

  viewStudentDetails(student: any): void {
    this.selectedStudent = student;
  }

  closeModal(): void {
    this.selectedStudent = null;
  }

  editStudentDetails(student: any): void {
    this.editStudent = { ...student }; 
    this.editMode = true;
  }

  saveEdit(): void {
    if (this.editStudent) {
      const index = this.students.findIndex(s => s.id === this.editStudent!.id);
      if (index !== -1) {
        this.students[index] = { ...this.editStudent }; 
        alert('Student details updated successfully!');
      }
      this.saveStudents(); 
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editStudent = null;
    this.editMode = false;
  }

  deleteStudent(student: any): void {
    const confirmDelete = confirm(`Are you sure you want to delete ${student.name}?`);
    if (confirmDelete) {

      this.students = this.students.filter(s => s.id !== student.id);
      this.totalStudents = this.students.length;
      this.saveStudents(); 
      alert('Student deleted successfully!');
    }
  }
  
  

  onPageChange(page: number): void {
    this.currentPage = Math.min(Math.max(1, page), this.totalPages);
  }

  getPagedStudents() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.students.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalStudents / this.pageSize);
  }

  sortTable(key: keyof typeof this.newStudent) {
    this.sortKey = key;
    this.students.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    this.saveStudents(); 
  }

  private saveStudents(): void {
    localStorage.setItem('students', JSON.stringify(this.students));
  }

  private loadStudents(): void {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      this.students = JSON.parse(savedStudents);
      this.totalStudents = this.students.length;
    }
  }
}

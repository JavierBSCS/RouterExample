import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CenterComponent } from './center/center.component';
import { RightComponent } from './right/right.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './services/services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { LeftComponent } from './left/left.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ClassRecordComponent } from './class-record/class-record.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CenterComponent,
    RightComponent,
    FooterComponent,
    ServicesComponent,
    LeftComponent,
    ServiceDetailsComponent,
    ClassRecordComponent,  // Import ClassRecordComponent here
    FormsModule  // Add FormsModule here
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MidtermsExam';
}

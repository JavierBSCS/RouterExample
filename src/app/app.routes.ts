import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { LeftComponent } from './left/left.component';
import { RightComponent } from './right/right.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { ClassRecordComponent } from './class-record/class-record.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent, outlet: 'left' },
  { path: 'service-details', component: ServiceDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'user', component: UserComponent },
  { path: 'class-record', component: ClassRecordComponent },
  { path: '**', component: NotFoundComponent },
  
  // Named outlets for layout components
  { path: '', component: HeaderComponent, outlet: 'header' },
  { path: '', component: RightComponent, outlet: 'right' },
  { path: '', component: FooterComponent, outlet: 'footer' },
  { path: '', component: LeftComponent, outlet: 'left' },
];

import { Routes } from '@angular/router';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';

export const routes: Routes = [
    {path: 'estados', component: EstadoListComponent, title: 'Lista de Estados'},
    {path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado'},
];

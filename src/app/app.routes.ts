import { Routes } from '@angular/router';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { estadoResolver } from './components/estado/estado.resolver';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { MunicipioListComponent } from './components/municipio/municipio-list/municipio-list.component';
import { MunicipioFormComponent } from './components/municipio/municipio-form/municipio-form.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { FaixaCardListComponent } from './components/faixa/faixa-card-list/faixa-card-list.component';

export const routes: Routes = [
    {
        path: '',
        component: UserTemplateComponent,
        title: 'e-Commerce',
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'faixas'},

            {path: 'faixas', component: FaixaCardListComponent, title: 'Card de Faixas'},
        ]
    }, 
    {
        path: 'admin',
        component: AdminTemplateComponent,
        title: 'Administrativo',
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'estados'},

            {path: 'estados', component: EstadoListComponent, title: 'Lista de Estados'},
            {path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado'},
            {path: 'estados/edit/:id', component: EstadoFormComponent, 
                title: 'Edição de Estado', resolve: {estado: estadoResolver}},

            {path: 'municipios', component: MunicipioListComponent, title: 'Lista de Municípios'},
            {path: 'municipios/new', component: MunicipioFormComponent, title: 'Novo Município'},
        ]
    }  
];

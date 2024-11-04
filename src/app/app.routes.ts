import { Routes } from '@angular/router';
import { IllnessComponent } from './components/illness/illness.component';
import { InsertarComponent } from './components/illness/insertar/insertar.component';
import { DietComponent } from './components/diet/diet.component';
import { InsertardtComponent } from './components/diet/insertardt/insertardt.component';
import {TreatmentsComponent} from './components/treatments/treatments.component';
import {ListartrComponent} from './components/treatments/listartr/listartr.component';
import {InsertartrComponent} from './components/treatments/insertartr/insertartr.component';

export const routes: Routes = [
    {
        path: 'Enfermedades', component: IllnessComponent,
        children:[
            {path: 'nuevoenf', component: InsertarComponent,

            },
            {
                path: 'edicionesenf/:id', component:InsertarComponent,
            },
        ],
    },
    {
        path:'Dietas', component:DietComponent,
        children:[
            {
                path: 'nuevodt', component: InsertardtComponent,
            },
            {
                path:'edicionesdt/id', component:InsertardtComponent,
            },
        ],
    },
    {
        path:'Tratamientos', component:TreatmentsComponent,
        children:[
            {
                path: 'nuevotr', component: InsertartrComponent,
            },
            {
                path:'edicionestr/id', component:InsertartrComponent,
            },
        ],
    },

];


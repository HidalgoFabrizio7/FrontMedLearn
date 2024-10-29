import { Routes } from '@angular/router';
import { IllnessComponent } from './components/illness/illness.component';
import { InsertarComponent } from './components/illness/insertar/insertar.component';

export const routes: Routes = [
    {
        path: 'Enfermedades', component: IllnessComponent,
        children:[
            {path: 'nuevo', component: InsertarComponent,

            },
            {
                path: 'ediciones/id', component:InsertarComponent,
            },
        ],
    },
];
 
          
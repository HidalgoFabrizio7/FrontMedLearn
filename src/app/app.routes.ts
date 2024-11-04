import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { IllnessComponent } from './components/illness/illness.component';
import { InsertarComponent } from './components/illness/insertar/insertar.component';
import { DietComponent } from './components/diet/diet.component';
import { InsertardtComponent } from './components/diet/insertardt/insertardt.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { InsertarmedComponent } from './components/medicine/insertarmed/insertarmed.component';

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
        path:'Medicinas', component:MedicineComponent,
        children:[
            {
                path: 'nuevomed', component: InsertarmedComponent,
            },
            {
                path:'edicionesmed/:id', component:InsertarmedComponent,
            },
        ],
    },
];
 
          
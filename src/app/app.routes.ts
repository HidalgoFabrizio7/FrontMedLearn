import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { IllnessComponent } from './components/illness/illness.component';
import { InsertarComponent } from './components/illness/insertar/insertar.component';
import { DietComponent } from './components/diet/diet.component';
import { InsertardtComponent } from './components/diet/insertardt/insertardt.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { InsertarmedComponent } from './components/medicine/insertarmed/insertarmed.component';
import { UsersComponent } from './components/users/users.component';
import { InsertarusComponent } from './components/users/insertarus/insertarus.component';
import { InsertarquanComponent } from './components/quantity/insertarquan/insertarquan.component';
import { ListarquanComponent } from './components/quantity/listarquan/listarquan.component';
import { QuantityComponent } from './components/quantity/quantity.component';
import {ReportesComponent} from './components/reportes/reportes.component';

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
                path:'edicionesdt/:id', component:InsertardtComponent,
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

    {
      path:'Usuarioss', component:UsersComponent,
      children:[
          {
              path: 'nuevous', component: InsertarusComponent,
          },
          {
            path:'dardebaja/:id', component: InsertarusComponent,
          },
      ],

    },

    {
        path:'Cantidades', component:QuantityComponent,
        children:[
            {
                path: 'nuevoCanti', component: InsertarquanComponent,
            },
            {
              path:'editas/:id', component: InsertarquanComponent,
            },
        ],

      },

  {
    path:'Reportes', component:ReportesComponent,
    children:[
      {
        path: 'cantiades', component: ReportesComponent,
      },
    ],

  },



];


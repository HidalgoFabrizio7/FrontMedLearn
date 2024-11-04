import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { IllnessComponent } from './components/illness/illness.component';
import { InsertarComponent } from './components/illness/insertar/insertar.component';
import { DietComponent } from './components/diet/diet.component';
import { InsertardtComponent } from './components/diet/insertardt/insertardt.component';
import { UsersComponent } from './components/users/users.component';
import { InsertarusComponent } from './components/users/insertarus/insertarus.component';

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
      path:'Usuarioss', component:UsersComponent,
      children:[
          {
              path: 'nuevous', component: InsertarusComponent,
          },
          {
            path:'dardebaja/:id', component: InsertarusComponent,
          },
          {
            path:'registropro/:id', component: InsertarusComponent,
          },
      ],
    },

    {
      path:'Hospitales', component:UsersComponent,
    },

];


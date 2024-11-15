import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { IllnessComponent } from './components/illness/illness.component';
import { InsertarComponent } from './components/illness/insertar/insertar.component';
import { DietComponent } from './components/diet/diet.component';
import { InsertardtComponent } from './components/diet/insertardt/insertardt.component';
import { UsersComponent } from './components/users/users.component';
import { InsertarusComponent } from './components/users/insertarus/insertarus.component';
import {TreatmentsComponent} from './components/treatments/treatments.component';
import {InsertartrComponent} from './components/treatments/insertartr/insertartr.component';
import {ReportesComponent} from './components/reportes/reportes.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { CrearhpComponent } from './components/hospital/crearhp/crearhp.component';
import { NumberdietinityfinComponent } from './components/reportes/numberdietinityfin/numberdietinityfin.component';

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
      ],

  },
  {
    path: 'reportes', component: ReportesComponent,
    children:[
        {path: 'numberdietinityfinal', component: NumberdietinityfinComponent,

        },
        {
            path: 'edicionesrep/:id', component:InsertarComponent,
        },
    ],
},

{
    path:'Hospitales', component:HospitalComponent,
    children:[
      {
          path: 'nuevohp', component: CrearhpComponent,
      },
  ],
  },

  {
    path:'Tratamientoss', component:TreatmentsComponent,
    children:[
        {
            path: 'nuevotr', component: InsertartrComponent,
        },
        {
            path:'edicionestr/:id', component:InsertartrComponent,
        },
    ],
},
];


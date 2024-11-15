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
import { InsertarfdComponent } from './components/food/insertarfd/insertarfd.component';
import { FoodComponent } from './components/food/food.component';
import { InsertarexComponent } from './components/exercises/insertarex/insertarex.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { TotalcaloriaspordietaComponent } from './components/reportes/totalcaloriaspordieta/totalcaloriaspordieta.component';
import { TotalejerciciospordietaComponent } from './components/reportes/totalejerciciospordieta/totalejerciciospordieta.component';

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
        path:'Dietas', component:DietComponent,
        children:[
            {
                path: 'nuevodt', component: InsertardtComponent,
            },
            {
                path:'edicionesdt/:id', component:InsertardtComponent,
            },
            {
                path: ':id', component: DietComponent, // Ruta para ver detalles de la dieta de una enfermedad específica
            },
        ],
    },

    {
        path:'Usuarioss', component:UsersComponent,
        children:[
            {
                path: 'nuevous', component: InsertarusComponent,
                children:[
                  {
                      path: 'nuevohp/:id', component: CrearhpComponent,
                  },
                ],
            },
            {
              path:'modificar/:id', component: InsertarusComponent,
            },
        ],
    },
    {
      path:'Ejercicios', component:ExercisesComponent,
      children:[
          {
              path: 'nuevoex', component: InsertarexComponent,
          },
          {
            path:'edicionesex/:id', component: InsertarexComponent,
          },
      ],

    },
    {
      path:'Alimentos', component:FoodComponent,
      children:[
          {
              path: 'nuevofd', component: InsertarfdComponent,
          },
          {
            path:'edicionesfd/:id', component: InsertarfdComponent,
          },
      ],

    },

    {
    path: 'reportes', component: ReportesComponent,
    children:[
        {path: 'numberdietinityfinal', component: NumberdietinityfinComponent,

        },
        {path: 'totalCaloriasporDieta', component: TotalcaloriaspordietaComponent,

        },
        {path: 'totaleEjerciciospoDieta', component: TotalejerciciospordietaComponent,

        },
        {
            path: 'edicionesrep/:id', component:InsertarComponent,
        },
    ],
},

    {
      path:'Hospitales', component:HospitalComponent,
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


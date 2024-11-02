import { NewChild } from './../../../../../node_modules/vite/node_modules/postcss/lib/container.d';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'

import { Illness } from '../../../models/Illness';
import { IllnessService } from '../../../services/illness.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit{
  datasource: MatTableDataSource<Illness> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2', 'c3', 'c4', 'c5','accion01','accion02']

  constructor(private iS:IllnessService){}

  ngOnInit(): void {
    this.iS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
    this.iS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.iS.delete(id).subscribe((data)=>{
      this.iS.list().subscribe((data)=>{
        this.iS.setList(data);
        });
      });
    }

}

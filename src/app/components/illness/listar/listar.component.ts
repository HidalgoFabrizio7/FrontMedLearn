import { NewChild } from './../../../../../node_modules/vite/node_modules/postcss/lib/container.d';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { Illness } from '../../../models/Illness';
import { IllnessService } from '../../../services/illness.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit{
  datasource: MatTableDataSource<Illness> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2', 'c3', 'c4', 'c5',]

  constructor(private iS:IllnessService){}

  ngOnInit(): void {
    this.iS.list().subscribe(data=>{
      this.datasource=new MatTableDataSource(data)
    })
  }

}

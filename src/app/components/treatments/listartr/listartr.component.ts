import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {TreatmentsService} from '../../../services/treatments.service';
import {Treatments} from '../../../models/treatments';
import { RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-listartr',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,CommonModule],
  templateUrl: './listartr.component.html',
  styleUrl: './listartr.component.css'
})
export class ListartrComponent implements OnInit{
  datasource: MatTableDataSource<Treatments> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2', 'c3', 'c4', 'c5','c6','c7','accion01','accion02']

  constructor(private tS: TreatmentsService) {}

  ngOnInit(): void {
    this.tS.list().subscribe((data)=>{
      this.datasource=new MatTableDataSource(data)
    });
    this.tS.getList().subscribe((data)=>{
      this.datasource=new MatTableDataSource(data)
    });
  }
  delete(id:number){
    this.tS.delete(id).subscribe((data)=> {
      this.tS.list().subscribe((data)=> {
        this.tS.setList(data);
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {TreatmentsService} from '../../../services/treatments.service';
import {Treatments} from '../../../models/treatments';

@Component({
  selector: 'app-listartr',
  standalone: true,
  imports: [MatTableModule, MatIconModule,RouterModule],
  templateUrl: './listartr.component.html',
  styleUrl: './listartr.component.css'
})
export class ListartrComponent implements OnInit{
  datasource: MatTableDataSource<Treatments> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2', 'c3', 'c4', 'c5','c6','c7','accion01','accion02']
  constructor(private dT: TreatmentsService) {}
  ngOnInit(): void {
    this.dT.list().subscribe((data)=>{
      this.datasource=new MatTableDataSource(data)
    });
    this.dT.getList().subscribe((data)=>{
      this.datasource=new MatTableDataSource(data)
    });
  }
  delete(id:number){
    this.dT.delete(id).subscribe((data)=> {
      this.dT.list().subscribe((data)=> {
        this.dT.setList(data);
      });
    });
  }
}

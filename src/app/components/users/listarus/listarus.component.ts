import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarus',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule],
  templateUrl: './listarus.component.html',
  styleUrl: './listarus.component.css'
})
export class ListarusComponent implements OnInit{

  datasource: MatTableDataSource<Users> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c5', 'c6','accion01'];

  constructor(private uS: UsersService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
    this.uS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }


}

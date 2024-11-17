import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Medicine } from '../../../models/Medicine';
import { MedicineService } from '../../../services/medicine.service';

@Component({
  selector: 'app-listarmed',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule ],
  templateUrl: './listarmed.component.html',
  styleUrl: './listarmed.component.css'
})
export class ListarmedComponent {
  datasource: MatTableDataSource<Medicine>= new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','accion01','accion02'];
  constructor(private medS: MedicineService) {}
  ngOnInit(): void {
    this.medS.list().subscribe((data) => {
      this.datasource= new MatTableDataSource(data);
    });
    this.medS.getList().subscribe((data) => {
      this.datasource= new MatTableDataSource(data);
    });

  }

  delete(id: number): void {

    this.medS.delete(id).subscribe((data) => {
      this.medS.list().subscribe((data) => {
        this.medS.setList(data);
      });
    });
}





}

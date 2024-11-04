import { name } from './../../../../../node_modules/@leichtgewicht/ip-codec/types/index.d';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MedicineService } from '../../../services/medicine.service';
import { Medicine } from '../../../models/Medicine';

@Component({
  selector: 'app-insertarmed',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule ,
    MatButtonModule,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './insertarmed.component.html',
  styleUrl: './insertarmed.component.css'
})
export class InsertarmedComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  meddicina: Medicine = new Medicine();
  id: number = 0;
  edicion: boolean = false;



  constructor(
    private medS: MedicineService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] > 0;
      this.init();
    });
    this.form = this.formBuilder.group({

      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],

    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.meddicina.idMedicine = this.form.value.codigo;
      this.meddicina.nameMedicine = this.form.value.nombre;
      this.meddicina.descriptionMedicine = this.form.value.descripcion;
      if(this.edicion){
        this.medS.update(this.meddicina).subscribe((data) => {
          this.medS.list().subscribe((data) => {
            this.medS.setList(data);
          })}
        );
      }else{

      this.medS.insert(this.meddicina).subscribe((data) => {
        this.medS.list().subscribe((data) => {
          this.medS.setList(data);
        });
        
      });
      }
    }
    this.router.navigate(['Medicinas']);
  }
  init() {
    if (this.edicion) {
      this.medS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idMedicine),
          hnombre: new FormControl(data.nameMedicine),
          hextension: new FormControl(data.descriptionMedicine),

        });
      });
    }
  }

}

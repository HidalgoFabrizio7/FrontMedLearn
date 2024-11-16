import { Quantity } from './../../../models/Quantity';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuantityService } from '../../../services/quantity.service';
import { Medicine } from '../../../models/Medicine';
import { MedicineService } from '../../../services/medicine.service';

@Component({
  selector: 'app-insertarquan',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule ,
    MatButtonModule,
    CommonModule,
  ],  templateUrl: './insertarquan.component.html',
  styleUrl: './insertarquan.component.css'
})
export class InsertarquanComponent implements OnInit{
  listaMedicinas: Medicine[] = [];
  form: FormGroup = new FormGroup({});
  Quantity: Quantity = new Quantity();
  id: number = 0;
  edicion: boolean = false;



  constructor(
    private quanS: QuantityService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private medicneS : MedicineService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] > 0;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: ['', Validators.required],
      cantidad: ['', Validators.required],
      medicina: ['', Validators.required],

    });
    this.medicneS.list().subscribe((data) => {
      this.listaMedicinas = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.Quantity.idQuantity = this.form.value.codigo;
      this.Quantity.quantityQuantity = this.form.value.cantidad;
      this.Quantity.medicine = this.form.value.medicina;
      if(this.edicion){
        this.quanS.update(this.Quantity).subscribe((data) => {
          this.quanS.list().subscribe((data) => {
            this.quanS.setList(data);
          })}
        );
      }else{
        this.quanS.insert(this.Quantity).subscribe((data) => {
        this.quanS.list().subscribe((data) => {
          this.quanS.setList(data);
        });
        
      });
      }
    }
    this.router.navigate(['Medicinas']);
  }
  init() {

    if (this.edicion) {
      this.quanS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idQuantity),
          cantidad: new FormControl(data.quantityQuantity),
          medicina: new FormControl(data.medicine),

        });
      });
    }
  }


  


}

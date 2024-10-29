import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
 } from '@angular/forms';
 import { Router } from '@angular/router';
 import { MatInputModule } from '@angular/material/input';
 import { MatFormFieldModule } from '@angular/material/form-field';
 import { MatSelectModule } from '@angular/material/select';
 import { MatButtonModule } from '@angular/material/button';
import { Illness } from '../../../models/Illness';
import { IllnessService } from '../../../services/illness.service';

@Component({
  selector: 'app-insertar',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertar.component.html',
  styleUrl: './insertar.component.css'
})
export class InsertarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  illness: Illness = new Illness();
  constructor(
    private iS: IllnessService,
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hnombre: ['',Validators.required],
      hdescripcion: ['',Validators.required],
      himage: ['',Validators.required],
      hsearches: ['',[Validators.required, Validators.pattern('^[0-9]+$')]],
    })
  }

  insertar(): void{
    if(this.form.valid){
      this.illness.nameIllness = this.form.value.hnombre;
      this.illness.descriptionIllness = this.form.value.hdescripcion;
      this.illness.imageIllness = this.form.value.himage;
      this.illness.searchesIllneses = this.form.value.hsearches;
      this.iS.insert(this.illness).subscribe((data)=>{
        this.iS.list().subscribe((data)=>{
          this.iS.setList(data);
        });
      });
    }
    this.router.navigate(['Enfermedades'])
  }
}

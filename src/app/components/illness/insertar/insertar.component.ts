import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
 } from '@angular/forms';
 import { ActivatedRoute, Params, Router  } from '@angular/router';
 import { MatInputModule } from '@angular/material/input';
 import { MatFormFieldModule } from '@angular/material/form-field';
 import { MatSelectModule } from '@angular/material/select';
 import { MatButtonModule } from '@angular/material/button';
import { Illness } from '../../../models/Illness';
import { IllnessService } from '../../../services/illness.service';
import {CommonModule} from '@angular/common';

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
    CommonModule
  ],
  templateUrl: './insertar.component.html',
  styleUrl: './insertar.component.css'
})
export class InsertarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  illness: Illness = new Illness();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private iS: IllnessService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ){}



  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });


    this.form = this.formBuilder.group({
      codigo:[''],
      hnombre: ['',Validators.required],
      hdescripcion: ['',Validators.required],
      himage: ['',Validators.required],
      hcontador: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });

  }
  insertar(): void {
    if (this.form.valid) {
      this.illness.idIllness = this.form.value.codigo;
      this.illness.nameIllness = this.form.value.hnombre;
      this.illness.descriptionIllness = this.form.value.hdescripcion;
      this.illness.imageIllness = this.form.value.himage;
      this.illness.searchesIllneses = this.form.value.hcontador;

      if (this.edicion) {
        this.iS.update(this.illness).subscribe(() => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      } else {
        this.iS.insert(this.illness).subscribe(() => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      }
      this.router.navigate(['Enfermedades']);
    }
  }

  init(): void {
    if (this.edicion) {
      this.iS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idIllness),
          hnombre: new FormControl(data.nameIllness),
          hdescripcion: new FormControl(data.descriptionIllness),
          himage: new FormControl(data.imageIllness),
          hcontador: new FormControl(data.searchesIllneses),
        });
      });
    }
  }
}

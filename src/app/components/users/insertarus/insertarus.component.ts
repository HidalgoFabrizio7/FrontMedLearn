import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertarus',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './insertarus.component.html',
  styleUrl: './insertarus.component.css'
})
export class InsertarusComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  userr: Users = new Users();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private uS: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] > 0;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: [''],
      husername: [''],
      hcorreo: [''],
      hcertificado: [''],
      hpassword: [''],
      henabled: [''],
    });
  };

  insertar(): void {
    if (this.form.valid) {
      this.userr.idUser = this.form.value.hcodigo;
      this.userr.fullnameUser = this.form.value.hnombre;
      this.userr.username = this.form.value.husername;
      this.userr.email = this.form.value.hcorreo;
      this.userr.certificationUser = this.form.value.hcertificado;
      this.userr.password = this.form.value.hpassword;
      this.userr.enabled = this.form.value.henabled;

      if (this.edicion) {
        //update
        this.uS.update(this.userr).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        //insert
        this.uS.insert(this.userr).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }

      /**/
    }
    this.router.navigate(['Usuarioss']);
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idUser),
          hnombre: new FormControl(data.fullnameUser),
          husername: new FormControl(data.username),
          hcorreo: new FormControl(data.email),
          hcertificado: new FormControl(data.certificationUser),
          hpassword: new FormControl(data.password),
          henabled: new FormControl(data.enabled)
        });
      });
    }
  }


}

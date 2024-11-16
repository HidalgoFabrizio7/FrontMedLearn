import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Params, Router, RouterLink, RouterOutlet } from '@angular/router';
import { map, Observable } from 'rxjs';
import {AsyncPipe} from '@angular/common';
import { Role } from '../../../models/Role';
import { RolesService } from '../../../services/roles.service';
import { CrearhpComponent } from '../../hospital/crearhp/crearhp.component';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';


@Component({
  selector: 'app-insertarus',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  imports: [
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    AsyncPipe,
    RouterOutlet,
    CrearhpComponent,
    RouterLink
  ],
  templateUrl: './insertarus.component.html',
  styleUrl: './insertarus.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertarusComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  userr: Users = new Users();
  role: Role = new Role();
  id: number = 0;
  edicion: boolean = false;
  complete: boolean = false;
  showCertificado: boolean = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private uS: UsersService,
    private rS: RolesService,
    private formBuilder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.firstFormGroup = this.formBuilder.group({
      hnombre: ['', Validators.required],
      husername: ['', Validators.required],
      hcorreo: ['', [Validators.required, Validators.email]], //'', [Validators.required, Validators.email]
      hpassword: ['', Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdFormGroup = this.formBuilder.group({
      hcertificado: [''],
    });
  }


  ngOnInit(): void {
    this.uS.getidMayor().subscribe((data: number) => {
      this.role.user.idUser = data+1;
    });
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
            this.uS.getidMayor().subscribe((id) => {
              console.log(id);
              this.rS.insert(this.role).subscribe();
            });
          });
        });

        this.complete= true
      }

      /**/
    }
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
        this.form.get('henabled')?.disable();
      });
    }
  }

  darDeBaja(): void {
    this.form.get('henabled')?.setValue(false);
  }

  setAttributeValue(value: string): void {
    if (value === 'NUTRICIONISTA' || value === 'DOCTOR') {
      this.showCertificado = true;
    } else {
      this.showCertificado = false;
    }
    this.secondFormGroup.patchValue({ secondCtrl: value });
    this.role.rol = value;
  }

  transferStepperDataToForm() {
    this.form.patchValue({
      hnombre: this.firstFormGroup.value.hnombre,
      husername: this.firstFormGroup.value.husername,
      hcorreo: this.firstFormGroup.value.hcorreo,
      hpassword: this.firstFormGroup.value.hpassword,
      hcertificado: this.thirdFormGroup.value.hcertificado,
    });
  }

  enrutar(){
    this.router.navigate(['Usuarioss']);
  }
}

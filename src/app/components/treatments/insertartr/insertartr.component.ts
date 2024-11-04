import { CommonModule } from '@angular/common'; //
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';//
import { MatButtonModule } from '@angular/material/button'; //
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Treatments} from '../../../models/treatments';
import {TreatmentsService} from '../../../services/treatments.service'; //

@Component({
  selector: 'app-insertartr',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './insertartr.component.html',
  styleUrl: './insertartr.component.css'
})
export class InsertartrComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  treatment:Treatments  = new Treatments();
  id: number = 0;
  edicion: boolean=false;

  listaEnfermedades: { value: number, viewValue: string }[] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2'  },
    { value: 3, viewValue: '3'  },
    // Agrega más evaluaciones según sea necesario
  ];

  constructor(
    private deS: TreatmentsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) =>{
      this.id=data['id']
      this.edicion=data['id']!=null
      this.init()

    });
    this.form = this.formBuilder.group({
      codigot:[''],
      descriptiont: ['', Validators.required],
      durationt: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      startd: ['', Validators.required],
      finalizard: ['', Validators.required],
      illnessd:['',Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.treatment.idTreatments=this.form.value.codigod;
      this.treatment.descriptionTreatment = this.form.value.descriptiond;
      this.treatment.durationTreatment = this.form.value.durationd;
      this.treatment.startDayTreatment = this.form.value.startd;
      this.treatment.finishDayTreatment = this.form.value.finalizard;
      this.treatment.illness.idIllness = this.form.value.illnessd;
      if(this.edicion){
        this.deS.update(this.treatment).subscribe((data) => {
          this.deS.list().subscribe((data) => {
            this.deS.setList(data);
          });
        });
      }else{
        this.deS.insert(this.treatment).subscribe((data) => {
          this.deS.list().subscribe((data) => {
            this.deS.setList(data);
          });
        });
      }

    }
    this.router.navigate(['Treatmentsas']);
  }

  init(){
    if(this.edicion){
      this.deS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigod:new FormControl(data.idTreatments),
          descriptiond:new FormControl(data.descriptionTreatment),
          durationd:new FormControl(data.durationTreatment),
          startd: new FormControl(data.startDayTreatment),
          finalizard:new FormControl(data.finishDayTreatment),
          illnessd:new FormControl(data.illness.idIllness),
        })
      })
    }
  }

}

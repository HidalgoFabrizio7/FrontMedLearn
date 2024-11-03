import { CommonModule } from '@angular/common'; //
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';//
import { MatButtonModule } from '@angular/material/button'; //
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Diet } from '../../../models/Diet';
import { DietService } from '../../../services/diet.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router'; //

@Component({
  selector: 'app-insertardt',
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
  templateUrl: './insertardt.component.html',
  styleUrl: './insertardt.component.css'
})
export class InsertardtComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  diet:Diet  = new Diet();
  id: number = 0;
  edicion: boolean=false;

  listaEnfermedades: { value: number, viewValue: string }[] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2'  },
    { value: 3, viewValue: '3'  },
    // Agrega más evaluaciones según sea necesario
  ];

  constructor(
    private deS: DietService,
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
      codigod:[''],
      descriptiond: ['', Validators.required],
      durationd: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      startd: ['', Validators.required],
      finalizard: ['', Validators.required],
      illnessd:['',Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.diet.idDiet=this.form.value.codigod;
      this.diet.descriptionDiet = this.form.value.descriptiond;
      this.diet.durationDiet = this.form.value.durationd;
      this.diet.startDayDiet = this.form.value.startd;
      this.diet.finishDayDiet = this.form.value.finalizard;
      this.diet.illness.idIllness = this.form.value.illnessd;
      if(this.edicion){
        this.deS.update(this.diet).subscribe((data) => {
          this.deS.list().subscribe((data) => {
            this.deS.setList(data);
          });
        });
      }else{
        this.deS.insert(this.diet).subscribe((data) => {
          this.deS.list().subscribe((data) => {
            this.deS.setList(data);
          });
        });
      }
      
    }
    this.router.navigate(['Dietas']);
  }

  init(){
    if(this.edicion){
      this.deS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigod:new FormControl(data.idDiet),
          descriptiond:new FormControl(data.descriptionDiet),
          durationd:new FormControl(data.durationDiet),
          startd: new FormControl(data.startDayDiet),
          finalizard:new FormControl(data.finishDayDiet),
          illnessd:new FormControl(data.illness.idIllness),
        })
      })
    }
  }

}

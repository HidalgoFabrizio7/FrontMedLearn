import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Hospital } from '../../../models/Hospital';
import { HospitalService } from '../../../services/hospital.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crearhp',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './crearhp.component.html',
  styleUrl: './crearhp.component.css'
})
export class CrearhpComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  hospital: Hospital = new Hospital();
  autocomplete: google.maps.places.Autocomplete | undefined;
  lat: number = 0;
  long: number =0;

  constructor(
    private hS: HospitalService,
    private uS: UsersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){}

  @ViewChild('inputField') inputField!: ElementRef;
  @Input() placeholder = '';


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hnameHospital:[''],
      hlatitude:[''],
      hlongitud:[''],
      haddressHospital:[''],
      hcontactHospital:[''],
      hcounterViewsHospital:[''],
      huser: [''],
    });

  }

  ngAfterViewInit(){
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);
    this.autocomplete.addListener('place_changed', ()=>{
      const place = this.autocomplete?.getPlace();
      if (place?.geometry?.location) {
        this.form.patchValue({
          hlatitude: place.geometry.location.lat(),
          hlongitud: place.geometry.location.lng(),
          haddressHospital: place.formatted_address
        });
          console.log(place.geometry.location.lat(),
          place.geometry.location.lng(),place.formatted_address);
        }
          else {
            console.error('No geometry found for the selected place.');
          }
    });
  }


  agregar(): void {
    if(this.form.valid){
      this.form.value.hcounterViewsHospital = 1;
      this.hospital.nameHospital = this.form.value.hnameHospital;
      this.hospital.longitudeHospital = this.form.value.hlongitud;
      this.hospital.latitudeHospital = this.form.value.hlatitude;
      this.hospital.addressHospital = this.form.value.haddressHospital;
      this.hospital.contactHospital = this.form.value.hcontactHospital;
      this.hospital.counterViewsHospital = this.form.value.hcounterViewsHospital;

      this.uS.getidMayor().subscribe((id) => {
        this.hospital.user.idUser = id;
      });

      this.hospital.user.idUser = 11;

      this.hS.insert(this.hospital).subscribe((data) => {
        this.hS.list().subscribe((d) => {
          this.hS.setList(d);
        });
      });

    }
  }

}

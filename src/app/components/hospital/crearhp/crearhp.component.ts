import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Hospital } from '../../../models/Hospital';
import { HospitalService } from '../../../services/hospital.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';

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
  styleUrls: ['./crearhp.component.css']
})
export class CrearhpComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  hospital: Hospital = new Hospital();
  autocomplete: google.maps.places.Autocomplete | undefined;
  id: number = 0;


  constructor(
    private hS: HospitalService,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
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
    });

  }

  ngAfterViewInit() {
    if (this.inputField) {
      this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete?.getPlace();
        if (place?.geometry?.location) {
          this.form.patchValue({
            hlatitude: place.geometry.location.lat(),
            hlongitud: place.geometry.location.lng(),
            haddressHospital: place.formatted_address
          });
          console.log(place.geometry.location.lat(), place.geometry.location.lng(), place.formatted_address);
        } else {
          console.error('No geometry found for the selected place.');
        }
      });
    }
  }



  agregar(): void {

      this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
    });
    console.log(this.id);

    if(this.form.valid){
      this.form.value.hcounterViewsHospital = 1;
      this.hospital.user.idUser = this.id;
      this.hospital.nameHospital = this.form.value.hnameHospital;
      this.hospital.longitudeHospital = this.form.value.hlongitud;
      this.hospital.latitudeHospital = this.form.value.hlatitude;
      this.hospital.addressHospital = this.form.value.haddressHospital;
      this.hospital.contactHospital = this.form.value.hcontactHospital;
      this.hospital.counterViewsHospital = this.form.value.hcounterViewsHospital;

      this.hS.insert(this.hospital).subscribe((data) => {
        this.hS.list().subscribe((d) => {
          this.hS.setList(d);
        });
      });

    }
  }

}

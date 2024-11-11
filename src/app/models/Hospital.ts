import { Users } from "./Users"

export class Hospital {
  idHospital: number=0
  nameHospital: string=""
  latitudeHospital: number=0
  longitudeHospital: number=0
  addressHospital: string=""
  contactHospital: string=""
  counterViewsHospital: number=0
  user: Users = new Users()
}

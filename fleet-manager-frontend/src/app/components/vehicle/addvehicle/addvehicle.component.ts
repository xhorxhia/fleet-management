import { Component, OnInit } from '@angular/core';
import { VehicleClass } from '../../../models/vehicle-class';
import { VehicleClassService } from '../../../_services/vehicle-class.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleConfigService } from '../../../_services/vehicle-config.service';
import { Vehicle } from '../../../models/vehicle';
import { ApiVehicleServices } from '../../../_services/vehicleServicesService';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { User } from '../../../models/user';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.scss']
})
export class AddvehicleComponent implements OnInit {

  constructor(private vehicleClassService:VehicleClassService,
    private service:ApiVehicleServices,
    private rout:ActivatedRoute,
    private vehicleService:VehicleConfigService,
    private router:Router,
    private token:TokenStorageService,
     private toasterServ:ToastrService
    ) { }
  nameFormControl= new FormControl('',[
    Validators.minLength(3),
    Validators.maxLength(65)
  ]);
  consumptionFormControl= new FormControl('',[
    Validators.min(1),
    Validators.max(20)
  ]);
  maxCapacityFormControl= new FormControl('',[
    Validators.min(10),
    Validators.max(100)
  ]);
  engineFormControl= new FormControl('',[
    Validators.min(25),
    Validators.max(400)
  ]);

  user:User
  vehicleClassHelper:Observable<VehicleClass>
  vehicle:Vehicle=new Vehicle()
  veicleHelper:number;
  VehicleClassId:string;
  show:Boolean=false;
  show2:Boolean=false
  vehicleServices:any
  companyId:String

  ngOnInit() {

    if(this.token.getToken()){
      this.user=this.token.getUser();
      this.companyId=this.user.id;
    }

    this.VehicleClassId=this.rout.snapshot.paramMap.get('id');
    console.log(this.VehicleClassId)

    if(this.VehicleClassId===null){
      console.log(this.VehicleClassId!==null)
      this.vehicleClassService.getAllVehicleClass().subscribe(
        data=>{
          console.log(data)
         this.vehicleClassHelper=data;
        }
       )
       this.show=true;
    }
    else{
      this.vehicleClassService.oneVehicleClass(this.VehicleClassId).subscribe(
        data=>{
          console.log("sssssssssssss"+data)
         this.veicleHelper=data.classNr;
         console.log(data.id)
        }
       
      )
      this.show2=true
    }
    this.service.getAll().subscribe(
      data=>{
        console.log(data.name)
        this.vehicleServices=data
      }
      
    )

    
  }

  
  saveNewVehicle(){
    if(this.vehicle.vehicleClassId===undefined||this.vehicle.consumption===undefined||this.vehicle.enginePower===undefined||this.vehicle.maxCapacity===undefined){
      this.toasterServ.error('Ju lutem plotso fushat')

    }
    else{
      return this.vehicleService.AddNewVehicle(this.companyId,this.vehicle).subscribe(
        data=>{
          console.log("une u bera save"+data[8])
          this.toasterServ.success("Succes")
          this.router.navigateByUrl('/vehicle')
          
        },
        error=>{
          console.log(error)
          this.toasterServ.error("Try Again")
        }
      )
    }
    
  }

}

import { Component, OnInit } from '@angular/core';
import { VehicleConfigService } from '../../../_services/vehicle-config.service';
import { Vehicle } from '../../../models/vehicle';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { VehicleClassService } from '../../../_services/vehicle-class.service';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { ApiVehicleServices } from '../../../_services/vehicleServicesService';
import { VehicleServices } from '../../../models/vehicle-service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../_services/company.service';
import { FleetService } from '../../../_services/fleet.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { User } from '../../../models/user';
import { ApiVehicleIssues } from '../../../_services/vehicle-issue.service';
import { VehicleIssue } from '../../../models/vehicle-issue';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  constructor(private VehicleService:VehicleConfigService, private rout:ActivatedRoute,
    private compayService:CompanyService,private classService:VehicleClassService,
    private fleetService:FleetService,private service:ApiVehicleServices,
    private toasterServ:ToastrService,public dialog: MatDialog,
    private issueService:ApiVehicleIssues,
    private router:Router,private token:TokenStorageService) { }

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
  id:string
  vehicleDetail:Vehicle
  toggle:Boolean=false;
  showCard:Boolean=true;
  companyName:string;
  className:any;
  fleetName:string;
  vehicleServices:VehicleServices
  showlist:Boolean=false;
  servicesList:any
  idDeleted:any;
  dialogR:any
  hideService:Boolean=false
  oneIssue:VehicleIssue;
  nIssue:Boolean=false
  onIssue:Boolean=false

  hideIssueTF:Boolean=true
  issuesList:VehicleIssue[]
  user:User
  isDriver=false;


  ngOnInit() {
    this.getVehiclesById();
    this.user=this.token.getUser();
    if(this.user.roles.includes("DRIVER")){
      this.isDriver=true;
    }
  }

  
  hide(){
    this.toggle=!this.toggle;
    this.showCard=!this.showCard;
  }

  getVehiclesById(){
      this.id=this.rout.snapshot.paramMap.get('id');
      console.log(this.id);
      
      this.VehicleService.getVehicleById(this.id).subscribe(
        data=>{
          console.log(this.id)
          this.vehicleDetail=data


          this.compayService.getCompanyById(this.vehicleDetail.companyId).subscribe(
            data=>{
              this.companyName=data.name;
            })
            
            this.classService.oneVehicleClass(this.vehicleDetail.vehicleClassId).subscribe(
              
              data=>{
                if(data!==null){
                  this.className=data.classNr
                }
                else{
                  this.className="CLASS IS DELETED"
                }
                })
                if(this.vehicleDetail.fleetId!==null){
                  this.fleetService.getFleetById(this.vehicleDetail.fleetId).subscribe(
                    data=>{
                      if(data===null){
                        this.fleetName="NAME*"
                      }
                      else{
                        this.fleetName=data.name
                      }
                    }
                  )
                }
                else{
                  this.fleetName="NO FLEET"
                }
                console.log(this.vehicleDetail.vehicleServicesId.length)   
                if(this.vehicleDetail.vehicleServicesId.length!==0){      
                         
                  this.service.getServiceVehicle(this.vehicleDetail.vehicleServicesId).subscribe(
                    data=>{
                      this.servicesList=data;
                    }
                )
                }
                else{
                 this.hideService=true;
                }
                this.issueService.getByVehicle(this.vehicleDetail.id).subscribe(
                  data=>{
                    if(data.length!==0){
                      if(data.length===1){
                        console.log(data)
                        this.oneIssue=data[0];
                        console.log(this.oneIssue.part)
                        this.onIssue=true;
                       
                      }
                      else if(data.length>1){

                        this.issuesList=data
                      
                            this.nIssue=true;
                      }
  
                    }
                    else{
                      this.hideIssueTF=false;
                    }
                   
                  }
                )
                
         
          
        }
         
     
       
      )
      this.service.getAll().subscribe(
        data=>{
          this.vehicleServices=data
        }
      )
  }

  DeleteVehicle(id:string){
    return this.VehicleService.DeleteById(id).subscribe(
      data=>{
        console.log(data);
        this.toasterServ.success("Deleted")

        this.router.navigateByUrl('/vehicle')
      },
      error=>{
        this.toasterServ.error(error)
      }
    )
  }

  UpdateVehicle(id:string){
    console.log("jam ketu");
    
      return this.VehicleService.UpdateById(id,this.vehicleDetail).subscribe(
        data=>{
          console.log("skerdi jethh"+data)
          console.log("skerdi jethh"+this.vehicleDetail.vehicleServicesId)
          if(this.vehicleDetail.vehicleServicesId.length!==0){
            this.service.getServiceVehicle(this.vehicleDetail.vehicleServicesId).subscribe(
              data=>{
                this.servicesList=data;
              }
          )
          }
         
          this.toggle=false;
          this.showCard=true;    
          this.toasterServ.success("Updated")
          this.closeDialog()
          },
          error=>{
            this.toasterServ.error("Try again")
          }
      )
    }
  
    showList(){
      console.log("true")
      this.showlist=true;
    }
    
    closeDialog() {
      this.dialog.closeAll()
    }
  
    openDialog(templateRef) {
    
      this.dialogR = this.dialog.open(templateRef)
    }
    openDialogx2(templateRef){
      this.dialogR = this.dialog.open(templateRef)

    }
    editVehicle( templateRef) {
      this.dialogR = this.dialog.open(templateRef)
     
    }
  

}

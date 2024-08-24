import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { VehicleClassService } from '../../_services/vehicle-class.service';
import { Observable } from 'rxjs';
import { VehicleClass } from '../../models/vehicle-class';
import { TokenStorageService } from '../../_services/token-storage.service';
import { User } from '../../models/user';
import { MatDialog, ErrorStateMatcher } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormControl, FormGroupDirective, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Edit } from 'leaflet';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'vehicle-class',
  templateUrl: './vehicle-class.component.html',
  styleUrls: ['./vehicle-class.component.scss']
})
export class VehicleClassComponent implements OnInit {
  vehicleClasses:Observable<VehicleClass[]>
  isAdmin:Boolean=false;
  user:User;
  selectedFile: File;
  url:any;
  addedItem:Boolean=false;
  deletedVehicle:any
  dialogR:any

   vehicleClass1:VehicleClass
   axesFormControl= new FormControl('',[
    Validators.min(1),
    Validators.max(4),
    Validators.required

  ]);
  classFormControl= new FormControl('',[
    Validators.min(1),
    Validators.max(6),
    Validators.required
  ]);

  constructor(private service:VehicleClassService,
    private router:Router,
    private toast:ToastrService,
    public dialog: MatDialog,
    
    private token:TokenStorageService) { }

  ngOnInit() {
    this.user=this.token.getUser()
    if(this.user.roles[0]==="ADMIN"){
      this.isAdmin=true;
    }
    console.log(this.isAdmin)
    console.log(this.user.roles[0])

    this.getAllVehicleClass()
      }

      @ViewChild('editTemplate') edittm: TemplateRef<any>;

      Update(one:any){
        this.vehicleClass1=one;
        let dialogRef = this.dialog.open(this.edittm);
        dialogRef.afterClosed().subscribe(result => {
          if(result==='yes'){
            this.service.UpdateById(this.vehicleClass1.id,this.vehicleClass1).subscribe(
              data=>{
                this.toast.success("updated")
              }
            )
          }
          else if(result==='no'){
            this.dialog.closeAll();
          }
        });

        
        
       
      }    


    getAllVehicleClass(){
      this.service.getAllVehicleClass().subscribe(
        data=>this.vehicleClasses=data )}
 
    deleteVehicle(Id:string){
      
      this.service.deleteVehicleCLass(Id).subscribe(
        data=>{
          console.log(data);
          this.getAllVehicleClass();
        },
        error=>{
          console.log(error);
        }
      );
      
    }

    
  
    
    closeDialog() {
      this.dialog.closeAll()
    }
  
    openDialog(one, templateRef) {
      this.deletedVehicle = one
      this.dialogR = this.dialog.open(templateRef)
    }

    openDialog2(one, templateRef) {
      this.vehicleClass1 = one
     
      this.dialogR = this.dialog.open(templateRef)
    
        

    }
  

  }

  


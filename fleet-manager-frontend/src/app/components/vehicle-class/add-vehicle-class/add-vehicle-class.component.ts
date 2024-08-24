import { Component, OnInit } from '@angular/core';
import { VehicleClassService } from '../../../_services/vehicle-class.service';
import { VehicleClass } from '../../../models/vehicle-class';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroupDirective, FormControl, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'add-vehicle-class',
  templateUrl: './add-vehicle-class.component.html',
  styleUrls: ['./add-vehicle-class.component.scss']
})
export class AddVehicleClassComponent implements OnInit {

  constructor(private service:VehicleClassService,
    private router:Router,
    private toastr: ToastrService,


    ) { }
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
  
    vehicleClass= new VehicleClass();
    selectedFile: File;
    url:any;
    addedItem:Boolean=false;
  
  
    ngOnInit() {
  
    }
  
  
  
    SaveVehicleClass(){
      console.log('te pkt jam ketu')
      this.vehicleClass.icon=this.url
      console.log("jamee ktuuuuu"+this.vehicleClass.axes)
      if(this.vehicleClass.axes===undefined||this.vehicleClass.classNr===undefined||this.vehicleClass.icon===undefined){
        this.toastr.error('Plotso')

      }
      else{
        this.service.addNewVehicleClass(this.vehicleClass).subscribe(
     
          data=>{console.log('data'+data)
          this.toastr.success("VehicleClass was added");
          this.router.navigateByUrl("/vehicleClassAll")
        },
        error=>{
          this.toastr.error("Try again!");
        }
    
        )
      }
     
  
      }
      updateFile(event:Event) {
        this.selectedFile = (event.target as HTMLInputElement).files[0];
        console.log(this.selectedFile)
        if(this.selectedFile.size>2097152){
          alert("File is too big!");
        }
        else{
        var reader=new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload=(event)=>{
          this.url=reader.result;
        }
        this.addedItem=true;
       }
      }
  


}

import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { VehicleConfigService } from '../../_services/vehicle-config.service';
import { Observable } from 'rxjs';
import { Vehicle } from '../../models/vehicle';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})

export class VehicleComponent implements OnInit {
  displayedColumns: string[] = [ 'index','name','consumption','enginePower','maxCapacity'];
  vehicles:Observable<Vehicle[]>
  dataSource:MatTableDataSource<Vehicle[]>;
  length:number;
  page:number=0;
  size:number=10;
  user:User
  companyId:String




  constructor(private serviceVehice:VehicleConfigService,
    private token:TokenStorageService,
    private router:Router,
    
    ) { }
    @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    if(this.token.getToken()){
      this.user=this.token.getUser();
      this.companyId=this.user.id;
    }
    this.getAll(null)
  }


  

  getAll(event){
    let params = {};

    if(event!==null){

      this.page=event.pageIndex
      this.size=event.pageSize
      params[`page`]=this.page
      params[`szie`]=this.size 
      console.log(params)
      console.log(params)

    }
    return this.serviceVehice.getAllVehicle(this.companyId,params).subscribe(
    (data)=>{this.vehicles=data['content'] 
      this.dataSource=new MatTableDataSource<Vehicle[]>(data['content']);
      this.length=data.totalElements      


      console.log(this.dataSource)
      
      
        console.log(data)}
    )

  }

  navigateTo(row: any) {
    this.router.navigateByUrl('vehicles/'+row.id);
  } 



}

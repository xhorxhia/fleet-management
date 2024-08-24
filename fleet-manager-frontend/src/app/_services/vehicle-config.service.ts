import { Vehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const Url = 'http://localhost:8082/fleet/';

@Injectable({
  providedIn: 'root'
})
export class VehicleConfigService {

  constructor(private http:HttpClient) { }
  
  getAll():Observable<any>{
 return this.http.get(Url +'vehicle/all');
  }
  getAllVehicle(companyId:String,params):Observable<any>{
    return this.http.get(Url+`${companyId}`+'/pageVehicle/all',{params})
  }
  AllVehicle(companyId:String):Observable<any>{
    return this.http.get(Url+`${companyId}`+'/vehicle/all',)
  }
  getVehicleById(id:String):Observable<any>{
    return this.http.get(Url+'vehicle/'+`${id}`)
  }

  AddNewVehicle(companyId:String,vehicle:Vehicle):Observable<any>{
    return this.http.post(Url+`${companyId}`+'/vehicle/newAdd',vehicle);
  }
  UpdateById(id:string,vehicle:Vehicle):Observable<any>{
    return this.http.put(Url+'vehicle/update/'+`${id}`,vehicle)
  }
  DeleteById(id:String):Observable<any>{
    return this.http.delete(Url+'deleteVehicle/'+`${id}`)
  }
     
}

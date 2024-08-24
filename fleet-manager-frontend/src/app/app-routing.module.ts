import { UpdateIssueComponent } from './components/VehicleIssues/update-issue/update-issue.component';
import { IssuesListComponent } from './components/VehicleIssues/issues-list/issues-list.component';
import { AddIssueComponent } from './components/VehicleIssues/add-issue/add-issue.component';
import { UpdateServiceComponent } from './components/VehicleServices/update-service/update-service.component';
import { ServicesListComponent } from './components/VehicleServices/services-list/services-list.component';
import { AddServiceComponent } from './components/VehicleServices/add-service/add-service.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { LoginComponent } from '././components/login/login.component';
import { VehicleClassComponent } from '././components/vehicle-class/vehicle-class.component';
import { AddVehicleClassComponent } from '././components/vehicle-class/add-vehicle-class/add-vehicle-class.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { AddvehicleComponent } from './components/vehicle/addvehicle/addvehicle.component';
import { VehicleDetailsComponent } from './components/vehicle/vehicle-details/vehicle-details.component';
import { RegisterComponent } from './components/register/register.component';
import { AddDriverComponent } from './components/driver/add-driver/add-driver.component';
import { DriverComponent } from './components/driver/driver.component';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import {FleetComponent} from "./components/fleet/fleet.component";
import {CompanyComponent} from "./components/company/company.component";
import { ProfileComponent } from './components/profile/profile.component';
import {AuthService as AuthGuard} from './_services/auth.service';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {path: 'vehicleClassAll',component:VehicleClassComponent,canActivate:[AuthGuard],data: {expectedRole: 'ADMIN'}} ,
   {path:'vehicleClassAdd',component:AddVehicleClassComponent,canActivate:[AuthGuard],data: {expectedRole: 'ADMIN'}},
   {path:'vehicle',component:VehicleComponent,canActivate:[AuthGuard],data: {expectedRole: 'COMPANY'}},
   {path:'AddVehicle',component:AddvehicleComponent,canActivate:[AuthGuard],data: {expectedRole: 'COMPANY'}},
   {path:'vehicles/:id',component:VehicleDetailsComponent},
    {path:'addCompany',component:AddCompanyComponent,canActivate:[AuthGuard],data: {expectedRole: 'ADMIN'}},
    {path:'allCompanies',component:CompanyComponent,canActivate:[AuthGuard],data: {expectedRole: 'ADMIN'}},
    {path:'addDriver',component:AddDriverComponent,canActivate:[AuthGuard],data: {expectedRole: 'COMPANY'}},
    {path:'drivers',component:DriverComponent,canActivate:[AuthGuard],data: {expectedRole: 'COMPANY'}},
    {path: 'vehicleService', component:AddServiceComponent,canActivate:[AuthGuard],data: {expectedRole: 'COMPANY'}},
   {path: 'vehicleServiceList', component:ServicesListComponent,canActivate:[AuthGuard],data: {expectedRole: 'COMPANY'}},
   {path: 'edit-service/:id', component:UpdateServiceComponent,canActivate:[AuthGuard],data: {expectedRole: 'COMPANY'}},
   {path: 'vehicleIssue', component:AddIssueComponent},
   {path: 'vehicleIssueList', component:IssuesListComponent,canActivate:[AuthGuard],data: {expectedRole: 'COMPANY'}},
   {path: 'edit-issue/:id', component:UpdateIssueComponent,canActivate:[AuthGuard],data: {expectedRole: 'COMPANY'}},
   { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard],data: {expectedRole: 'DRIVER'}},
    {path:'fleet',component:FleetComponent,canActivate:[AuthGuard],data: {expectedRole: 'COMPANY'}},
    {path:'company',component:CompanyComponent,canActivate:[AuthGuard],data: {expectedRole: 'ADMIN'}}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {

}

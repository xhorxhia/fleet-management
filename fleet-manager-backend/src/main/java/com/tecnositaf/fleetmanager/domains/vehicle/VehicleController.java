package com.tecnositaf.fleetmanager.domains.vehicle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fleet")
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private VehicleRepository vehicleRepository;




    @GetMapping("{companyId}/pageVehicle/all")

    public Page<List<Vehicle>> pageGetAllVehicle(@PathVariable String companyId ,
                                             @RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size){
        return  vehicleService.pageGetAllVehicle(companyId,page,size);
    }
    @PostMapping("/vehicleList")
    public List<Vehicle> getVehicleList(@RequestBody List<String> idList) {
        List<Vehicle> vehicleList = new ArrayList<Vehicle>();
        for (int i=0;i<idList.size();i++) {
            if (vehicleRepository.findById(idList.get(i)).isPresent()) {
                vehicleList.add(vehicleRepository.findById(idList.get(i)).get());
            }
        }
        return vehicleList;
    }

    @GetMapping("{companyId}/vehicle/all")
    public List<Vehicle> getAllVehicle(@PathVariable String companyId){
        return  vehicleService.getAllVehicle(companyId);
    }


    @GetMapping("/vehicle/{id}")
    public ResponseEntity<Vehicle> getById( @PathVariable("id")String id){
        return  vehicleService.getById(id);
    }

    @PostMapping("{companyId}/vehicle/newAdd")
    public ResponseEntity<Vehicle> addVehicle(@PathVariable String companyId, @RequestBody Vehicle vehicle){
        return  vehicleService.addNewVehicle(vehicle,companyId);
    }

    @PutMapping("/vehicles/update")
    public void updateVehicles(@RequestBody List<Vehicle> vehicles){
        vehicleRepository.saveAll(vehicles);
    }


    @PutMapping ("/vehicle/update/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable String id,@RequestBody Vehicle vehicle){
        return  vehicleService.updateVehicle(vehicle,id);
    }

    @DeleteMapping("/deleteVehicle/{id}")
    public ResponseEntity<HttpStatus> deleteVehicleById(@PathVariable("id") String id){
        return vehicleService.deleteVehicleById(id);
    }

//    @DeleteMapping('/delete/vehicles/all')
//    public void deleteVehicleById(@PathVariable("id")String id){
//        vehicleService.deleteVehicleById(id);
//    }

}

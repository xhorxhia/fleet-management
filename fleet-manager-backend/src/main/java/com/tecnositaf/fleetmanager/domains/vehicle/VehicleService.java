package com.tecnositaf.fleetmanager.domains.vehicle;

import com.tecnositaf.fleetmanager.domains.company.Company;
import com.tecnositaf.fleetmanager.domains.company.CompanyRepository;
import com.tecnositaf.fleetmanager.domains.driver.Driver;
import com.tecnositaf.fleetmanager.domains.driver.DriverRepository;
import com.tecnositaf.fleetmanager.domains.fleet.Fleet;
import com.tecnositaf.fleetmanager.domains.fleet.FleetRepository;
import com.tecnositaf.fleetmanager.domains.vehicleServices.VehicleServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private CompanyRepository companyRepository;


    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private FleetRepository fleetRepository;
    @Autowired
    private VehicleServicesService vehicleServicesService;

    public List<Vehicle> getAll() {
        return vehicleRepository.findAll();
    }

    public Page<List<Vehicle>> pageGetAllVehicle(String companyId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return vehicleRepository.findAllByCompanyId(companyId, pageable);


    }

    public List<Vehicle> getAllVehicle(String companyId) {
        return vehicleRepository.findAllByCompanyId(companyId);
    }

    public ResponseEntity<Vehicle> getById(String id) {


        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        if (vehicle.isPresent()) {
            return new ResponseEntity<>(vehicle.get(), HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }


    public ResponseEntity<Vehicle> addNewVehicle(Vehicle vehicle, String companyId) {
        Optional<Company> company = companyRepository.findById(companyId);
        if (company.isPresent()) {
            vehicle.setCompanyId(companyId);
            vehicleRepository.save(vehicle);
            List<String> list = company.get().getVehicleId();
            list.add(vehicle.getId());

//            Optional<Company> companyL = companyRepository.findById(vehicle.getCompanyId());
            company.ifPresent(company1 -> {
                company1.setVehicleId(list);
                companyRepository.save(company1);

            });

            return new ResponseEntity<>(vehicle, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    public ResponseEntity<Vehicle> updateVehicle(Vehicle vehicle, String id) {
        Optional<Vehicle> vehicleControll = vehicleRepository.findById(id);
        if (vehicleControll.isPresent()) {
            vehicleRepository.save(vehicle);
            return new ResponseEntity<>(vehicle, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    public ResponseEntity<HttpStatus> deleteVehicleById(String id) {
        System.out.println("une jame id" + id);
        Optional<Vehicle> vehicleControl = vehicleRepository.findById(id);
        if (vehicleControl.isPresent()) {
            try {

                String companyId = vehicleControl.get().getCompanyId();
                System.out.println("kompania" + companyId);
                Optional<Company> company = companyRepository.findById(companyId);

                if (company.isPresent()) {

                    List<String> allVehicle = company.get().getVehicleId();
                    allVehicle.remove(id);
                    company.get().setVehicleId(allVehicle);
                    companyRepository.save(company.get());
                }


                Optional<Driver> driver = driverRepository.findByVehicleId(id);
                if (driver != null) {
                    if (driver.isPresent()) {
                        driver.get().setVehicleId("");
                        driverRepository.save(driver.get());
                    }
                }
                System.out.println("jalla shofer jalla" + driver);


                String fleetId = vehicleControl.get().getFleetId();
                System.out.println("fleet" + fleetId);
                if (fleetId != null) {
                    Optional<Fleet> fleet = fleetRepository.findById(fleetId);
                    if (fleet.isPresent()) {
                        List<String> allVehiclesOnFleet = fleet.get().getVehicleId();
                        allVehiclesOnFleet.remove(id);
                        fleet.get().setVehicleId(allVehiclesOnFleet);
                        fleetRepository.save(fleet.get());
                    }
                }


                vehicleRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);

            } catch (Exception e) {
                System.out.println(e);
                System.out.println(e.getCause());
                System.out.println(e.getLocalizedMessage());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }


        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
}







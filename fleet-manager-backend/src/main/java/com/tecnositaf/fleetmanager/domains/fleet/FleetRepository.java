package com.tecnositaf.fleetmanager.domains.fleet;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FleetRepository extends MongoRepository<Fleet, String> {

    Fleet findByName(String name);
    List<Fleet> findAllByCompanyId(String id);
    Page<Fleet> findAllByCompanyId(String id, Pageable pageable);
    Boolean existsByName(String name);
    Boolean existsByNameAndCompanyId(String name, String companyId);
    void deleteAllByCompanyId(String id);
    Fleet findByNameAndCompanyId(String name,String companyId);
}

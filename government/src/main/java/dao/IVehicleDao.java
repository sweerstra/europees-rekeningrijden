package dao;

import domain.Vehicle;

import java.util.List;

public interface IVehicleDao {
    Vehicle findById(long id);

    Vehicle findByLicenseplate(String licencePlate);

    List<Vehicle> findAll();

    Vehicle update(Vehicle entity);

    Vehicle create(Vehicle entity);

    void delete(Vehicle entity);
}

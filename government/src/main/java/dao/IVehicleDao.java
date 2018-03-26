package dao;

import Domain.Vehicle;

import java.util.List;

public interface IVehicleDao {

    Vehicle findById(long id);

    List<Vehicle> findAll();

    Vehicle create(Vehicle entity);

    void delete(Vehicle entity);
}

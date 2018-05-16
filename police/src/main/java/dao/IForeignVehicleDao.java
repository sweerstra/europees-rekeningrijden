package dao;

import domain.ForeignVehicle;

import java.util.List;

public interface IForeignVehicleDao {

    ForeignVehicle findById(long id);

    List<ForeignVehicle> findAll();

    ForeignVehicle create(ForeignVehicle entity);

    void delete(ForeignVehicle entity);

    ForeignVehicle update(ForeignVehicle entity);
}

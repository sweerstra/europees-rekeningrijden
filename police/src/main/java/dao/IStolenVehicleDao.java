package dao;

import domain.StolenVehicle;

import java.util.List;

public interface IStolenVehicleDao {

    StolenVehicle findById(long id);

    List<StolenVehicle> findAll();

    StolenVehicle create(StolenVehicle entity);

    void delete(StolenVehicle entity);

    StolenVehicle update(StolenVehicle entity);
}

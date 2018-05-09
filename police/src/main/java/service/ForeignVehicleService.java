package service;


import dao.IForeignVehicleDao;
import domain.ForeignVehicle;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class ForeignVehicleService {

    @Inject
    private IForeignVehicleDao foreignVehicleDao;

    public ForeignVehicleService() {
        super();
    }

    public ForeignVehicle addForeignVehicle(ForeignVehicle foreignVehicle) {
        return foreignVehicleDao.create(foreignVehicle);
    }

    public void deleteForeignVehicle(ForeignVehicle foreignVehicle) {
        foreignVehicleDao.delete(foreignVehicle);
    }

    public ForeignVehicle updateForeignVehicle(ForeignVehicle foreignVehicle) {
        return foreignVehicleDao.update(foreignVehicle);
    }

    public ForeignVehicle findForeignVehicleById(long id) {
        return foreignVehicleDao.findById(id);
    }
}

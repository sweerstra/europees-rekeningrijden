package service;

import dao.IStolenVehicleDao;
import domain.StolenVehicle;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class StolenVehicleService {

    @Inject
    private IStolenVehicleDao stolenVehicleDao;

    public StolenVehicleService() {
        super();
    }

    public StolenVehicle addstolenVehicle(StolenVehicle stolenVehicle) {
        return stolenVehicleDao.create(stolenVehicle);
    }

    public void deleteStolenVehicle(StolenVehicle stolenVehicle) {
        stolenVehicleDao.delete(stolenVehicle);
    }

    public StolenVehicle updateStolenVehicle(StolenVehicle stolenVehicle) {
        return stolenVehicleDao.update(stolenVehicle);
    }

    public StolenVehicle findStolenVehicleById(Long iD) {
        return stolenVehicleDao.findById(iD);
    }
}

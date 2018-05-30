package service;

import dao.IStolenVehicleDao;
import domain.StolenVehicle;
import utils.DateUtils;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.Date;
import java.util.List;

@Stateless
public class StolenVehicleService {

    @Inject
    private IStolenVehicleDao stolenVehicleDao;

    public StolenVehicleService() {
        super();
    }

    public StolenVehicle addstolenVehicle(StolenVehicle stolenVehicle) {
        Date date = DateUtils.createDateFromString(stolenVehicle.getDateString(), "dd-MM-yyyy hh:mm");
        if (date == null) return null;

        stolenVehicle.setDate(date);

        return stolenVehicleDao.create(stolenVehicle);
    }

    public void deleteStolenVehicle(StolenVehicle stolenVehicle) {
        stolenVehicleDao.delete(stolenVehicle);
    }

    public StolenVehicle updateStolenVehicle(StolenVehicle stolenVehicle) {
        return stolenVehicleDao.update(stolenVehicle);
    }

    public StolenVehicle findStolenVehicleById(Long id) {
        return stolenVehicleDao.findById(id);
    }

    public List<StolenVehicle> findAll() {
        return stolenVehicleDao.findAll();
    }
}

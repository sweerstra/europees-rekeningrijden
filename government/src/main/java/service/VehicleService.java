package service;

import com.mysql.cj.core.util.StringUtils;
import dao.IVehicleDao;
import domain.Vehicle;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class VehicleService {

    @Inject
    private IVehicleDao dao;

    public VehicleService() {
        super();
    }

    public Vehicle create(Vehicle entity) {
        if (dao.findById(entity.getId()) == null) {
            return dao.create(entity);
        }
        return null;
    }

    public void delete(long id) {
        Vehicle entity = dao.findById(id);
        dao.delete(entity);
    }

    public void update() {

    }

    public Vehicle findById(long id) {
        return dao.findById(id);
    }

    public Vehicle findByLicencePlate(String licensePlate) {
        if (StringUtils.isNullOrEmpty(licensePlate)) return null;

        return dao.findByLicenseplate(licensePlate);
    }

    public List<Vehicle> findAll() {
        return dao.findAll();
    }
}

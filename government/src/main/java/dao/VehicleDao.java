package dao;

import Domain.Vehicle;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class VehicleDao extends DaoFacade<Vehicle> implements IVehicleDao{
    @PersistenceContext(name = "GovernmentPU")
    private EntityManager em;

    public VehicleDao() {
        super(Vehicle.class);
    }

}

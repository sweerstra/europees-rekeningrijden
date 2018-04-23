package dao;

import domain.Vehicle;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class JPAVehicleDao extends DaoFacade<Vehicle> implements IVehicleDao {
    @PersistenceContext(unitName = "GovernmentPU")
    private EntityManager em;

    public JPAVehicleDao() {
        super(Vehicle.class);
    }

    public Vehicle findByLicenseplate(String licencePlate) {
        try {
            return (Vehicle) em.createQuery("SELECT v from Vehicle v WHERE v.licensePlate = :licensePlate")
                    .setParameter("licensePlate", licencePlate)
                    .getSingleResult();
        } catch (Exception e) {return null;}
    }
}

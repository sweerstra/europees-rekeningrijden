package dao;

import domain.ForeignVehicle;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class JPAForeignVehicleDao extends DaoFacade<ForeignVehicle> implements IForeignVehicleDao{

    @PersistenceContext(unitName = "PolicePU")
    private EntityManager em;

    public JPAForeignVehicleDao() {
        super(ForeignVehicle.class);
    }
}

package dao;

import domain.StolenVehicle;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class JPAStolenVehicleDao extends DaoFacade<StolenVehicle> implements IStolenVehicleDao{

    @PersistenceContext(unitName = "PolicePU")
    private EntityManager em;

    public JPAStolenVehicleDao() {
        super(StolenVehicle.class);
    }
}

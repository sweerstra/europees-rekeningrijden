package dao;

import domain.StolenVehicle;
import domain.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class JPAUserDao extends daoFacade<User> implements IUserDao{

    @PersistenceContext(unitName = "PolicePU")
    private EntityManager em;

    public JPAUserDao() {
        super(User.class);
    }


}

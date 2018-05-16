package dao;

import domain.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class JPAUserDao extends DaoFacade<User> implements IUserDao{

    @PersistenceContext(unitName = "PolicePU")
    private EntityManager em;

    public JPAUserDao() {
        super(User.class);
    }


}

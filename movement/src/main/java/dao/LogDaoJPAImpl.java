package dao;

import domain.Log;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class LogDaoJPAImpl extends DaoFacade<Log> implements ILogDao{
    @PersistenceContext(unitName = "MovementRegistrationPU")
    private EntityManager em;

    public LogDaoJPAImpl() {
        super(Log.class);
    }
}

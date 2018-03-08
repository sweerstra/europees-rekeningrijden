package dao;

import domain.Log;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class LogDaoJPAImpl extends DaoFacade<Log> implements ILogDao{
    @PersistenceContext(unitName = "MovementRegistrationPU")
    private EntityManager em;

    public LogDaoJPAImpl(Class<Log> entityClass) {
        super(entityClass);
    }
}

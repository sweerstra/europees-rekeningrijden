package dao;

import domain.Tracker;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


public class TrackerDaoJPAImpl extends DaoFacade<Tracker> implements ITrackerDao {
    @PersistenceContext(name = "MovementRegistrationPU")
    private EntityManager entityManager;

    public TrackerDaoJPAImpl(Class<Tracker> entityClass) {
        super(entityClass);
    }
}

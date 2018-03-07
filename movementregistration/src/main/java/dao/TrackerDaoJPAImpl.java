package dao;

import domain.Tracker;

import javax.persistence.EntityManager;


public class TrackerDaoJPAImpl extends DaoFacade<Tracker> implements ITrackerDao {

    private EntityManager entityManager;

    public TrackerDaoJPAImpl(Class<Tracker> entityClass) {
        super(entityClass);
    }



}

package dao;

import domain.Tracker;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class TrackerDaoJPAImpl extends DaoFacade<Tracker> implements ITrackerDao {
    @PersistenceContext(name = "MovementRegistrationPU")
    private EntityManager entityManager;

    public TrackerDaoJPAImpl() {
        super(Tracker.class);
    }
}

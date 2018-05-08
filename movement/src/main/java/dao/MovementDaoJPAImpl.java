package dao;

import domain.Movement;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.List;

@Stateless
@SuppressWarnings("unchecked")
public class MovementDaoJPAImpl extends DaoFacade<Movement> implements IMovementDao {
    @PersistenceContext(name = "MovementRegistrationPU")
    private EntityManager em;

    public MovementDaoJPAImpl() {
        super(Movement.class);
    }

    @Override
    public List<Movement> findByTrackerId(String trackerId) {
        return em.createQuery("SELECT m FROM Movement m WHERE m.trackerId = :trackerId")
                .setParameter("trackerId", trackerId)
                .getResultList();
    }

    @Override
    public List<Movement> findBetweenDates(String trackerId, Date startDate, Date endDate) {
        return em.createQuery("SELECT m FROM Movement m WHERE m.trackerId = :trackerId AND m.dateTime >= :startDate AND m.dateTime <= :endDate")
                .setParameter("trackerId", trackerId)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();
    }
}

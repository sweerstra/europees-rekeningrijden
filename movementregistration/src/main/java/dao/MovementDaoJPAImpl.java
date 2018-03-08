package dao;

import domain.Movement;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class MovementDaoJPAImpl extends DaoFacade<Movement> implements IMovementDao {
    @PersistenceContext(name = "MovementRegistrationPU")
    private EntityManager em;

    public MovementDaoJPAImpl() {
        super(Movement.class);
    }

    @Override
    public Movement findbyAuthorisationcode(String authorisationCode) {
        return null;
    }
}

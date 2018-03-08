package dao;

import domain.Movement;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

public class MovementDaoJPAImpl extends DaoFacade<Movement> implements IMovementDao {

    private EntityManager entityManager;

    public MovementDaoJPAImpl(Class<Movement> entityClass) {
        super(entityClass);
    }


}

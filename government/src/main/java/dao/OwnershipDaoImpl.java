package dao;

import domain.Ownership;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class OwnershipDaoImpl extends DaoFacade<Ownership> implements IOwnershipDao {
    @PersistenceContext(name = "GovernmentPU")
    private EntityManager em;

    public OwnershipDaoImpl() {
        super(Ownership.class);
    }
}

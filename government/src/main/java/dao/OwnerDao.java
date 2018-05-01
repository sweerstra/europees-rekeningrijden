package dao;

import domain.Owner;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class OwnerDao extends DaoFacade<Owner> implements IOwnerDao {
    @PersistenceContext(unitName = "GovernmentPU")
    private EntityManager em;

    public OwnerDao() {
        super(Owner.class);
    }
}

package dao;

import domain.Owner;
import domain.Vehicle;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class JPAOwnerDao extends DaoFacade<Owner> implements IOwnerDao {
    @PersistenceContext(unitName = "GovernmentPU")
    private EntityManager em;

    public JPAOwnerDao() {
        super(Owner.class);
    }

    @Override
    public Owner findByBSN(String citizenServiceNumber) {
        try {
            return (Owner) em.createQuery("SELECT o from Owner o WHERE o.citizenServiceNumber = :citizenServiceNumber")
                    .setParameter("citizenServiceNumber", citizenServiceNumber)
                    .getSingleResult();
        } catch (Exception e) {return null;}
    }
}

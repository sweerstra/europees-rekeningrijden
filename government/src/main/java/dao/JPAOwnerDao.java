package dao;

import domain.Owner;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

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

    @Override
    public List<Owner> findByName(String name) {
        return em.createQuery("SELECT o from Owner o " +
                "WHERE LOWER(o.firstName) LIKE LOWER(:name) OR" +
                " LOWER(o.lastName) LIKE LOWER(:name)")
                .setParameter("name", "%" + name + "%")
                .getResultList();

    }

    @Override
    public Owner findByEmail(String email) {
        try {
            return (Owner) em.createQuery("SELECT o from Owner o WHERE o.email = :email")
                    .setParameter("email", email)
                    .getSingleResult();
        } catch (Exception e) {return null;}
    }
}

package dao;

import domain.Ownership;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
@SuppressWarnings("unchecked")
public class JPAOwnershipDao extends DaoFacade<Ownership> implements IOwnershipDao {
    @PersistenceContext(name = "GovernmentPU")
    private EntityManager em;

    public JPAOwnershipDao() {
        super(Ownership.class);
    }

    public List<Ownership> findLatest() {
        return em.createQuery("SELECT o from Ownership o WHERE o.endDate = NULL")
                .getResultList();
    }

    public List<Ownership> findByOwner(long id) {
        return em.createQuery("SELECT o from Ownership o WHERE o.owner.id = :id")
                .setParameter("id", id)
                .getResultList();
    }
}

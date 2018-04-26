package dao;

import domain.EmissionCategory;
import domain.Ownership;
import domain.Region;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class JPAEmissionDao extends DaoFacade<EmissionCategory> implements IEmissionDao {

    @PersistenceContext(unitName = "GovernmentPU")
    private EntityManager em;

    public JPAEmissionDao()
    {
        super(EmissionCategory.class);
    }

    @Override
    public EmissionCategory findByName(String name) {
        try {
            return (EmissionCategory) em.createQuery("SELECT r FROM EmissionCategory r WHERE r.name = :name")
                    .setParameter("name", name)
                    .getSingleResult();
        } catch (Exception e) { return null; }
    }

    @Override
    public void deleteByName(EmissionCategory entity) {
        em.createQuery("DELETE from EmissionCategory e WHERE e.name = :name")
                .setParameter("name", entity.getName())
                .executeUpdate();
    }


}

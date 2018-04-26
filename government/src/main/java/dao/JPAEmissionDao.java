package dao;

import domain.EmissionCategory;
import domain.Ownership;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class JPAEmissionDao extends DaoFacade<EmissionCategory> implements IEmissionDao {

    @PersistenceContext(unitName = "GovernmentPU")
    private EntityManager em;

    public JPAEmissionDao()
    {
        super(EmissionCategory.class);
    }
}

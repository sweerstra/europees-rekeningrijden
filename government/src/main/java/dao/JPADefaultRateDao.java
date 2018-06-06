package dao;

import domain.DefaultRate;
import domain.Invoice;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class JPADefaultRateDao extends DaoFacade<DefaultRate> implements IDefaultRateDao {
    @PersistenceContext(unitName = "GovernmentPU")
    private EntityManager em;

    public JPADefaultRateDao() {
        super(DefaultRate.class);
    }
}

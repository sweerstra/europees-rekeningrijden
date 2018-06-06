package dao;

import domain.Invoice;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class JPAInvoiceDao extends DaoFacade<Invoice> implements IInvoiceDao{
    @PersistenceContext(unitName = "GovernmentPU")
    private EntityManager em;

    public JPAInvoiceDao() {
        super(Invoice.class);
    }

}

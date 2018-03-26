package dao;

import Domain.Invoice;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class InvoiceDao extends DaoFacade<Invoice> implements IInvoiceDao{
    @PersistenceContext(name = "GovernmentPU")
    private EntityManager em;

    public InvoiceDao() {
        super(Invoice.class);
    }

}

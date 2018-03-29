package service;

import dao.IInvoiceDao;
import domain.Invoice;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class InvoiceService {

    @Inject
    private IInvoiceDao dao;

    public InvoiceService()
    {
        super();
    }


}

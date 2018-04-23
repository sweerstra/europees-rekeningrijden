package service;

import dao.IInvoiceDao;
import domain.Invoice;
import domain.Ownership;
import domain.Vehicle;
import support.InvoiceGenerator;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.io.InputStream;
import java.util.List;

@Stateless
public class InvoiceService {

    @Inject
    private IInvoiceDao dao;

    private InvoiceGenerator invoiceGenerator;

    public InvoiceService()
    {
        super();
        invoiceGenerator = new InvoiceGenerator();
    }

    public Invoice create(Invoice entity) {
        if (dao.findById(entity.getId()) == null) {
            return dao.create(entity);
        }
        return null;
    }

    public Invoice findById(long id) {
        return dao.findById(id);
    }

    public List<Invoice> findAll() {
        return dao.findAll();
    }

    public InputStream generateInvoicePdf(long id, Ownership ownership){
        Invoice invoice = findById(id);

        return invoiceGenerator.objectToPdf(invoice, ownership);
    }

}

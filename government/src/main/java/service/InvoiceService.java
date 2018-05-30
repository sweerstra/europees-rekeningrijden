package service;

import dao.IInvoiceDao;
import domain.Invoice;
import domain.Ownership;
import domain.Vehicle;
import support.HttpHelper;
import support.InvoiceCalculator;
import support.InvoiceGenerator;
import domain.Invoice.PaymentStatus;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.io.InputStream;
import java.util.List;

@Stateless
public class InvoiceService {

    @Inject
    private IInvoiceDao dao;

    @Inject
    private EmissionService emissionService;

    @Inject
    private RegionService regionService;

    private InvoiceGenerator invoiceGenerator;

    public InvoiceService() {
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

    public InputStream generateInvoicePdf(long id, Ownership ownership) {
        Invoice invoice = findById(id);
        invoiceGenerator.calculateInvoice(regionService.findAll(), emissionService.findAll());
        return invoiceGenerator.objectToPdf(invoice, ownership);
    }

    public Invoice changePaymentStatus(Invoice invoice, PaymentStatus status) {
        invoice.setPaid(status);

        return dao.update(invoice);
    }

}

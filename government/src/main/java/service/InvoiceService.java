package service;

import dao.IInvoiceDao;
import domain.*;
import support.HttpHelper;
import support.InvoiceCalculator;
import support.InvoiceGenerator;
import domain.Invoice.PaymentStatus;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Stateless
public class InvoiceService {

    @Inject
    private IInvoiceDao dao;

    @Inject
    private EmissionService emissionService;

    @Inject
    private RegionService regionService;

    @Inject
    private VehicleService vehicleService;

    @Inject
    private OwnershipService ownershipService;

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

    public List<Invoice> findByOwnership(Ownership ownership) {
        return findAll().stream().filter(i -> i.getOwnership().getId() == ownership.getId()).collect(Collectors.toList());
    }

    public List<Invoice> findAll() {
        return dao.findAll();
    }

    public InputStream generateInvoicePdf(long vehicleId, Ownership ownership, int month, int year) {
        Vehicle vehicle = vehicleService.findById(vehicleId);
        List<Ownership> ownerships = ownershipService.getOwnershipsByVehicleOrTrackerId(vehicleId, null);
        List<Region> regions = regionService.findAll();
        List<EmissionCategory> emissionCategories = emissionService.findAll();

        if (regions.isEmpty() || emissionCategories.isEmpty() || ownerships.isEmpty()) return null;

        List<Invoice> invoices = invoiceGenerator.calculateInvoice(vehicle, regions, ownerships, emissionCategories, month, year);
        for (Invoice invoice : invoices) {
            dao.create(invoice);
            return invoiceGenerator.objectToPdf(invoice, ownership);
        }
        return null;
    }

    public InputStream generateInvoicePdf(Invoice invoice) {
        return invoiceGenerator.objectToPdf(invoice, invoice.getOwnership());
    }

    public Invoice changePaymentStatus(Invoice invoice, PaymentStatus status) {
        invoice.setPaid(status);

        return dao.update(invoice);
    }

}

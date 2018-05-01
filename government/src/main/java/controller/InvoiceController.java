package controller;

import domain.Invoice;
import domain.Ownership;
import service.InvoiceService;
import service.OwnershipService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/invoice")
public class InvoiceController {
    @Inject
    private InvoiceService service;

    @Inject
    private OwnershipService ownershipService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addInvoice(Invoice invoice) {
       Invoice added = service.create(invoice);
       invoice.createCurrentDateOfPayment();

        if (added == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(added).build();
    }

    @GET
    @Path("/{id}")
    public Response getInvoice(@PathParam("id") long id) {
        Invoice invoice = service.findById(id);

        if (invoice == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(invoice).build();
    }

    @GET
    @Path("/generate/{id}")
    public Response generateInvoicePdf(@PathParam("id") long id) {
        Invoice invoice = service.findById(id);

        if (invoice == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Ownership ownership = ownershipService.getLatestOwnership(invoice.getVehicle().getId());
        return Response.ok(service.generateInvoicePdf(id, ownership), "application/pdf").build();
    }

    @PUT
    @Path("{id}/paid")
    public Response setInvoiceToPaid(@PathParam("id") long id){
        Invoice invoice = service.findById(id);

        if(invoice == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(service.changePaymentStatus(invoice, Invoice.PaymentStatus.PAID)).build();
    }

    @PUT
    @Path("{id}/cancel")
    public Response setInvoiceToCancelled(@PathParam("id") long id){
        Invoice invoice = service.findById(id);

        if(invoice == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(service.changePaymentStatus(invoice, Invoice.PaymentStatus.CANCELLED)).build();
    }

    @PUT
    @Path("{id}/open")
    public Response setInvoiceToOpen(@PathParam("id") long id){
        Invoice invoice = service.findById(id);

        if(invoice == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(service.changePaymentStatus(invoice, Invoice.PaymentStatus.OPEN)).build();
    }
}

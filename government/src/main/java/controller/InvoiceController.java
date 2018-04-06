package controller;

import domain.Invoice;
import service.InvoiceService;

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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addInvoice(Invoice invoice) {
       Invoice added = service.create(invoice);
       invoice.setCurrentDateOfPayment();

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
}

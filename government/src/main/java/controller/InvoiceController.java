package controller;

import domain.Invoice;
import domain.Vehicle;
import service.InvoiceService;
import service.VehicleService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
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


}

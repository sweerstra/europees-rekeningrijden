package controller;

import domain.Invoice;
import domain.Vehicle;
import service.InvoiceService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/invoices")
public class InvoicesController {

    @Inject
    private InvoiceService service;

    @GET
    public Response getInvoices() {
        List<Invoice> invoices = service.findAll();

        if (invoices == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(invoices).build();
    }
}

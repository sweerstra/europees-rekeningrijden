package controller;

import domain.Invoice;
import domain.Owner;
import domain.Ownership;
import domain.Vehicle;
import service.InvoiceService;
import service.OwnershipService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/invoices")
public class InvoicesController {

    @Inject
    private InvoiceService service;

    @Inject
    private OwnershipService ownershipService;

    @GET
    public Response getInvoices() {
        List<Invoice> invoices = service.findAll();

        if (invoices == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(invoices).build();
    }

    @GET
    @Path("/{id}")
    public Response getInvoicesForOwner(@PathParam("id") long ownerId) {
        List<Ownership> ownerships = ownershipService.getOwnershipsByOwner(ownerId);
        List<Invoice> invoices = new ArrayList<>();

        for (Ownership ownership : ownerships) {
            invoices.addAll(service.findByOwnership(ownership));
        }

        return Response.ok(invoices).build();
    }
}

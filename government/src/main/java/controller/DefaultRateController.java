package controller;

import domain.DefaultRate;
import domain.EmissionCategory;
import domain.Ownership;
import org.glassfish.jersey.jackson.internal.jackson.jaxrs.json.annotation.JSONP;
import service.DefaultRateService;
import service.InvoiceService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/rate")
public class DefaultRateController {
    @Inject
    private DefaultRateService service;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addRate(DefaultRate rate) {
        DefaultRate createdRate = service.create(rate);

        return Response.ok(createdRate).build();
    }

    @GET
    @Path("/all")
    public Response getAllRate() {
        List<DefaultRate> rates = service.findAll();

        return Response.ok(rates).build();
    }
}

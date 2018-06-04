package controller;

import domain.DefaultRate;
import domain.Ownership;
import org.glassfish.jersey.jackson.internal.jackson.jaxrs.json.annotation.JSONP;
import service.DefaultRateService;
import service.InvoiceService;

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


}

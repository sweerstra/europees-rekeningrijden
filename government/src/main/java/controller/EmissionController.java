package controller;

import domain.EmissionCategory;
import domain.Region;
import service.EmissionService;
import service.RegionService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
@Path("/emission")
@Produces(MediaType.APPLICATION_JSON)
public class EmissionController {

    @Inject
    private EmissionService service;


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addEmission(EmissionCategory emission) {
        EmissionCategory added = service.create(emission);

        if (added == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        return Response.ok(emission).build();
    }

    @GET
    @Path("/all")
    public Response getAllEmissions() {
        List<EmissionCategory> emissions = service.findAll();

        return Response.ok(emissions).build();
    }
}

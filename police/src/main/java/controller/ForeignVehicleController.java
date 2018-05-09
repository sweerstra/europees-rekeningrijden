package controller;

import domain.ForeignVehicle;
import domain.StolenVehicle;
import service.ForeignVehicleService;
import service.StolenVehicleService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/foreignvehicle")
public class ForeignVehicleController {

    @Inject
    private ForeignVehicleService service;

    @GET
    @Path("/{id}")
    public Response getOwner(@PathParam("id") long id) {
       ForeignVehicle foreignVehicle = service.findForeignVehicleById(id);

        if (foreignVehicle == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(foreignVehicle).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addForeignVehicle(ForeignVehicle foreignVehicle) {
       foreignVehicle = service.addForeignVehicle(foreignVehicle);

        if (foreignVehicle == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        return Response.ok(foreignVehicle).build();
    }
}

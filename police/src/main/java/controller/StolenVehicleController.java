package controller;

import domain.StolenVehicle;
import domain.User;
import service.StolenVehicleService;
import service.UserService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/stolenvehicle")
public class StolenVehicleController {

    @Inject
    private StolenVehicleService service;

    @GET
    @Path("/{id}")
    public Response getStolenVehicle(@PathParam("id") long id) {
        StolenVehicle stolenVehicle = service.findStolenVehicleById(id);

        if (stolenVehicle == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(stolenVehicle).build();
    }

    @GET
    public Response getStolenVehicles() {
        List<StolenVehicle> stolenVehicles = service.findAll();

        return Response.ok(stolenVehicles).build();
    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response reportStolenVehicle(StolenVehicle stolenVehicle) {
       stolenVehicle = service.addstolenVehicle(stolenVehicle);
       return Response.ok(stolenVehicle).build();
    }
}

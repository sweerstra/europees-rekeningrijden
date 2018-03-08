package controllers;

import domain.Movement;
import services.MovementService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Date;
import java.util.List;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
public class MovementController {

    @Inject
    private MovementService service;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addMovement(Movement movement) {
        movement = service.addMovement(movement);
        return Response.ok(movement).build();
    }

    @GET
    @Path("/all")
    public Response getMovements() {
        List<Movement> movements = service.getAllMovements();
        return Response.ok(movements).build();
    }


}

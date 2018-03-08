package controllers;

import domain.Movement;
import services.MovementService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Date;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
public class MovementController {
    @Inject
    private MovementService service;

    @GET
    @Path("/all")
    public Response getMovements() {
        Movement movement = new Movement("code123", "1234", 50.123, 5.430, new Date());
        return Response.ok(movement).build();
    }


}

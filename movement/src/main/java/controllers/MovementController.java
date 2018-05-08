package controllers;

import domain.Movement;
import services.MovementService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/movement")
public class MovementController {
    @Inject
    private MovementService service;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addMovement(Movement movement) {
        Movement addedMovement = service.addMovement(movement);

        if (addedMovement == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        return Response.ok(movement).build();
    }

    @GET
    @Path("/{trackerId}")
    public Response getByTrackerId(@PathParam("trackerId") String trackerId) {
        List<Movement> movements = service.getMovementsByTrackerId(trackerId);

        return Response.ok(movements).build();
    }

    @GET
    @Path("/{trackerId}/{startDate}/{endDate}")
    public Response getByStartAndEndDate(@PathParam("trackerId") String trackerId, @PathParam("startDate") String startDate, @PathParam("endDate") String endDate) {
        List<Movement> movements = service.getMovementsBetweenDates(trackerId, startDate, endDate);

        if (movements == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        return Response.ok(movements).build();
    }

    @GET
    @Path("/all")
    public Response getMovements() {
        List<Movement> movements = service.getAllMovements();

        return Response.ok(movements).build();
    }
}

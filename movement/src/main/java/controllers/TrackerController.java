package controllers;

import domain.Movement;
import domain.Tracker;
import services.MovementService;
import services.TrackerService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Date;
import java.util.List;

@RequestScoped
@Path("/tracker")
@Produces(MediaType.APPLICATION_JSON)
public class TrackerController {

    @Inject
    private TrackerService service;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addTracker(Tracker tracker) {
        tracker = service.create(tracker);
        return Response.ok(tracker).build();
    }


    @GET
    @Path("/all")
    public Response getTrackers() {
        List<Tracker> movements = service.findAll();
        return Response.ok(movements).build();
    }

    @GET
    @Path("/{id}")
    public Response getTrackerbyID(@PathParam("id") long id) {
        Tracker tracker = service.findById(id);
        return Response.ok(tracker).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteTrackerbyid(@PathParam("id") long id) {
        service.delete(id);
        return Response.ok().build();
    }

}

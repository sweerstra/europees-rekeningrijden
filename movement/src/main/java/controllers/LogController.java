package controllers;

import domain.Log;
import services.LogService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
@Path("/log")
@Produces(MediaType.APPLICATION_JSON)
public class LogController {

    @Inject
    private LogService service;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addLog(Log log) {
        log = service.create(log);
        return Response.ok(log).build();
    }

    @GET
    @Path("/all")
    public Response getLogs() {
        List<Log> logs = service.findAll();
        return Response.ok(logs).build();
    }

    @GET
    @Path("/{id}")
    public Response getTrackerbyID(@PathParam("id") long id) {
        Log log = service.findById(id);
        return Response.ok(log).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteTrackerbyid(@PathParam("id") long id) {
        service.delete(id);
        return Response.ok().build();
    }

    @DELETE
    public Response deleteLogbyid(long id) {
        service.delete(id);
        return Response.ok().build();
    }
}

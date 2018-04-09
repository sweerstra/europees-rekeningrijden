package controller;

import domain.Ownership;
import service.OwnershipService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/ownership")
public class OwnershipController {
    @Inject
    private OwnershipService service;

    @GET
    @Path("/{id}")
    public Response getOwner(@PathParam("id") long id) {
        Ownership ownership = service.getById(id);

        if (ownership == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(ownership).build();
    }

    @GET
    @Path("/all")
    public Response getOwnerships() {
        List<Ownership> owners = service.getAllOwnerships();

        return Response.ok(owners).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addOwnership(Ownership ownership) {
        Ownership createdOwnership = service.addOwnership(ownership);

        return Response.ok(createdOwnership).build();
    }

    @GET
    @Path("/latest")
    public Response getLatest() {
        List<Ownership> owners = service.getLatestOwnerships();

        return Response.ok(owners).build();
    }

    @GET
    @Path("/owner/{id}")
    public Response getByOwner(@PathParam("id") long id) {
        List<Ownership> owners = service.getOwnershipsByOwner(id);

        return Response.ok(owners).build();
    }

    @GET
    @Path("/vehicle/{id}")
    public Response getByVehicle(@PathParam("id") long id) {
        List<Ownership> owners = service.getOwnershipsByVehicle(id);

        return Response.ok(owners).build();
    }

    // TODO: get ownerships for specific month (date) for owner
}
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
    public Response addOwner(Ownership ownership) {
        Ownership createdOwnership = service.create(ownership);

        return Response.ok(createdOwnership).build();
    }
}
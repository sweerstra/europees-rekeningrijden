package controller;

import domain.Owner;
import service.OwnerService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/owner")
public class OwnerController {
    @Inject
    private OwnerService service;

    @GET
    @Path("/{id}")
    public Response getOwner(@PathParam("id") long id) {
        Owner owner = service.getById(id);

        if (owner == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(owner).build();
    }

    @GET
    @Path("/bsn/{bsn}")
    public Response getOwnerbyBSN(@PathParam("bsn") String citizenServiceNumber) {
        Owner owner = service.getByBSN(citizenServiceNumber);

        if (owner == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(owner).build();
    }
}

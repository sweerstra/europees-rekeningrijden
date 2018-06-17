package controller;

import domain.Owner;
import domain.Ownership;
import service.OwnerService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

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

    @GET
    @Path("/search/{name}")
    public Response getOwnerbyName(@PathParam("name") String name) {
        List<Owner> owners = service.getByName(name);

        return Response.ok(owners).build();
    }

    @GET
    @Path("/email/{email}")
    public Response getOwnerByEmail(@PathParam("email") String email) {
        Owner owner = service.getByEmail(email);

        if (owner == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(owner).build();
    }

    @PUT
    @Path("/{id}/usesbillrider")
    public Response setOwnerUsesBillrider(@PathParam("id") Long id) {
        Owner owner = service.getById(id);

        if (owner == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(service.setUsesBillrider(owner)).build();
    }
}

package controller;

import domain.Owner;
import service.OwnerService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/owners")
public class OwnersController {
    @Inject
    private OwnerService service;

    @GET
    public Response getOwners() {
        List<Owner> owners = service.getAllOwners();

        return Response.ok(owners).build();
    }
}

package controller;


import domain.classes.Route;
import service.RouteService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/route")
public class RouteController {
    @Inject
    private RouteService service;

    @POST
    @Path("/{speed}")
    public Response generateRoute(@PathParam("speed") int speed) {
        Route route = service.generateCoordinates(speed);

        if (route == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        return Response.ok(route).build();
    }
}

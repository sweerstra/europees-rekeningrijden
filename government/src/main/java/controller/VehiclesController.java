package controller;

import domain.Vehicle;
import service.VehicleService;

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
@Path("/vehicles")
public class VehiclesController {

    @Inject
    private VehicleService service;

    @GET
    public Response getVehicle() {
        List<Vehicle> vehicles = service.findAll();

        if (vehicles == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(vehicles).build();
    }
}

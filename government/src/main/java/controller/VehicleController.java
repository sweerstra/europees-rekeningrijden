package controller;

import domain.Vehicle;
import service.VehicleService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/vehicle")
public class VehicleController {

    @Inject
    private VehicleService service;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addVehicle(Vehicle vehicle) {
        Vehicle added = service.create(vehicle);

        if (added == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(vehicle).build();
    }

    @GET
    @Path("/all")
    public Response getVehicle() {
        List<Vehicle> vehicles = service.findAll();

        if (vehicles == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(vehicles).build();
    }
}

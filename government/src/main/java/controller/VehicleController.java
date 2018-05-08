package controller;

import domain.Ownership;
import domain.Vehicle;
import service.OwnershipService;
import service.VehicleService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/vehicle")
public class VehicleController {
    @Inject
    private VehicleService vehicleService;

    @Inject
    private OwnershipService ownershipService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addVehicle(Vehicle vehicle) {
        Vehicle added = vehicleService.create(vehicle);

        if (added == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(vehicle).build();
    }

    @GET
    @Path("/{licensePlate}")
    public Response getVehicleByLicensePlate(@PathParam("licensePlate") String licensePlate) {
        Vehicle vehicle = vehicleService.findByLicencePlate(licensePlate);

        if (vehicle == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(vehicle).build();
    }

    @GET
    @Path("/{licensePlate}/tracker")
    public Response getTrackerByLicensePlate(@PathParam("licensePlate") String licensePlate) {
        Vehicle vehicle = vehicleService.findByLicencePlate(licensePlate);
        if (vehicle == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Ownership ownership = ownershipService.getLatestOwnership(vehicle.getId());
        if (ownership == null || ownership.getEndDate() == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(ownership).build();
    }
}

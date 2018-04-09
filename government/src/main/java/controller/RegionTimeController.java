package controller;

import domain.Invoice;
import domain.RegionTime;
import domain.Vehicle;
import service.RegionTimeService;
import service.VehicleService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/region")
public class RegionTimeController {

    @Inject
    private RegionTimeService service;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addRegionTime(RegionTime regionTime) {
        RegionTime added = service.create(regionTime);

        if (added == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(regionTime).build();
    }

    @GET
    public Response getAllRegionTimes() {
        List<RegionTime> regionTimeList = service.findAll();

        if (regionTimeList == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(regionTimeList).build();
    }
}

package controller;

import domain.Region;
import domain.RegionTime;
import service.RegionService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/region")
public class RegionController {
    @Inject
    private RegionService service;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addRegion(Region region) {
        Region added = service.create(region);

        if (added == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        for (RegionTime time : region.getRegionTimes()) {
            time.setRegion(null);
        }

        return Response.ok(region).build();
    }

    @GET
    @Path("/{name}")
    public Response getRegionByName(@PathParam("name") String name) {
        Region region = service.findByName(name);

        if (region == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        for (RegionTime time : region.getRegionTimes()) {
            time.setRegion(null);
        }

        return Response.ok(region).build();
    }

    @GET
    public Response getAllRegions() {
        List<Region> regions = service.findAll();

        return Response.ok(regions).build();
    }
}

package controller;

import domain.Region;
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

        return Response.ok(region.serialized()).build();
    }

    @GET
    @Path("/{name}")
    public Response getRegionByName(@PathParam("name") String name) {
        Region region = service.findByName(name);

        if (region == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(region.serialized()).build();
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editRegion(@PathParam("id") long id, Region region) {
        Region editedRegion = service.editRegion(id, region);

        if (editedRegion != null) {
            return Response.ok(editedRegion.serialized()).build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @GET
    @Path("/all")
    public Response getAllRegions() {
        List<Region> regions = service.findAll();

        for (Region region : regions) {
            region.serialized();
        }

        return Response.ok(regions).build();
    }
}

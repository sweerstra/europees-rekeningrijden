package main.controllers;


import main.authentication.Credentials;
import main.services.EmployeeService;


import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@RequestScoped
@Path("/employee")
@Produces(MediaType.APPLICATION_JSON)
public class EmployeeController {

    @GET
    public Response removethis() {
        return Response.ok().build();
    }

}

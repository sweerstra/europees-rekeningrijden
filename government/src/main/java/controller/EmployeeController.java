package controller;


import authentication.Security;
import domain.Employee;
import service.EmployeeService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@RequestScoped
@Path("/employee")
@Produces(MediaType.APPLICATION_JSON)
public class EmployeeController {

    @Inject
    private EmployeeService service;

    @GET
    public Response removethis() {
        return Response.ok(service.findEmployeeById((long)18)).build();
    }


    @POST
    @Security
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addEmployeeByAdmin(@HeaderParam("id") Integer id, Employee employee) {
        Employee newEmployee = service.addEmployeeByAdmin(id, employee);

        if (newEmployee != null)
        {
            return Response.ok(newEmployee).build();
        }
        else
        {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

    }

}

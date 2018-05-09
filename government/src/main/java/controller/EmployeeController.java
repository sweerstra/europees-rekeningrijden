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

    @PUT
    @Security
    @Path("/setActive/{id}")
    public Response setEmployeeActive(@HeaderParam("id") Integer selfid, @PathParam("id") String id) {
        Employee updatedEmployee = service.setActiveByAdmin(selfid, Long.parseLong(id));

        if (updatedEmployee != null)
        {
            return Response.ok(updatedEmployee).build();
        }
        else
        {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

    }

    @PUT
    @Security
    @Path("/setActive/{id}")
    public Response setEmployeeInactive (@HeaderParam("id") Integer selfid, @PathParam("id") String id) {
        Employee updatedEmployee = service.setInactiveByAdmin(selfid, Long.parseLong(id));

        if (updatedEmployee != null)
        {
            return Response.ok(updatedEmployee).build();
        }
        else
        {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

    }

    @PUT
    @Security
    @Path("/setRole/{id}/{rolename}")
    public Response setEmployeeRole (@HeaderParam("id") Integer selfID, @PathParam("rolename") String rolename
            , @PathParam("id") String userID) {
        Employee updatedEmployee = service.setEmployeeRole(selfID, Long.parseLong(userID), rolename);

        if (updatedEmployee != null)
        {
            return Response.ok(updatedEmployee).build();
        }
        else
        {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

    }



}

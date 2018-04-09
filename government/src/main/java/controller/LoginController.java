package controller;

import domain.Employee;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.lang3.time.DateUtils;
import service.EmployeeService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.Date;

import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static javax.ws.rs.core.MediaType.APPLICATION_FORM_URLENCODED;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/login")
@Produces(APPLICATION_JSON)
@Consumes(APPLICATION_JSON)
@RequestScoped
public class LoginController {
    @Inject
    private EmployeeService service;

    @POST
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response authenticateUser(@FormParam("email") String email,
                                     @FormParam("password") String password,
                                     @Context UriInfo uriInfo) {

        Employee employee = service.authenthicate(email, password);

        if (employee != null) {
            String token = Jwts.builder()
                    .setSubject(email)
                    .setIssuer(uriInfo.getAbsolutePath().toString())
                    .setIssuedAt(new Date())
                    .setExpiration(DateUtils.addHours(new Date(), 12))
                    .signWith(SignatureAlgorithm.HS512, "GovernmentKey")
                    .compact();

            return Response.ok().header(AUTHORIZATION, "Bearer " + token).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
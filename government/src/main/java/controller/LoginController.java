package controller;

import domain.Employee;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import model.Account;
import org.apache.commons.lang3.time.DateUtils;
import service.EmployeeService;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.Date;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/login")
@Produces(APPLICATION_JSON)
@Consumes(APPLICATION_JSON)
@RequestScoped
public class LoginController {
    @Inject
    private EmployeeService service;

    @POST
    public Response authenticateUser(Account account, @Context UriInfo uriInfo) {
        Employee employee = service.authenthicate(account.getEmail(), account.getPassword());

        if (employee != null) {
            String token = Jwts.builder()
                    .setSubject(employee.getEmail())
                    .setIssuer(uriInfo.getAbsolutePath().toString())
                    .setIssuedAt(new Date())
                    .setExpiration(DateUtils.addHours(new Date(), 12))
                    .signWith(SignatureAlgorithm.HS512, "GovernmentKey")
                    .compact();

            return Response.ok("\"Bearer " + token + "\"").build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
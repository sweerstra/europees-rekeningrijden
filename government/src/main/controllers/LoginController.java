package main.controllers;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import main.domain.Employee;
import main.services.EmployeeService;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.transaction.annotation.Transactional;


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
@Transactional
public class LoginController {


    @Inject
    private EmployeeService service;

    @POST
    @Consumes(APPLICATION_FORM_URLENCODED)
    public Response authenticateUser(@FormParam("login") String email,
                                     @FormParam("password") String password,
                                     @Context UriInfo uriInfo) {

        Employee employee = service.authenthicate(email, password);

        if (employee != null) {
            String jwtToken = Jwts.builder()
                    .setSubject(email)
                    .setIssuer(uriInfo.getAbsolutePath().toString())
                    .setIssuedAt(new Date())
                    .setExpiration(DateUtils.addMinutes(new Date(), 10))
                    .signWith(SignatureAlgorithm.HS512, "MockSecretKey")
                    .compact();
            String token = jwtToken;
            return Response.ok().header(AUTHORIZATION, "Bearer " + token).build();
        }

        return null;
    }


}
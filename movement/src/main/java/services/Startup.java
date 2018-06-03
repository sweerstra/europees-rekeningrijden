package services;

import domain.Movement;
import gateway.MovementAppGateway;

import javax.ejb.Singleton;
import javax.inject.Inject;

@javax.ejb.Startup
@Singleton
public class Startup {
    @Inject
    private MovementService movementService;

    private MovementAppGateway movementAppGateway = new MovementAppGateway() {
        @Override
        protected void receiveMovement(Movement movement) {
            movementService.addMovement(movement);
        }
    };
}

package gateway;

import domain.Movement;

public abstract class MovementAppGateway extends Gateway {
    public MovementAppGateway() {
        super(null, "movements");
    }

    public void receiveMessage(String json) {
        Movement movement = this.gson.fromJson(json, Movement.class);
        receiveMovement(movement);
    }

    protected abstract void receiveMovement(Movement movement);
}

package services;

import javax.inject.Inject;

@javax.ejb.Startup
public class Startup {

    @Inject
    private LogService logService;

    @Inject
    private MovementService movementService;

    @Inject
    private TrackerService trackerService;



}

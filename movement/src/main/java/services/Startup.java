package services;

import domain.Tracker;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.inject.Inject;

@Singleton
@javax.ejb.Startup
public class Startup {
    @Inject
    private TrackerService trackerService;

    @PostConstruct
    public void initData() {
        trackerService.create(new Tracker("unodos"));
    }
}

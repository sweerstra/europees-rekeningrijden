package service;

import domain.Vehicle;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.inject.Inject;

@javax.ejb.Startup
@Singleton
public class StartUp {

    /*@Inject
    InvoiceDao invoiceDao;*/
    @Inject
    private
    VehicleService vehicleService;

    @PostConstruct
    public void initData(){
//        Owner danny = new Owner("Danny", "Janssen","Dorpsstraat 4B", "5051CK", "Goirle", "0611785527","danny.janssen@student.fontys.nl", new Date());
//        Owner sjoerd = new Owner("Sjoerd", "Weerstra","Kaaslaan 3", "5054AL", "Tilburg", "0609876543","s.weerstra@student.fontys.nl", new Date());

        Vehicle vehicle1 = new Vehicle("ENG1234", 1, "22-AB-134", "HP autotracker", "EURO 3");
        Vehicle vehicle2 = new Vehicle("ENG6345", 2, "90-AA-554", "Acer GPS system", "EURO 2");
        Vehicle vehicle3 = new Vehicle("ENG5786", 1, "78-CR-111", "HP autotracker", "EURO 5");
        Vehicle vehicle4 = new Vehicle("ENG5142", 2, "55-LO-390", "TomTom ATS", "EURO 6");
        Vehicle vehicle5 = new Vehicle("ENG8496", 1, "33-VG-007", "TomTom ATS", "EURO 1");

        vehicleService.create(vehicle1);
        vehicleService.create(vehicle2);
        vehicleService.create(vehicle3);
        vehicleService.create(vehicle4);
        vehicleService.create(vehicle5);
    }
}

package service;

import domain.*;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.inject.Inject;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@javax.ejb.Startup
@Singleton
public class StartUp {
    @Inject
    private VehicleService vehicleService;

    @Inject
    private OwnerService ownerService;

    @Inject
    private OwnershipService ownershipService;

    @Inject
    private RegionService regionService;

    @Inject
    private EmployeeService employeeService;

    @Inject
    private InvoiceService invoiceService;

    @PostConstruct
    public void initData() {
        Owner dannyZonderId = new Owner("Danny", "Janssen", "Dorpsstraat 4B", "5051CK", "Goirle", "0611785527", "danny.janssen@student.fontys.nl", new Date());
        dannyZonderId.setUsesBillriderWebsite(true);
        Owner danny = ownerService.create(dannyZonderId);
        Owner sjoerd = ownerService.create(new Owner("Sjoerd", "Weerstra", "Kaaslaan 3", "5054AL", "Tilburg", "0609876543", "s.weerstra@student.fontys.nl", new Date()));
        Owner dennis = ownerService.create(new Owner("Dennis", "van Gils", "Troefweg 89c", "5059KT", "Goirle", "0628492322", "d.vangils@student.fontys.nl", new Date()));

        Vehicle vehicle1 = vehicleService.create(new Vehicle("22-AB-134", "HP autotracker", "EURO 3"));
        Vehicle vehicle2 = vehicleService.create(new Vehicle("90-AA-554", "Acer GPS system", "EURO 2"));
        Vehicle vehicle3 = vehicleService.create(new Vehicle("78-CR-111", "HP autotracker", "EURO 5"));
        Vehicle vehicle4 = vehicleService.create(new Vehicle("55-LO-390", "TomTom ATS", "EURO 4"));
        Vehicle vehicle5 = vehicleService.create(new Vehicle("33-VG-007", "TomTom ATS", "EURO 1"));

        Ownership ownership1 = new Ownership("ENG1234", danny, vehicle1, createDate("2013-09-18"), createDate("2015-06-08"));
        Ownership ownership2 = new Ownership("ENG6345", sjoerd, vehicle2, createDate("2014-02-27"), createDate("2015-10-20"));
        Ownership ownership3 = new Ownership("ENG5786", dennis, vehicle3, createDate("2014-05-02"), createDate("2016-09-18"));
        Ownership ownership4 = new Ownership("ENG5142", danny, vehicle4, createDate("2016-11-21"), null);
        Ownership ownership5 = new Ownership("ENG8496", sjoerd, vehicle5, createDate("2017-04-11"), null);

        ownershipService.addOwnership(ownership1);
        ownershipService.addOwnership(ownership2);
        ownershipService.addOwnership(ownership3);
        ownershipService.addOwnership(ownership4);
        ownershipService.addOwnership(ownership5);

        Region region = new Region("Middlesbrough", 8.50);
        region.setRegionTimes(new ArrayList<RegionTime>());
        List<Coordinate> coordinates = new ArrayList<>();
        coordinates.add(new Coordinate(52.985692411184985, -0.6241609374999371));
        coordinates.add(new Coordinate(52.02951508881423, -0.09681718749993706));
        coordinates.add(new Coordinate(51.77871745471084, -0.9647371093749371));
        region.setCoordinates(coordinates);
        Region createdRegion = regionService.create(region);

        employeeService.addEmployee(new Employee("employee@mail.com", "password", "admin"));

        Invoice invoice1 = invoiceService.create(new Invoice("ENG1234", Invoice.PaymentStatus.OPEN, 278.19, 4, 543, "EURO 4", vehicle1));
        Invoice invoice2 = invoiceService.create(new Invoice("ENG6345", Invoice.PaymentStatus.CANCELLED, 278.19, 4, 123, "EURO 3", vehicle2));
        Invoice invoice3 = invoiceService.create(new Invoice("ENG5786", Invoice.PaymentStatus.OPEN, 278.19, 4, 432, "EURO 6", vehicle3));
        Invoice invoice4 = invoiceService.create(new Invoice("ENG1345", Invoice.PaymentStatus.PAID, 278.19, 4, 333, "EURO 1", vehicle4));
        Invoice invoice5 = invoiceService.create(new Invoice("ENG4186", Invoice.PaymentStatus.OPEN, 278.19, 4, 239, "EURO 2", vehicle5));
    }

    private Date createDate(String format) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return sdf.parse(format);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
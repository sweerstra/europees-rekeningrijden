package support;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import domain.*;
import model.Movement;
import model.RegionMovement;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.text.DateFormatSymbols;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

public class InvoiceGenerator {
    private Invoice invoiceToGenerate;
    private static SimpleDateFormat formatter;
    private static String resourcePath = "government/src/main/resources/images/";
    private Document document;
    private Calendar calendar;
    private Gson gson = new Gson();

    //    private List<EmissionCategory> emissionCategories;
//    private List<Region> regions;
    private double totalPrice = 0;
    private double totalDistance = 0;

    public InvoiceGenerator() {

    }

    public InputStream objectToPdf(Invoice invoice, Ownership ownership) {
        this.invoiceToGenerate = invoice;
        calendar = Calendar.getInstance();
        calendar.setTime(invoiceToGenerate.getBillingDate());
        this.invoiceToGenerate.getConditions().add(0,
                "Payment must be done before " +
                        calendar.getActualMaximum(Calendar.DAY_OF_MONTH) +
                        "/" + (calendar.get(Calendar.MONTH) + 2) +
                        "/" + calendar.get(Calendar.YEAR));

        formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date today = new Date();
        document = new Document();

//        Owner currOwner = invoiceToGenerate.getVehicle().getOwner();
        Owner currOwner = ownership.getOwner();
        String trackerId = ownership.getTrackerId();
        Vehicle currVehicle = ownership.getVehicle();

        //TODO: Use the below 'fileName' to get user's licenseplate
        //String fileName = formatter.format(today) + " " + invoiceToGenerate.getVehicle().getlicensePlate() + ".pdf";
        String fileName = formatter.format(today) + " invoice.pdf";

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter writer = PdfWriter.getInstance(document, out);
            Font font = FontFactory.getFont(FontFactory.TIMES_BOLD, 12, BaseColor.BLACK);
            document.open();

            addWhiteLines(3);

//            Path path = Paths.get(resourcePath + "logo.png");
//            Image img = Image.getInstance(path.toString());
//            document.add(img);

            addSenderConcernsInformation(document, currOwner);

            addWhiteLines(1);

            Chunk invoiceTitle = new Chunk("MONTHLY BILLED DRIVING INVOICE", font);
            document.add(invoiceTitle);
            addWhiteLines(1);

            Chunk billingMonth = new Chunk((getMonth(calendar.get(Calendar.MONTH)).toUpperCase() + " " + calendar.get(Calendar.YEAR)), font);
            document.add(billingMonth);

            addWhiteLines(1);
            addVehicleInformation(document, trackerId, currVehicle);

            addWhiteLines(1);
            addPaymentInformation(document);

            addWhiteLines(2);
            addBillingInformation(document, ownership);

            //TODO: Remove these white lines and fill up the space with billing-lines according to the miles, days or region
            addWhiteLines(2);
            addTotalInformation(document);

            addWhiteLines(1);
            addClosingJustification(document, writer);

            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    private void addVehicleInformation(Document document, final String trackerId, final Vehicle currVehicle) throws DocumentException {
        PdfPTable vehicleInfoTable = new PdfPTable(4);
        vehicleInfoTable.setHorizontalAlignment(Element.ALIGN_LEFT);
        vehicleInfoTable.setWidthPercentage(100.0f);
        addTableHeader(vehicleInfoTable, new ArrayList<String>() {{
            add("TRACKERNUMBER");
            add("DATE");
            add("LICENSEPLATE");
            add("INVOICENUMBER");
        }});
        addRows(vehicleInfoTable, new ArrayList<String>() {{
            add(trackerId);
            add(new SimpleDateFormat("dd/MM/yyyy").format(invoiceToGenerate.getBillingDate()));
            add(currVehicle.getLicensePlate());
            add(String.valueOf(invoiceToGenerate.getId()));
        }});

        document.add(vehicleInfoTable);
        // endregion
    }

    private void addSenderConcernsInformation(Document document, final Owner currOwner) throws DocumentException {
        // Sender-Concerns table to get them next to each other
        PdfPTable senderConcernsTable = new PdfPTable(2);
        senderConcernsTable.setWidthPercentage(100.0f);
        Paragraph paragraph = new Paragraph();

        // Concerns
        PdfPTable concernsInfoTable = new PdfPTable(1);
        concernsInfoTable.setHorizontalAlignment(Element.ALIGN_LEFT);
        concernsInfoTable.setWidthPercentage(110);
        addTableHeader(concernsInfoTable, new ArrayList<String>() {{
            add("CONCERNS");
        }});

        if (currOwner != null) {
            addRows(concernsInfoTable, new ArrayList<String>() {{
                add(currOwner.getLastName() + ", " + currOwner.getFirstName());
                add(currOwner.getAddress());
                add(currOwner.getPostalCode() + " " + currOwner.getCity().toUpperCase());
                add(currOwner.getPhone());
            }});
        }

        PdfPCell concernsTableCell = new PdfPCell();
        concernsTableCell.setBorderWidth(0);
        concernsTableCell.addElement(concernsInfoTable);
        senderConcernsTable.addCell(concernsTableCell);

        // Sender
        PdfPTable senderInfoTable = new PdfPTable(1);
        senderInfoTable.setHorizontalAlignment(Element.ALIGN_LEFT);
        senderInfoTable.setWidthPercentage(100);
        addTableHeader(senderInfoTable, new ArrayList<String>() {{
            add("SENDER");
        }});

        addRows(senderInfoTable, new ArrayList<String>() {{
            add("Traxit");
            add("25-33 Southwark Street");
            add("SE1 1RQ London");
            add("ENGLAND");
            add("(088) 5550105");
        }});

        PdfPCell senderTableCell = new PdfPCell();
        senderTableCell.setBorderWidth(0);
        senderTableCell.addElement(senderInfoTable);
        senderConcernsTable.addCell(senderTableCell);

        paragraph.add(senderConcernsTable);
        document.add(paragraph);
    }

    private void addPaymentInformation(Document document) throws DocumentException {
        PdfPTable paymentInfoTable = new PdfPTable(3);
        paymentInfoTable.setWidths(new float[]{2, 1, 1});
        paymentInfoTable.setHorizontalAlignment(Element.ALIGN_LEFT);
        paymentInfoTable.setWidthPercentage(100.0f);
        addTableHeader(paymentInfoTable, new ArrayList<String>() {{
            add("CONDITIONS");
            add("PREFERRED METHOD OF PAYMENT");
            add("STATUS");
        }});

        final StringBuilder splitConditions = new StringBuilder();
        ArrayList<String> conditions = invoiceToGenerate.getConditions();
        if (conditions != null && !conditions.isEmpty()) {
            for (String c : conditions) {
                if (conditions.indexOf(c) < conditions.size()) {
                    splitConditions.append("- ").append(c).append("\n");
                } else {
                    splitConditions.append(c);
                }
            }
        }
        addRows(paymentInfoTable, new ArrayList<String>() {{
            add(splitConditions.toString());
            add("Billing website / transfer");
            add(invoiceToGenerate.getPaid().name());
        }});

        document.add(paymentInfoTable);
    }

    private void addBillingInformation(Document document, final Ownership ownership) throws DocumentException {
        PdfPTable billingInfoTable = new PdfPTable(4);
        billingInfoTable.setHorizontalAlignment(Element.ALIGN_LEFT);
        billingInfoTable.setWidthPercentage(100.0f);
        addTableHeader(billingInfoTable, new ArrayList<String>() {{
            add("KILOMETERS");
            add("EMISSION-CAT");
            add("DEFAULT RATE");
            add("AMOUNT");
        }});

        List<DefaultRate> defaultRates =
                gson.fromJson(
                        HttpHelper.get("http://192.168.24.36:11080/government/api/rate/all"
                        ),
                        new TypeToken<List<DefaultRate>>() {
                        }.getType());

        DefaultRate defaultRate = new DefaultRate(0);
        if (!defaultRates.isEmpty()) {
            defaultRate = defaultRates.get(defaultRates.size() - 1);
        }

        DefaultRate finalDefaultRate = defaultRate;
        addRows(billingInfoTable, new ArrayList<String>() {{
            add(String.valueOf(totalDistance));
            add(ownership.getVehicle().getEmissionCategory().toUpperCase());
            add("£ " + finalDefaultRate.getRate());
            add("£ " + totalPrice);
        }});

        document.add(billingInfoTable);
    }

    private void addTotalInformation(Document document) throws DocumentException {
        PdfPTable totalInfoTable = new PdfPTable(3);
        totalInfoTable.setWidths(new float[]{4, 1, 1});
        totalInfoTable.setHorizontalAlignment(Element.ALIGN_RIGHT);
        totalInfoTable.setWidthPercentage(100.0f);

        addTableHeader(totalInfoTable, new ArrayList<String>() {{
            add("");
            add("");
            add("");
        }});

        addRows(totalInfoTable, new ArrayList<String>() {{
            add("");
            add("Subtotal");
            add("£ " + invoiceToGenerate.getTotalAmount());

            add("");
            add("VAT-percentage");
            add("0%");

            add("");
            add("VAT");
            add("£ 0,00");

            add("");
            add("Additional");
            add("£ 0,00");

            add("");
            add("TOTAL");
            add("£ " + invoiceToGenerate.getTotalAmount());
        }});

        document.add(totalInfoTable);
    }

    private void addClosingJustification(Document document, PdfWriter writer) throws DocumentException {
        PdfContentByte canvas = writer.getDirectContent();
        CMYKColor magentaColor = new CMYKColor(0.f, 0.f, 0.f, 1.f);
        canvas.setColorStroke(magentaColor);
        canvas.moveTo(36, 100);
        canvas.lineTo(558, 100);
        canvas.closePathStroke();

        canvas.setColorStroke(magentaColor);
        canvas.moveTo(36, 105);
        canvas.lineTo(558, 105);
        canvas.closePathStroke();

        addWhiteLines(7);

        PdfPTable justificationTable = new PdfPTable(1);
        justificationTable.setHorizontalAlignment(Element.ALIGN_RIGHT);
        justificationTable.setWidthPercentage(100.0f);

        addTableHeader(justificationTable, new ArrayList<String>() {{
            add("Justification");
        }});
        addRows(justificationTable, new ArrayList<String>() {{
            add("* - Multiplier is based on the car's emission category, period in which was driven and the driven through regions");
        }});

        document.add(justificationTable);
    }

    private void addTableHeader(PdfPTable table, ArrayList<String> headers) {
        for (String columnTitle : headers) {
            PdfPCell header = new PdfPCell();
            header.setBorderWidthRight(0);
            header.setBorderWidthLeft(0);
            header.setBorderWidthTop(0);
            header.setPhrase(new Phrase(columnTitle, FontFactory.getFont(FontFactory.TIMES, 12, BaseColor.BLACK)));
            table.addCell(header);
        }
    }

    private void addRows(PdfPTable table, ArrayList<String> rowData) {
        for (String row : rowData) {
            PdfPCell cell = new PdfPCell();
            cell.setBorderWidth(0);
            cell.setPhrase(new Phrase(row, FontFactory.getFont(FontFactory.TIMES, 10, BaseColor.BLACK)));
            table.addCell(cell);
        }
    }

    private void addWhiteLines(int amount) throws DocumentException {
        for (int i = 0; i < amount; i++) {
            document.add(new Phrase("\n"));
        }
    }

    public String getMonth(int month) {
//        return new DateFormatSymbols(Locale.UK).getMonths()[month - 1];
        return new DateFormatSymbols(Locale.UK).getMonths()[month];
    }

    public List<Invoice> calculateInvoice(Vehicle vehicle, List<Region> regions, List<EmissionCategory> emissionCategories, int month, int year) {
        List<Invoice> invoices = new ArrayList<>();
        calendar = Calendar.getInstance();

        calendar.set(Calendar.MONTH, month);
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));

        List<Ownership> ownerships = new ArrayList<>();

        Calendar ownershipCalendar = Calendar.getInstance();
        for (Ownership ownership : vehicle.getOwnerships()) {
            ownershipCalendar.setTime(ownership.getStartDate());
            if (ownership.getStartDate().before(calendar.getTime())) {

                calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
                if (ownership.getEndDate() == null || ownership.getEndDate().after(calendar.getTime())) {
                    ownerships.add(ownership);
                }

            }
        }
        for(Ownership ownership : ownerships) {
            Invoice invoice = calculateInvoice(ownership, regions, emissionCategories, month, year);
            invoices.add(invoice);
        }
        return invoices;
    }

    public Invoice calculateInvoice(Ownership ownership, List<Region> regions, List<EmissionCategory> emissionCategories, int month, int year){
        Invoice invoice = new Invoice();

        Vehicle vehicle = ownership.getVehicle();
        List<Movement> movements = new ArrayList<>();

        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        String startDate = sdf.format(calendar.getTime());

        if(ownership.getStartDate().after(calendar.getTime())){
            startDate = sdf.format(ownership.getStartDate());
        }

        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        String endDate = sdf.format(calendar.getTime());

        if(ownership.getEndDate() != null && ownership.getEndDate().before(calendar.getTime())){
            endDate = sdf.format(ownership.getEndDate());
        }

        try {
            movements = gson.fromJson(HttpHelper.get(String.format("http://192.168.24.36:9080/movement/api/movement/%s/%s/%s",
                    ownership.getTrackerId(),
                    startDate,
                    endDate)),
                    new TypeToken<List<Movement>>() {
                    }.getType());
        } catch (Exception e) {
            e.printStackTrace();
        }

        double totalDistance = 0;
        List<RegionMovement> movementsList = new ArrayList<>();

        for (int i = 0; i < movements.size() - 1; i++) {
            Movement mv = movements.get(i);
            Region region = regions.stream().filter(r ->
                    RegionUtil.coordinateInRegion(r, new Coordinate(mv.getLatitude(), mv.getLongitude()))).findFirst().orElse(null);
            RegionMovement rm = new RegionMovement(region, mv);

            Movement nextMovement = movements.get(i + 1);
            rm.setDistance(distance(mv.getLatitude(), mv.getLongitude(), nextMovement.getLatitude(), nextMovement.getLongitude()));

            movementsList.add(rm);
        }

        totalDistance = movementsList.stream().mapToDouble(RegionMovement::getDistance).sum();
        totalDistance = Double.valueOf(new DecimalFormat(".##").format(totalDistance).replace(',', '.'));

        double defaultTotalPrice = calculatePrice(movementsList);

        EmissionCategory emissionCategory = emissionCategories.stream().filter(e -> e.getName().replace(" ", "").toUpperCase().equals(vehicle.getEmissionCategory().replace(" ", "").toUpperCase())).findFirst().orElse(null);
        if(emissionCategory != null){
            defaultTotalPrice = defaultTotalPrice * emissionCategory.getRate();
        }
        this.totalDistance = totalDistance;
        this.totalPrice = Double.valueOf(new DecimalFormat(".##").format(defaultTotalPrice).replace(',', '.'));

        invoice.setOwnership(ownership);
        invoice.setPaid(Invoice.PaymentStatus.OPEN);
        invoice.setConditions(new ArrayList<>());
        invoice.setBillingDate(new Date());
        invoice.setTotalAmount(this.totalPrice);
        invoice.setDistanceTravelled(this.totalDistance);

        return invoice;
    }

    private double distance(double lat1, double lon1, double lat2, double lon2) {
        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return (dist);
    }

    private double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    private double rad2deg(double rad) {
        return (rad * 180.0 / Math.PI);
    }

    private double calculatePrice(List<RegionMovement> movementList) {
        double totalPrice = 0;
        if (movementList.isEmpty()) return totalPrice;

        List<DefaultRate> defaultRates =
                gson.fromJson(
                        HttpHelper.get("http://192.168.24.36:11080/government/api/rate/all"
                        ),
                        new TypeToken<List<DefaultRate>>() {
                        }.getType());

        DefaultRate defaultRate = new DefaultRate(0);
        if (!defaultRates.isEmpty()) {
            defaultRate = defaultRates.get(defaultRates.size() - 1);
        }
        for (RegionMovement regionMovement : movementList) {
            if (regionMovement.getRegion() == null) {
                totalPrice += regionMovement.getDistance() * defaultRate.getRate();
                continue;
            }

            Movement movement = regionMovement.getMovement();
            Date movementTime = getTimeOnly(movement.getDateTime());

            boolean inTimeZone = false;
            for (RegionTime rt : regionMovement.getRegion().getRegionTimes()) {
                if (movementTime.after(getTimeOnly(rt.getStartTimeAsDate())) && movementTime.before(getTimeOnly(rt.getEndTimeAsDate()))) {
                    totalPrice += rt.getRate() * regionMovement.getDistance();
                    inTimeZone = true;
                    break;
                }
            }
            if(!inTimeZone){
                totalPrice += regionMovement.getRegion().getDefaultRate() * regionMovement.getDistance();
            }
        }
        return totalPrice;
    }

    private Date getTimeOnly(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_MONTH, 0);
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.YEAR, 0);
        return calendar.getTime();
    }
}

package support;

public class DrivenLine {
    private double kilometers;
    private double feePerKm;
    private double price;

    public DrivenLine(double kilometers, double feePerKm, double price) {
        this.kilometers = kilometers;
        this.feePerKm = feePerKm;
        this.price = price;
    }

    public double getKilometers() {
        return kilometers;
    }

    public void setKilometers(double kilometers) {
        this.kilometers = kilometers;
    }

    public double getFeePerKm() {
        return feePerKm;
    }

    public void setFeePerKm(double feePerKm) {
        this.feePerKm = feePerKm;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}

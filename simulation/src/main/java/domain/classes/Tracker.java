package domain.classes;

public class Tracker {
    private int id;

    public Tracker(int id) {
        this.id = id;
    }

    public Tracker() {
        id = (int)(Math.random()*900)+100;
    }
}

package domain;

public class Tracker {

    private String authorisationCode;

    public Tracker(String authorisationCode) {
        this.authorisationCode = authorisationCode;
    }

    public String getAuthorisationCode() {
        return authorisationCode;
    }

    public void setAuthorisationCode(String authorisationCode) {
        this.authorisationCode = authorisationCode;
    }

}

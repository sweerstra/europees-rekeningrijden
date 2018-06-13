package support;

import domain.Coordinate;
import domain.Region;

public class RegionUtil {

    public static boolean coordinateInRegion(Region region, Coordinate coord) {
        int i, j;
        boolean isInside = false;
        //create an array of coordinates from the region boundary list
        Coordinate[] verts = region.getCoordinates().toArray(new Coordinate[region.getCoordinates().size()]);
        int sides = verts.length;
        for (i = 0, j = sides - 1; i < sides; j = i++) {
            //verifying if your coordinate is inside your region
            if ((((verts[i].getLng() <= coord.getLng()) && (coord.getLng() < verts[j].getLng())
                            ) || (
                                    (verts[j].getLng() <= coord.getLng()) && (coord.getLng() < verts[i].getLng())
                            )
                    ) &&
                            (coord.getLat() < (verts[j].getLat() - verts[i].getLat()) * (coord.getLng() - verts[i].getLng()) / (verts[j].getLng() - verts[i].getLng()) + verts[i].getLat())
                    ) {
                isInside = !isInside;
            }
        }
        return isInside;
    }
}

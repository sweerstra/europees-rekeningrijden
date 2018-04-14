package service;

import com.mysql.cj.core.util.StringUtils;
import dao.IRegionDao;
import domain.Region;
import domain.RegionTime;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Stateless
public class RegionService {
    @Inject
    private IRegionDao dao;

    public RegionService() {
        super();
    }

    public Region create(Region entity) {
        if (StringUtils.isNullOrEmpty(entity.getName())) return null;

        Region region = dao.create(new Region(entity.getName(), entity.getDefaultRate()));

        List<RegionTime> times = entity.getRegionTimes();

        for (RegionTime time : times) {
            time.setRegion(region);
        }

        region.setRegionTimes(times);

        return dao.update(region);
    }

    public Region editRegion(long id, Region region) {
        Region original = dao.findById(id);

        double defaultRate = region.getDefaultRate();
        List<RegionTime> regionTimes = region.getRegionTimes();

        Region tempRegion = new Region();
        tempRegion.setId(id);

        for (RegionTime time : regionTimes) {
            time.setRegion(tempRegion);
        }

        if (defaultRate != 0) original.setDefaultRate(defaultRate);
        original.setRegionTimes(regionTimes);

        return dao.update(original);
    }

    public List<Region> findAll() {
        return dao.findAll();
    }

    public Region findByName(String name) {
        return dao.findByName(name);
    }

    public Date getAsDateObject(String date) {
        SimpleDateFormat sdf = new SimpleDateFormat("HH-mm");

        try {
            return sdf.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}

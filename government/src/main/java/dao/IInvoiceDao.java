package dao;

import Domain.Invoice;
import Domain.Vehicle;

import java.util.List;

public interface IInvoiceDao {

    Invoice findById(long id);

    List<Invoice> findAll();

    Invoice create(Invoice entity);

    void delete(Invoice entity);
}

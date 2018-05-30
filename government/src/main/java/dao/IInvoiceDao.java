package dao;

import domain.Invoice;

import java.util.List;

public interface IInvoiceDao {

    Invoice findById(long id);

    List<Invoice> findAll();

    Invoice create(Invoice entity);

    void delete(Invoice entity);

    Invoice update(Invoice entity);
}

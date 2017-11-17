using System;
using System.Collections.Generic;
using Test.Models;

namespace Test.Repo
{
    public interface IRepository : IDisposable
    {
        IEnumerable<Product> GetProducts();
        Product GetProduct(long id);
        int CreateProduct(Product product); 
        int UpdateProduct(Product product);
        int DeleteProduct(long id);
        int Save();
        IEnumerable<TypeCount> GetTypeCounts();
    }
}
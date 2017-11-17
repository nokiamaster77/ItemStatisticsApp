using System;
using System.Collections.Generic;
using System.Linq;
using Test.Models;

namespace Test.Repo
{
    public class SqliteRepository : IRepository
    {
        private readonly TestDbEntities _db;

        public SqliteRepository(TestDbEntities tde)
        {
            _db = tde;
        }
        public int DeleteProduct(long id)
        {
            var product = _db.Products.Find(id);
            if (product != null)
            {
                _db.Products.Remove(product);
                return Save();
            }
            return 0;
        }

        private bool _disposed;

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _db.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IEnumerable<Product> GetProducts()
        {
            return _db.Products.ToList();
        }

        public Product GetProduct(long id)
        {
            return _db.Products.Find(id);
        }

        public int Save()
        {
            return _db.SaveChanges();
        }

        public int UpdateProduct(Product product)
        {
            var dbProduct = _db.Products.Find(product.Id);
            if (dbProduct != null)
            {
                dbProduct.Name = product.Name;
                dbProduct.Type = product.Type;
                _db.Entry(dbProduct).State = System.Data.Entity.EntityState.Modified;
                return Save();
            }
            return 0;
        }

        public int CreateProduct(Product product)
        {
            _db.Products.Add(product);
            return Save();
        }

        public IEnumerable<TypeCount> GetTypeCounts()
        {
            var result = new List<TypeCount>();
            var typeList = _db.Products.Select(i => i.Type).Distinct();
            foreach (var i in typeList)
            {
                var count = _db.Products.Count(t => t.Type == i);
                result.Add(new TypeCount {Type = i, Count = count});
            }
            return result;
        }
    }
}
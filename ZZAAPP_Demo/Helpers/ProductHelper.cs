using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ZZAAPP_Demo.Models;

namespace ZZAAPP_Demo.Helpers
{
    public class ProductHelper
    {
        public ProductHelper()
        {
        }

        public static List<Product> GetProducts()
        {
            List<Product> _products = new List<Product>();
            for (int i = 0; i < 10; i++)
            {
                _products.Add(new Product()
                {
                    ID = i,
                    Name = string.Format("Product {0}", i),
                    Description = string.Format("Product Descrition is {0}", i),
                    Price = 100 + i,
                });
            }

            return _products;
        }
    }
}
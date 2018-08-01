using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ZZAAPP_Demo.Helpers;
using ZZAAPP_Demo.Models;

namespace ZZAAPP_Demo.Api
{
    [RoutePrefix("api/products")]
    public class ProductsApiController : ApiController
    {
        [Route("getallproducts")]
        public List<Product> GetProducts()
        {
            return ProductHelper.GetProducts();
        }

        [Route("product/{id}")]
        public Product GetProduct(int id)
        {
            return ProductHelper.GetProducts().FirstOrDefault(x => x.ID == id);
        }
    }
}

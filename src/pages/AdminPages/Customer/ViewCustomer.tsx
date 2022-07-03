import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import ListCouponPageComponent from "../../../components/PageComponent/CouponComponent/ListCouponPageComponent";
import ListOrderPageComponent from "../../../components/PageComponent/OrderComponent/ListOrderPageComponent";

import ListCategoryPageComponent from "../../../components/PageComponent/ProductComponent/ListCategoryPageComponent";
import { BACKEND, BACKENDAPI } from "../../../config";
import { ROUTE_LIST } from "../../../RoutConstants";
import { apiClient } from "../../../utils/apiClient";

const CustomerViewPage: React.FC = (props: any) => {
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    apiClient()
      .get(`${BACKENDAPI}/v1.0/customers/${props.match.params.id}`)
      .then((response: any) => {
        console.log(response);
        setCustomer(response.data.data);
     

      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);



  
  return (
    <AdminPageComponent>
      <main id="main" className="main">
        {/* End Page Title */}
        <section className="section">
          {customer && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    {/* <ListOrderPageComponent /> */}
                    <div className="">
                    

                     
                      <div className="row mt-2">
                        <div className="col-7 me-2">
                          <div className="row">
                          <div className="col-12 shadow-sm border p-2 mt-3">

<div className="row">
  <div className="col-4">
    <p className="text-center m-0 p-0">
    Last Order
    </p>
    
    <p className="text-center m-0 p-0">
    {new Date(customer.last_order.created_at).toDateString()}{" "}
    </p>
    <p className="text-center m-0 p-0">
    <Link className="btn btn-sm btn-success mt-1" to={`/admin/orders/customer/${customer.id}`}>View All Orders</Link>
    </p>


     
  </div>
  <div className="col-4">
    <p className="text-center m-0 p-0">
  Total Spent
    </p>
    
    <p className="text-center m-0 p-0">
    ${customer.total_spent}
    </p>
    
  
     
  </div>
  <div className="col-4">
    <p className="text-center m-0 p-0">
  Total Orders
    </p>
    
    <p className="text-center m-0 p-0">
    {customer.total_order}
    </p>
    
  
     
  </div>
</div>

                          </div>
    
                      
                          </div>
                        </div>

                        <div className="col-4 ms-2">
                          <div className="row">
                          
                          <div className="col-12 shadow-sm border p-2 mt-3">
                              <h6 style={{ fontWeight: "bold" }}>Customer</h6>
                              <p className="p-0 m-0">
                                {customer.fname + " " + customer.lname}
                              </p>
                              <hr />
                              <h6 style={{ fontWeight: "bold" }}>
                                Contact Information
                              </h6>
                              {customer.email ? (
                                <p className="p-0 m-0">email: {customer.email}</p>
                              ) : (
                                "no email"
                              )}
                              {customer.phone ? (
                                <p className="p-0 m-0">phone: {customer.phone}</p>
                              ) : (
                                "no phone"
                              )}
                              {customer.cname ? (
                                <p className="p-0 m-0">
                                  company: {customer.cname}
                                </p>
                              ) : (
                                ""
                              )}
                              <hr />
                              <h6 style={{ fontWeight: "bold" }}>
                                Shipping Address
                              </h6>
                              {customer.billing_address ? (
                                <p className="p-0 m-0">
                                  Address:{" "}
                                  {customer.billing_address +
                                    ", " +
                                    customer.billing_address2}
                                </p>
                              ) : (
                                ""
                              )}

                              {customer.city ? (
                                <p className="p-0 m-0">City: {customer.city}</p>
                              ) : (
                                ""
                              )}
                              {customer.zipcode ? (
                                <p className="p-0 m-0">
                                  Zipcode: {customer.zipcode}
                                </p>
                              ) : (
                                ""
                              )}
                              {customer.zipcode ? (
                                <p className="p-0 m-0">
                                  Country: United Kingdom
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </AdminPageComponent>
  );
};

export default CustomerViewPage;

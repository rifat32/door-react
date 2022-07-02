import React, { useEffect, useState } from "react";


import { Link } from "react-router-dom";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import ListCouponPageComponent from "../../../components/PageComponent/CouponComponent/ListCouponPageComponent";
import ListOrderPageComponent from "../../../components/PageComponent/OrderComponent/ListOrderPageComponent";

import ListCategoryPageComponent from "../../../components/PageComponent/ProductComponent/ListCategoryPageComponent";
import { BACKEND, BACKENDAPI } from "../../../config";
import { ROUTE_LIST } from "../../../RoutConstants";
import { apiClient } from "../../../utils/apiClient";





const OrderViewPage: React.FC = (props:any) => {

    const [order,setOrder] = useState<any>(null)
    const [orderInfo,setOrderInfo] = useState({
        subTotal:0,
        totalQuantity:0,
        shipping:10,
        tax:10,
        coupon:0
    })

    useEffect(() =>  {
        apiClient()
        .get(`${BACKENDAPI}/v1.0/orders/${props.match.params.id}`)
        .then((response: any) => {
           console.log(response)
           setOrder(response.data.data)
           let subTotal = 0;
           let totalQuantity = 0;
           let coupon = 0;
           response.data.data.order_details.map((el:any) =>{
  subTotal += parseInt(el.qty) * parseFloat(el.price)
  totalQuantity += parseInt(el.qty)
  if(el.coupon_discount_type == 
    "fixed") {
       coupon +=  parseFloat(el.coupon_discount_amount)
    } else {
        coupon += ((subTotal * parseFloat(el.coupon_discount_amount)) / 100)
    }


           }
           )  
           
           setOrderInfo({
            ...orderInfo,
            totalQuantity,
            subTotal,
            coupon
           })
        })
        .catch((error) => {
          
            console.log(error.response);
        });
    },[])

    const orientations = [
        {
            id:1,
            name:"Left Hanging Door",
        },
        {
          id:2,
          name:"Right Hanging Door"
        },
        {
          id:3,
          name:"Drill Both Sides"
        },
        {
          id:4,
          name:"Top Hanging Door"
        },
        {
          id:5,
          name:"Bottom Hanging Door"
        }
        ]

        const extraHoleDirections = [
            {
                id:1,
                name:"From Top",
            },
           
            {
              id:2,
              name:"From Bottom"
            }
            ]
            const orderStatusChange = (status:string) => {
                apiClient()
                .post(`${BACKENDAPI}/v1.0/orders/status/${props.match.params.id}`,{status:status})
                .then((response: any) => {
                   console.log(response)
                   window.location.reload();
               
                
                  
                })
                .catch((error) => {
                  
                    console.log(error.response);
                }); 
            }
	return (
		<AdminPageComponent>






			<main id="main" className="main">
				{/* End Page Title */}
				<section className="section">
			{
                order && <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            {/* <ListOrderPageComponent /> */}
                            <div className="">
                            <div className="row mt-3 m-lg-1">
                                <div className="col-6 ">
                                    <div className="row">
                                        <div className="col-3 ">
                                            #{order.id}
                                        </div>
                                        <div className="col-3 m-0 p-0"><span className="badge bg-secondary">Unpaid</span>
                                        </div>
                                        <div className="col-3">
                                            {order.status}
                                        </div>
                                    </div>

                                    
                                </div>
                            </div>
                            <div className="row m-lg-1">
                                <div className="col-12">
                                    <span className="text-small"><small> Order Time: {new Date(order.created_at).toDateString()} {new Date(order.created_at).toLocaleTimeString()}</small></span>
                                </div>
                            </div>
                            <div className="row mt-2">
                               <div className="col-7 me-2"> 
                               <div className="row">
                                <div className="col-12 shadow-sm border" >
                            {
                                order.order_details.map((el:any,index:number) => {
                                 return  <div key={index}>
             <div className="row border-bottom">
                <div className="col-3">
                    <img src={`${BACKEND}/${el.product.image}`} className="img img-thumbnail "/>
                   
                </div>
                <div className="col-6">
               <p className="m-0 p-0">name: {el.product.name}</p> 
               <p className="m-0 p-0">sku: {el.product.sku}</p> 
               {
                el.color && <p className="m-0 p-0"> color: {el.color.name}</p>
               }
               {
                el.product_variation && <p className="m-0 p-0"> height: {el.product_variation.name}</p>
               }
                {
                el.variation && <p className="m-0 p-0"> width: {el.variation.name}</p>
               }
{
      el.orientation_id > 0 && <p className="m-0 p-0">hinge holes orientation: {orientations.find(el2 => el2.id == el.orientation_id)?.name}</p>
               }
               {
      el.hinge_holes_from_top  && <p className="m-0 p-0"> hinge holes from Top: {el.hinge_holes_from_top}</p>
               }
               {
      el.hinge_holes_from_bottom  && <p className="m-0 p-0"> hinge holes from bottom: {el.hinge_holes_from_bottom}</p>
               }
               {
      el.extra_holes_direction_id > 0 && <p className="m-0 p-0">extra holes direction: {extraHoleDirections.find(el2 => el2.id == el.extra_holes_direction_id)?.name}</p>
               }
                {
      el.extra_holes_value  && <p className="m-0 p-0">extra holes value: {el.extra_holes_value} mm</p>
               }
                {
      el.selected_length  && <p className="m-0 p-0">length: {el.selected_length} </p>
               }
               {
                el.options.map((el:any,index:number) => {
                    return <p key={index} className="m-0 p-0">{el.option.name}: {el.option_value.name} </p>
                })
               }
            
               
                </div>
                <div className="col-3">
               <span className="me-1">
               ${el.price} x {el.qty} 
                </span>   ${el.price * el.qty} 
                </div>
             </div>
                                    </div>
                                })
                            }


               <div className="row my-2">
                <div className="col-6 offset-6">
                    {
                        order.status !== "pending"?(null):(  <button onClick={() => orderStatusChange("complete")} type="button" className="btn btn-sm btn-success">Complete Order</button>)
                    }
                   
                </div>
               </div>



                                </div>
                              {/* second row first column */}
                              <div className="col-12 shadow-sm border mt-3 p-3" >
            <div className="row justify-content-between">
                <div className="col-4">
                 <small>subtotal</small>   
                </div>
                <div className="col-4">
                  <small>{orderInfo.totalQuantity} item</small>  
                </div>
                <div className="col-4 text-center ">
                 <small>  ${orderInfo.subTotal}</small> 
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-4">
                <small>shipping</small>    
                </div>
                <div className="col-4">
                  <small> standard</small> 
                </div>
                <div className="col-4 text-center ">
                  <small>${orderInfo.shipping}</small>  
                </div>
            </div>
            
            <div className="row justify-content-between">
                <div className="col-4">
                   <small> Tax</small>
                </div>
                <div className="col-4">
                   <small>GB Vat 20% included
                    </small> 
                </div>
                <div className="col-4 text-center ">
                <small>${orderInfo.tax}</small>    
                </div>
            </div>
            {orderInfo.coupon == 0?(null):(    <div className="row justify-content-between">
                <div className="col-4">
                   <small> Coupon</small>
                </div>
                <div className="col-4">
                   <small>{order.coupon?.name}
                    </small> 
                </div>
                <div className="col-4 text-center ">
                <small>${orderInfo.coupon}</small>    
                </div>
            </div>)}
        
            <div className="row justify-content-between">
                <div className="col-4">
                    <small>Total</small>
                    
                </div>
               
                <div className="col-4 text-center ">
                    <small>${orderInfo.subTotal + orderInfo.tax + orderInfo.shipping - orderInfo.coupon}</small>
                    
                </div>
            </div>
            
            <hr />
            <div className="row justify-content-between p-1">
                <div className="col-4">
                  <small> Paid By Customer</small> 
                </div>
               
                <div className="col-4 text-center ">
                ${orderInfo.subTotal + orderInfo.tax + orderInfo.shipping}
                </div>
            </div>
                              </div>
 {/* <div className="col-12 shadow-sm border mt-3" >
<div >
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">Timeline</h6>
          <div id="content">
            <ul className="timeline">
              <li className="event" data-date="12:30 - 1:00pm">
                <h3>Registration</h3>
                <p>Get here on time, it's first come first serve. Be late, get turned away.</p>
              </li>
              <li className="event" data-date="2:30 - 4:00pm">
                <h3>Opening Ceremony</h3>
                <p>Get ready for an exciting event, this will kick off in amazing fashion with MOP &amp; Busta Rhymes as an opening show.</p>
              </li>
              <li className="event" data-date="5:00 - 8:00pm">
                <h3>Main Event</h3>
                <p>This is where it all goes down. You will compete head to head with your friends and rivals. Get ready!</p>
              </li>
              <li className="event" data-date="8:30 - 9:30pm">
                <h3>Closing Ceremony</h3>
                <p>See how is the victor and who are the losers. The big stage is where the winners bask in their own glory.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


        </div> */}

                               </div>
                             
                               </div>

                               <div className="col-4 "> 
                               <div className="row">
                                <div className="col-12 shadow-sm border p-2" >
                             <h6 style={{fontWeight:"bold"}}>Notes</h6>
                             <p className="m-0 p-0">
                          
{
    order.additional_info?(order.additional_info):(<small style={{color:"#6d71755"}}>

No Notes from Customer
    </small>)
}

                             </p>
                                </div>
                                <div className="col-12 shadow-sm border p-2 mt-3" >
                                <h6 style={{fontWeight:"bold"}}>Customer</h6>
                             <p className="p-0 m-0">
                                {
                                    order.fname + " " + order.lname
                                }

                             </p>
                             <hr />
                             <h6 style={{fontWeight:"bold"}}>Contact Information</h6>
                             {
                                order.email?(<p className="p-0 m-0">email: {order.email}</p>):("no email")
                             }
                              {
                                order.phone?(<p className="p-0 m-0">phone: {order.phone}</p>):("no phone")
                             }
                             {
                                order.cname?(<p className="p-0 m-0">company: {order.cname}</p>):("")
                             }
                             <hr />
                             <h6 style={{fontWeight:"bold"}}>Shipping Address</h6>
                             {
                                order.billing_address?(<p className="p-0 m-0">Address: {order.billing_address + ", " + order.billing_address2}</p>):("")
                             }
                             
                             {
                                order.city?(<p className="p-0 m-0">City: {order.city}</p>):("")
                             }
                             {
                                order.zipcode?(<p className="p-0 m-0">Zipcode: {order.zipcode}</p>):("")
                             }
                              {
                                order.zipcode?(<p className="p-0 m-0">Country: United Kingdom</p>):("")
                             }
                             
                            
                                </div>
                              
                               </div>
                             
                               </div>



                            </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }		
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default OrderViewPage;

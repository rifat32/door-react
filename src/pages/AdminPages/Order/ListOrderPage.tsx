import React from "react";


import { Link } from "react-router-dom";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import ListCouponPageComponent from "../../../components/PageComponent/CouponComponent/ListCouponPageComponent";
import ListCustomerOrderPageComponent from "../../../components/PageComponent/OrderComponent/ListCustomerOrderPageComponent";
import ListOrderPageComponent from "../../../components/PageComponent/OrderComponent/ListOrderPageComponent";

import ListCategoryPageComponent from "../../../components/PageComponent/ProductComponent/ListCategoryPageComponent";
import { ROUTE_LIST } from "../../../RoutConstants";





const ListOrderPage: React.FC = (props:any) => {




	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>List Order</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Order</li>
							<li className="breadcrumb-item active">List Order</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<div className="d-flex justify-content-between align-items-end">
										<h5 className="card-title">All Order</h5>
										{/* <Link
											to={ROUTE_LIST.createCoupon}
											className="btn btn-primary">
											Add Data
										</Link> */}
									</div>
									{
props.match.params.customerId?<ListCustomerOrderPageComponent customerId={props.match.params.customerId}/>:<ListOrderPageComponent   />
									}
									
									
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default ListOrderPage;

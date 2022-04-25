import React from "react";
import AddCouponForm from "../../../components/Forms/CouponForms/AddCouponForm";
import AddCategoryForm from "../../../components/Forms/ProductForms/AddCategoryForm";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";



const AddCouponPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add new coupon</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Coupon</li>
							<li className="breadcrumb-item active">Add Coupon</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Coupon</h5>

								 <AddCouponForm /> 
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddCouponPage;

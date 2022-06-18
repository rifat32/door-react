import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import AddProductForm from "../../../components/Forms/ProductForms/AddProductForm";

const AddProduct: React.FC = (props:any) => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>	{props?.match.params.id?"Edit":"Add New"}  product</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Products</li>
							<li className="breadcrumb-item active">{props?.match.params.id?"Edit":"Add"}  Product</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">{props?.match.params.id?"Edit":"Add"}  Product</h5>
                              {
								props?.match.params.id?(<AddProductForm value={{id:props?.match.params.id}}
									
		
									type="update" />):(<AddProductForm type="create"/>)
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

export default AddProduct;

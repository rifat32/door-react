import React from "react";
import AddCategoryForm from "../../../../components/Forms/ProductForms/AddCategoryForm";
import AddColorForm from "../../../../components/Forms/ProductForms/AddColorForm";
import AddVariationTemplateForm from "../../../../components/Forms/ProductForms/AddVariationTemplateForm";
import AdminPageComponent from "../../../../components/PageComponent/AdminPageComponent";



const AddColorPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add new Color</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Products</li>
							<li className="breadcrumb-item active">Add Color</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Color</h5>

								 <AddColorForm /> 
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddColorPage;

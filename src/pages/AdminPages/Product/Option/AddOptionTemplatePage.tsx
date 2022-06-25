import React from "react";
import { useParams } from "react-router-dom";
import AddCategoryForm from "../../../../components/Forms/ProductForms/AddCategoryForm";
import AddOtionTemplateForm from "../../../../components/Forms/ProductForms/AddOptionTemplateForm";
import AddVariationTemplateForm from "../../../../components/Forms/ProductForms/AddVariationTemplateForm";
import AdminPageComponent from "../../../../components/PageComponent/AdminPageComponent";



const AddOptionPage: React.FC = (props:any) => {
	

	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add new Option Template</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Products</li>
							<li className="breadcrumb-item active">Add Options Template</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Options Template</h5>
{
	props.match.params.id?(<AddOtionTemplateForm 	type="duplicate" value={props.match.params.id}/> ):
	<AddOtionTemplateForm 	type="create" /> 
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

export default AddOptionPage;

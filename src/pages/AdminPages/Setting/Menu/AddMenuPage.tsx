import React from "react";
import AddCategoryForm from "../../../../components/Forms/ProductForms/AddCategoryForm";
import AddMenuForm from "../../../../components/Forms/SettingForms/AddMenuForm";
import AdminPageComponent from "../../../../components/PageComponent/AdminPageComponent";



const AddMenuPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add new Menu</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Settings</li>
							<li className="breadcrumb-item active">Add Menu</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Menu</h5>

								 <AddMenuForm /> 
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddMenuPage;

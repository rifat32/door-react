import React from "react";
import AddPostOfficeForm from "../../../components/Forms/ElectionAreaForms/AddPostOfficeForm";


import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";



const AddPostOfficePage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Add new Post Office</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Election Area</a>
							</li>
							<li className="breadcrumb-item">Post Office</li>
							<li className="breadcrumb-item active">Add Post Office</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Add Post Office</h5>
									<AddPostOfficeForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default AddPostOfficePage;

import React from "react";


import { Link } from "react-router-dom";
import AdminPageComponent from "../../../../components/PageComponent/AdminPageComponent";

import ListCategoryPageComponent from "../../../../components/PageComponent/ProductComponent/ListCategoryPageComponent";
import ListOptionTemplatePageComponent from "../../../../components/PageComponent/ProductComponent/ListOptionTemplatePageComponent";
import ListVariationTemplatePageComponent from "../../../../components/PageComponent/ProductComponent/ListVariationTemplatePageComponent";
import { ROUTE_LIST } from "../../../../RoutConstants";





const ListOptionTemplatePage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>List Option Template</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Product</a>
							</li>
							<li className="breadcrumb-item">Option</li>
							<li className="breadcrumb-item active">List Option Template</li>
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
										<h5 className="card-title">All Option Template</h5>
										<Link
											to={ROUTE_LIST.createOptionTemplate}
											className="btn btn-primary">
											Add Data
										</Link>
									</div>
									<ListOptionTemplatePageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default ListOptionTemplatePage;

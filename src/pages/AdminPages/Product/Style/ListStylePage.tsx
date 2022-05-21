import React from "react";


import { Link } from "react-router-dom";
import AdminPageComponent from "../../../../components/PageComponent/AdminPageComponent";
import ListDistrictPageComponent from "../../../../components/PageComponent/ElectionAreaComponent/ListDistrictPageComponent";
import ListCategoryPageComponent from "../../../../components/PageComponent/ProductComponent/ListCategoryPageComponent";
import ListStylePageComponent from "../../../../components/PageComponent/ProductComponent/ListStylePageComponent";
import { ROUTE_LIST } from "../../../../RoutConstants";





const ListStylePage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>List Style</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Product</a>
							</li>
							<li className="breadcrumb-item">Style</li>
							<li className="breadcrumb-item active">List Style</li>
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
										<h5 className="card-title">All Style</h5>
										<Link
											to={ROUTE_LIST.createStyle}
											className="btn btn-primary">
											Add Data
										</Link>
									</div>
									<ListStylePageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default ListStylePage;

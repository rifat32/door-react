import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import CustomModal from "../../Modal/Modal";
import { toast } from "react-toastify";

import AddVariationTemplateForm from "../../Forms/ProductForms/AddVariationTemplateForm";
import { Link } from "react-router-dom";
import AddOtionTemplateForm from "../../Forms/ProductForms/AddOptionTemplateForm";



const ListOptionTemplatePageComponent: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<any>([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
	};
	const [currentData, setCurrentData] = useState<any>(null);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/options`);
	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");

	const updateDataStates = (updatedData: any) => {
		const tempDatas = data.map((el: any) => {
			if (parseInt(el.id) === parseInt(updatedData.id)) {
				return updatedData;
			}
			return el;
		});
		setData(tempDatas);
	};

	useEffect(() => {
		loadData(link);
	}, []);

	// pagination required
	const loadData = (link: string) => {
		setLoading(true)
		apiClient()
			.get(link)
			.then((response: any) => {
				setLoading(false)
				console.log(response.data.data);
				setData([...data, ...response.data.data.data]);
				setNextPageLink(response.data.data.next_page_url);
				setPrevPageLink(response.data.data.prev_page_url);
			})
			.catch((error) => {
				setLoading(false)
				console.log(error.response);
			});
	};
	const deleteData = (id: number) => {
		if (window.confirm("Are you sure  want to delete ?")) {
			apiClient()
				.delete(`${BACKENDAPI}/v1.0/options/${id}`)
				.then((response: any) => {
					console.log(response);
					const tempDatas = data.filter((el: any) => {
						return el.id !== id;
					});
					setData(tempDatas);
					toast.success("data deleted successfully");
				})
				.catch((error) => {
					console.log(error.response);
				});
		}
	};
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(e.target.value) {
			setLoading(true)
			apiClient()
				.get(`${BACKENDAPI}/v1.0/options/search/${e.target.value}`)
				.then((response: any) => {
					setLoading(false)
					console.log(response.data.data);
					setData([ ...response.data.data.data]);
					setNextPageLink(response.data.data.next_page_url);
					setPrevPageLink(response.data.data.prev_page_url);
				})
				.catch((error) => {
					setLoading(false)
					console.log(error.response);
				});
		} else {
			setLoading(true)
		apiClient()
			.get(link)
			.then((response: any) => {
				setLoading(false)
				console.log(response.data.data);
				setData([ ...response.data.data.data]);
				setNextPageLink(response.data.data.next_page_url);
				setPrevPageLink(response.data.data.prev_page_url);
			})
			.catch((error) => {
				setLoading(false)
				console.log(error.response);
			});
		}
	
	}
	return (
		<>
		<div className="row">
			<div className="col-6 offset-3">

			<input type="text" className="form-control" onChange={handleSearch}/>
			</div>
	
		</div>
			<table className="table">
				<thead>
					<tr>
					
						<th scope="col">Id</th>
						<th scope="col">Name</th>
						<th scope="col">Values</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.id}</td>
									<td>{el.name && el.name}</td>
									<td>{el.option_value_template && (
										<>{
										el.option_value_template.map((el:any) => {
											return (<>
											{el.name} {" "}
											</>)
										})
										}
										</>

										)}</td>
									<td>
										<div className="btn-group">
											<button
												type="button"
												className="btn btn-sm btn-primary dropdown-toggle"
												data-bs-toggle="dropdown"
												aria-expanded="false">
												Action
											</button>
											<ul className="dropdown-menu action">
												<li>
													<a
														onClick={() => {
															setCurrentData(el);
															showModal(true);
														}}
														className="dropdown-item"
														href="#">
														edit
													</a>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
												{/* <li>
												
													
														<Link to={`/admin/variation-templates/duplicate/${el.id}`}>
														<a
														className="dropdown-item"
														href="#">
															duplicate
														</a>
													</Link>
													
												</li> */}
												<li>
													<hr className="dropdown-divider" />
												</li>
												<li>
													<a
														onClick={() => {
															deleteData(el.id);
														}}
														className="dropdown-item"
														href="#">
														delete
													</a>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
											</ul>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
			<div className="text-center">
				{nextPageLink ? (
					<button
						className="btn btn-primary"
						onClick={() => {
							loadData(nextPageLink);
						}}>
						Load More ...
					</button>
				) : data.length ? (

					prevPageLink ? (
						"No more data to show"
					) : (
						""
					)

				) : (
                     loading?("Loading.."):("No data to show")
				)}
			</div>
			<CustomModal
				isOpen={modalIsOpen}
				showModal={showModal}
				type="Update Category">
				<AddOtionTemplateForm
					value={currentData}
					updateDataStates={updateDataStates}
					showModal={showModal}
					type="update"
				/>
			</CustomModal>
		</>
	);
};

export default ListOptionTemplatePageComponent;

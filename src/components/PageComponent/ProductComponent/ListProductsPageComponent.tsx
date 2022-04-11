import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import CustomModal from "../../Modal/Modal";
import AddProductForm from "../../Forms/ProductForms/AddProductForm";
import { toast } from "react-toastify";

const ListProductsPageComponent: React.FC = () => {
	const [data, setData] = useState<any>([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
	};
	const [currentData, setCurrentData] = useState<any>(null);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/products`);
	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");

	const updateDataStates = (updatedData: any) => {
		
		loadData2(`${BACKENDAPI}/v1.0/products`);
		// console.log(updatedData)
		// let index = -1;
		// let firstId = updatedData[0].id;
		// const tempDatas = data.map((el: any,indx:any) => {
		// 	if (parseInt(el.id) === parseInt(firstId)) {
		// 		if (index === -1) {
		// 			index =	indx
		// 		}
				
		// 		return ;
		// 	}
		// 	return el;
		// });
		// tempDatas.
		// setData(tempDatas);
	};

	useEffect(() => {
		loadData(link);
	}, []);

	// pagination required
	
	const loadData = (link: string) => {
		apiClient()
			.get(link)
			.then((response: any) => {
				console.log(response.data.products);
				setData([...data, ...response.data.products.data]);
				setNextPageLink(response.data.products.next_page_url);
				setPrevPageLink(response.data.products.prev_page_url);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const loadData2 = (link: string) => {
		apiClient()
			.get(link)
			.then((response: any) => {
				console.log(response.data.products);
				setData(response.data.products.data);
				setNextPageLink(response.data.products.next_page_url);
				setPrevPageLink(response.data.products.prev_page_url);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const deleteData = (id: number) => {
		if (window.confirm("Are you sure  want to delete ?")) {
			apiClient()
				.delete(`${BACKENDAPI}/v1.0/products/${id}`)
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
	return (
		<>
			<table className="table">
				<thead>
					<tr>
					
						<th scope="col"> Product Name</th>
						<th scope="col">Type</th>
						<th scope="col">Category</th>
						<th scope="col">Sku</th>
						{/* <th scope="col">Quantity</th> */}
						<th scope="col">Price</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
							
									<td>{el.name && el.name }</td>
									<td>{el.type && el.type}</td>
									<td>{el.category && el.category}</td>
									<td>{el.sku && el.sku}</td>
									{/* <td>{el.pQuantity}</td> */}
									<td>{el.price && el.price}</td>
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
					"No data to show"
				)}
			</div>
			<CustomModal
				isOpen={modalIsOpen}
				showModal={showModal}
				type="Update Bank">
				<AddProductForm
					value={currentData}
					updateDataStates={updateDataStates}
					showModal={showModal}
					type="update"
				/>
			</CustomModal>
		</>
	);
};

export default ListProductsPageComponent;

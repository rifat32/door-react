import React, { useState, useEffect } from "react";
import { BACKEND, BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import CustomModal from "../../Modal/Modal";
import AddProductForm from "../../Forms/ProductForms/AddProductForm";
import { toast } from "react-toastify";
import EditPriceForm from "../../Forms/ProductForms/EditPriceForm";

const ListProductsPageComponent: React.FC = () => {
	interface Links {
		label: (string | null);
		url: (string | number);
		active: boolean;
	}
	const [loading, setLoading] = useState(false);
	const [perPage, setPerPage] = useState(9)
	const [from, setFrom] = useState(null)
	const [to, setTo] = useState(null)
	const [total, setTotal] = useState(null)

	const [lastPage, setLastPage] = useState(0)

	const [links, setLinks] = useState<(Links[] | null)>(null)

	const [current_page, set_current_page] = useState(0)
	const [data, setData] = useState<any>([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [priceModalIsOpen, setIsPriceModalOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setIsOpen(show);
		if(!show){
			updateDataStates(null)
		}
	};
	const showPriceModal = (show: boolean) => {
		setIsPriceModalOpen(show);
	};
	const [currentData, setCurrentData] = useState<any>(null);

	const [link, setLink] = useState(`${BACKENDAPI}/v1.0/products`);
	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");

	const updateDataStates = (updatedData: any) => {

		loadData(`${BACKENDAPI}/v1.0/products/pagination/${perPage}?page=${current_page}`);
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
		loadData(perPage);
	}, []);

	// pagination required

	// const loadData = (link: string) => {
	// 	apiClient()
	// 		.get(link)
	// 		.then((response: any) => {
	// 			console.log(response.data.products);
	// 			setData([...data, ...response.data.products.data]);
	// 			setNextPageLink(response.data.products.next_page_url);
	// 			setPrevPageLink(response.data.products.prev_page_url);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error.response);
	// 		});
	// };
	// const loadData2 = (link: string) => {
	// 	apiClient()
	// 		.get(link)
	// 		.then((response: any) => {
	// 			console.log(response.data.products);
	// 			setData(response.data.products.data);
	// 			setNextPageLink(response.data.products.next_page_url);
	// 			setPrevPageLink(response.data.products.prev_page_url);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error.response);
	// 		});
	// };
	const loadData = (urlOrPerPage: (number | string)) => {
		setLoading(true)
		setData([]);
		let url;
		if (typeof urlOrPerPage === "string") {
			url = urlOrPerPage.replace("http", "http");
		} else {
			url = `${BACKENDAPI}/v1.0/products/pagination/${urlOrPerPage}`
		}
		apiClient()
			.get(url)
			.then((response: any) => {
				setLoading(false)
				console.log(response.data)
				setFrom(response.data.products.from)
				setTo(response.data.products.to)
				setTotal(response.data.products.total)

				setLastPage(response.data.products.last_page)

				setLinks(response.data.products.links)
				set_current_page(response.data.products.current_page)
				console.log(response.data.products);
				const tempData = response.data.products.data.map((el:any) => {
el.checked = false;
return el;
				})
				setData(tempData);

				setNextPageLink(response.data.products.next_page_url);
				setPrevPageLink(response.data.products.prev_page_url);
			})
			.catch((error) => {
				setLoading(false)
				console.log(error.response)
			});
	};

	const deleteData = (id: number) => {
		if (window.confirm("Are you sure  want to delete ?")) {
			apiClient()
				.delete(`${BACKENDAPI}/v1.0/products/${id}`)
				.then((response: any) => {
					// console.log(response);
					// const tempDatas = data.filter((el: any) => {
					// 	return el.id !== id;
					// });
					// setData(tempDatas);
					updateDataStates(null)
					toast.success("data deleted successfully");
				})
				.catch((error) => {
					console.log(error.response);
				});
		}
	};

	const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement
	>) => {
		const newValue = parseInt(e.target.value);
		setPerPage(newValue)
		console.log(newValue)
		loadData(newValue)

	}
	const handleAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		const tempData = data.map((el: any) => {
			el.checked = e.target.checked
			return el
		})
		setData(tempData)
	}
	const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		let vid = e.target.value.split("_")[1]
		console.log(e.target.checked)
		const tempData = data.map((el: any) => {
			console.log(el.vid,parseInt(vid))
			if (parseInt(el.vid) === parseInt(vid)) {

				el.checked = e.target.checked
				console.log(e.target.checked)
			}
			return el
		})
		setData(tempData)
	}
	const setLinksView = (el: Links, index: number, arr: object[]) => {
		if (el.label == "&laquo; Previous") {
			if (el.url) {
				return <li key={index} className="page-item"><button className="page-link" onClick={() =>
					loadData(el.url)} >Previous</button></li>
			}
			else {
				return <li key={index} className="page-item disabled"><button className="page-link"  >Previous</button></li>
			}
		}
		else if (el.label == "Next &raquo;") {
			if (el.url) {
				return <li key={index} className="page-item"><button onClick={() =>
					loadData(el.url)} className="page-link" >Next</button></li>
			}
			else {
				return <li key={index} className="page-item disabled"><button className="page-link" >Next</button></li>
			}
		} else {
			if (index === 1) {
				return <React.Fragment key={index}><li className="page-item"><button className={`page-link  ${el.active && "text-dark"}`} onClick={() =>
					index == current_page ? null : loadData(el.url)} >
					1
				</button></li>
					{
						current_page > 4 ? (<li className="page-item"><button className={`page-link `} >
							....
						</button></li>) : null
					}
				</React.Fragment>
			}
			else if (index === lastPage && lastPage > 1) {
				return <React.Fragment key={index}>
					{
						current_page < (lastPage - 3) ? (<li className="page-item">
							<button className={`page-link `} >
								....
							</button></li>) : null
					}
					<li key={index} className="page-item"><button className={`page-link  ${el.active && "text-dark"}`} onClick={() =>
						index == current_page ? null : loadData(el.url)} >
						{lastPage}
					</button></li>

				</React.Fragment>
			}
			else {

				if (index == current_page + 1 || index == current_page + 2 || index == current_page - 1 || index == current_page - 2 || index == current_page) {
					return <li key={index} className="page-item"><button className={`page-link  ${el.active && "text-dark"}`} onClick={() =>
						index == current_page ? null : loadData(el.url)} >
						{el.label}
					</button></li>

				}



			}

		}
	}
	const [currentPriceData, setCurrentPriceData] = useState<any>(null);
	const bulkPriceEdit = () => {


		const tempData:any[] = [];
		data.map((el:any) => {
			if(el.checked){
				tempData.push({
					vid:el.vid,
				})
			}
           
		})
		if(!tempData.length){
          toast.error("Please select first")   
		} else {
			setCurrentPriceData(tempData);
			showPriceModal(true);
		}
		
	}
	const bulkDelete = () => {
		if (window.confirm("Are you sure  want to delete ?")) {
			const tempData:any[] = [];
			data.map((el:any) => {
				if(el.checked){
					tempData.push({
						id:el.id,
						vid:el.vid
	
					})
				}
			   
			})
			if(!tempData.length){
			  toast.error("Please select first")   
			} else {
				apiClient()
				.put(`${BACKENDAPI}/v1.0/products/bulkedit/delete`,{variations:tempData})
				.then((response: any) => {
					// console.log(response);
					// const tempDatas = data.filter((el: any) => {
					// 	return el.id !== id;
					// });
					// setData(tempDatas);
					updateDataStates(null)
					toast.success("data deleted successfully");
				})
				.catch((error) => {
					console.log(error.response);
				});
			}
			
		}

		
	}
	
	if (!data?.length) {

		return <div className="noProduct d-flex align-items-center justify-content-center">
			{
				loading ? "loading..." : <h3 className="display-3" >
					No products to show
				</h3>
			}

		</div>
	}
	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id={`all`}
									name="all"
									value="all"
									onChange={handleAllChecked}
								/>

								<label
									className="form-check-label"
									htmlFor="all">

								</label>
							</div>
						</th>
						<th scope="col"> Product Name</th>
						<th scope="col">Image</th>
						<th scope="col">Type</th>
						<th scope="col">Category</th>
						<th scope="col">Sku</th>
						<th scope="col">Variation Name</th>
						<th scope="col">Variation</th>
						<th scope="col">Price</th>
						<th scope="col">Quantity</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.vid}>
									<td>
										<div className="form-check" >
											<input
												className="form-check-input"
												type="checkbox"
												id={`check_${el.id}`}
												name="chech"
												value={`check_${el.vid}`}
												onChange={handleChecked}
												checked={el.checked}
											/>

											<label
												className="form-check-label"
												htmlFor={`check_${el.id}`}>

											</label>
										</div>
									</td>

									<td>{el.name && el.name}</td>
									<td>{el.image && <img src={`${BACKEND}/${el.image}`} height={100} width={100} />}</td>
									<td>{el.type && el.type}</td>
									<td>{el.category && el.category}</td>
									<td>{el.sku && el.sku}</td>
									<td>{el.vname && el.vname}</td>
									<td>{el.vname && el.vvalue}</td>
									{/* <td>{el.pQuantity}</td> */}
									<td>{el.price && el.price}</td>
									<td>{el.qty && el.qty}</td>
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
			<div className="footer-pagination">
				<div className="row">
					<div className="col-md-4 text-center">
						<div className="items">
							<label>Item per page</label> <select onChange={handlePerPage} value={perPage}>
								<option value={6}>6</option>
								<option value={9}>9</option>
								<option value={12}>12</option>
								<option value={15}>15</option>

							</select>
						</div>

					</div>
					<div className="col-md-2 text-center">
						<div className="number">{from} - {to} of {total}</div>

					</div>
					<div className="col-md-6">

						<nav aria-label="Page navigation example   ">
							<ul className="pagination  ">

								{
									links ? links.map((el, index, arr) => setLinksView(el, index, arr)) : null
								}





							</ul>
						</nav>



					</div>



				</div>
				<div className="row">
					<div className="col-6 offset-3">
						<button onClick={bulkPriceEdit}  className="btn btn-info me-3">Bulk Price Edit</button>
						<button onClick={bulkDelete}  className="btn btn-danger me-3">Bulk Delete</button>
					</div>
					
				</div>
			</div>

			{/* <div className="text-center">
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
			</div> */}
			<CustomModal
				isOpen={modalIsOpen}
				showModal={showModal}
				type="Update Product">
				<AddProductForm
					value={currentData}
					updateDataStates={updateDataStates}
					showModal={showModal}
					type="update"
				/>
			</CustomModal>
			<CustomModal
				isOpen={priceModalIsOpen}
				showModal={showPriceModal}
				type="Update Product">
				<EditPriceForm
					value={currentPriceData}
					updateDataStates={updateDataStates}
					showModal={showPriceModal}
					type="update"
				/>
			</CustomModal>
		</>
	);
};

export default ListProductsPageComponent;

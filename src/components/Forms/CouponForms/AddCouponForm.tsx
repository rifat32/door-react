import React, { useState, useEffect } from "react";
import { BACKEND, BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";

interface FormData {
	name: string;
	expire_date:string;
	category_id:string;
	is_all_category_product:string,
	discount_amount:string,
	discount_type:string,
	is_active:string;
}

const AddCouponForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
	name: "",
	expire_date: "",
	category_id: "",
	is_all_category_product:"1",
	discount_amount:"",
	discount_type:"fixed",
	is_active:"1",
	});
	interface Links {
		label: (string | null);
		url: (string | number);
		active: boolean;
	}
	const [categories, setCategories] = useState([]);
	const [errors, setErrors] = useState<any>(null);
	// ############################# products
	const [loading, setLoading] = useState(false);
	const [perPage, setPerPage] = useState(2)
	const [from, setFrom] = useState(null)
	const [to, setTo] = useState(null)
	const [total, setTotal] = useState(null)

	const [lastPage, setLastPage] = useState(0)

	const [links, setLinks] = useState<(Links[] | null)>(null)

	const [current_page, set_current_page] = useState(1)
	const [data, setData] = useState<any>([]);
	const [currentData, setCurrentData] = useState<any>(null);


	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");
	const updateDataStates = (updatedData: any) => {
		loadData(`${BACKENDAPI}/v1.0/products/pagination/${perPage}?page=${current_page}&&category=${formData.category_id}`);
	
	};
	const [selectedData, setSelectedData] = useState<any>([]);
	useEffect(() => {
		setSelectedData([]);
		
		loadData(perPage,false);
	}, [formData.category_id,formData.is_all_category_product]);
	const getSelectedData = () => {
		let tempSelectedData =	data.filter((el:any) => {
			let got = false;
			selectedData.map((el2:any) => {
				if(parseInt(el2.id) == parseInt(el.id)) {
					got = true
				}
		})
			return el.checked === true && !got;

			});
			return tempSelectedData;
	}
	const loadData = (urlOrPerPage: (number | string),select=true) => {
		setLoading(true)
		if(select){
			let tempSelectedData = getSelectedData();

			 
					setSelectedData((prevData:any) => {
					  return [...prevData,
				...tempSelectedData];
				
			
			
					});
		} else {
			setSelectedData([]);
		}
	
		setData([]);
		let url;
		if (typeof urlOrPerPage === "string") {
			url = urlOrPerPage.replace("http", "http");

		} else {
			url = `${BACKENDAPI}/v1.0/products/pagination/${urlOrPerPage}?page=${current_page}&&category=${formData.category_id}`
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
					let selected = false;
					if(selectedData.length) {
						selectedData.map((el2:any) => {
                           if(el2.id === el.id) {
							selected = true;
						   }
						}) 
						console.log("found",selected)
					
					}
if(selected) {
	el.checked = true;
} else {
	el.checked = false;
}
         
		 el.qty = 0;
		 el.variations.map((el2:any) => {
			el.qty += el2.qty
		 })
         return el;
				})
				setData(tempData);

				setNextPageLink(response.data.products.next_page_url);
				setPrevPageLink(response.data.products.prev_page_url);
			})
			.catch((error) => {
				setLoading(false)
				console.log(error)
			});
	};
	console.log("selected data",selectedData)
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
			let id = e.target.value.split("_")[1]
			console.log(e.target.checked)
			const tempData = data.map((el: any) => {
				console.log(el.id,parseInt(id))
				if (parseInt(el.id) === parseInt(id)) {
	
					el.checked = e.target.checked
					console.log(e.target.checked)
				}
				if(!e.target.checked) {
		
					const selectedProduct =	selectedData.filter((el:any) => {
								return parseInt(el.id) !== parseInt(id)
						})
						
						setSelectedData(selectedProduct)
					} else {
						// setFormData({...formData,selectedProduct:[...formData.selectedProduct,selectedItem]})
					}
				return el
			})
			setData(tempData)
		}
		const setLinksView = (el: Links, index: number, arr: object[]) => {

			let params = `${BACKENDAPI}/v1.0/products/pagination/${perPage}?page=${current_page}&&category=${formData.category_id}`.split("?")[1];
   
        let paramsArray = params.split("&&")
        let finalParamsArray = paramsArray.filter(el => {
          return el.split("=")[0] !== "page"
         
        })
        params =   finalParamsArray.join("&&")
        el.url += `&&${params}`



			if (el.label == "&laquo; Previous") {
				if (el.url) {
					return <li key={index} className="page-item"><button type="button" className="page-link" onClick={() =>
						loadData(el.url)} >Previous</button></li>
				}
				else {
					return <li key={index} className="page-item disabled"><button type="button"  className="page-link"  >Previous</button></li>
				}
			}
			else if (el.label == "Next &raquo;") {
				if (el.url) {
					return <li key={index} className="page-item"><button type="button"  onClick={() =>
						loadData(el.url)} className="page-link" >Next</button></li>
				}
				else {
					return <li key={index} className="page-item disabled"><button type="button" className="page-link" >Next</button></li>
				}
			} else {
				if (index === 1) {
					return <React.Fragment key={index}><li className="page-item"><button type="button" className={`page-link  ${el.active && "text-dark"}`} onClick={() =>
						index == current_page ? null : loadData(el.url)} >
						1
					</button></li>
						{
							current_page > 4 ? (<li className="page-item"><button type="button"  className={`page-link `} >
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
						<li key={index} className="page-item"><button type="button"  className={`page-link  ${el.active && "text-dark"}`} onClick={() =>
							index == current_page ? null : loadData(el.url)} >
							{lastPage}
						</button></li>
	
					</React.Fragment>
				}
				else {
	
					if (index == current_page + 1 || index == current_page + 2 || index == current_page - 1 || index == current_page - 2 || index == current_page) {
						return <li key={index} className="page-item"><button type="button"  className={`page-link  ${el.active && "text-dark"}`} onClick={() =>
							index == current_page ? null : loadData(el.url)} >
							{el.label}
						</button></li>
	
					}
	
	
	
				}
	
			}
		}
		// ############################# products
	const types = [
		{
			id:1,
			value:"fixed"
		},
		{
			id:2,
			value:"percentage"
		}
	]
const invalidInputHandler = (error:any) => {
	if (error.status === 422) {
		setErrors(error.data.errors);
	}
}
const loadCategories = () => {
	apiClient()
		.get(`${BACKENDAPI}/v1.0/categories/all`)
		.then((response: any) => {
			console.log(response);
			setCategories(response.data.data);
		})
		.catch((error) => {
			console.log(error.response);
		});
};
useEffect(() => {
loadCategories()
},[])
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetFunction = () => {
		setFormData({
			name: "",
			expire_date: "",
			category_id: "",
			is_all_category_product:"1",
	discount_amount:"",
	discount_type:"fixed",
			is_active:"1",
		});
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors(null);
		if (props.type === "update") {
			updateData();
		} else {
			createData();
		}
	};
	const createData = () => {

		const finalSelectedProducts = [...getSelectedData(),...selectedData]



		apiClient()
			.post(`${BACKENDAPI}/v1.0/coupons`, { ...formData,finalSelectedProducts })
			.then((response) => {
				console.log(response);
				toast.success("Data saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
				
				
				invalidInputHandler(error.response)
				ErrorMessage(error.response)
			});
	};
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	// edit data section
	useEffect(() => {
		if (props.type == "update") {
			setFormData(props.value);
		}
	}, []);
	const updateData = () => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/coupons`, { ...formData })
			.then((response: any) => {
				console.log(response);
				toast.success("Data Updated");

				props.updateDataStates(response.data.data);
				props.showModal(false);
			})
			.catch((error) => {
				console.log(error);
				console.log(error.response);
				ErrorMessage(error.response)
				invalidInputHandler(error.response)
			});
	};
	// end edit Data section
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	return (
		<form className="row g-3" onSubmit={handleSubmit}>
		
			<div className="col-md-4">
				<label htmlFor="name" className="form-label">
					 Name
				</label>
				<input
					type="text"
					className={
						errors
							? errors.name
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="name"
					name="name"
					onChange={handleChange}
					value={formData.name}
				/>
				{errors?.name && (
					<div className="invalid-feedback">{errors.name[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="category_id" className="form-label">
					Category
				</label>
				<select
					className={
						errors
							? errors.category_id
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="category_id"
					name="category_id"
					onChange={handleSelect}
					value={formData.category_id}>
					<option value="">All</option>
					{categories.map((el: any, index) => (
						<option
							key={index}
							value={el.id}
							style={{ textTransform: "uppercase" }}>
							{el.name}
						</option>
					))}
				</select>
				{errors?.category_id && (
					<div className="invalid-feedback">{errors.category_id[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			{
				formData.category_id && (	<div className="col-md-4">
				<label htmlFor="is_all_category_product" className="form-label">
					All Category Products?
				</label>
				<select
					className={
						errors
							? errors.is_all_category_product
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="is_all_category_product"
					name="is_all_category_product"
					onChange={handleSelect}
					value={formData.is_all_category_product}>
					<option value={1}>Yes</option>
					<option value={0}>No</option>
				</select>
				{errors?.is_all_category_product && (
					<div className="invalid-feedback">{errors.is_all_category_product[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>)
			}
		
			<div className="col-md-4">
				<label htmlFor="expire_date" className="form-label">
					 Expire Date
				</label>
				<input
					type="datetime-local"
					className={
						errors
							? errors.expire_date
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="expire_date"
					name="expire_date"
					onChange={handleChange}
					value={formData.expire_date}
				/>
				{errors?.expire_date && (
					<div className="invalid-feedback">{errors.expire_date[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="is_active" className="form-label">
					Status
				</label>
				<select
					className={
						errors
							? errors.is_active
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="is_active"
					name="is_active"
					onChange={handleSelect}
					value={formData.is_active}>
					<option value={1}>Active</option>
					<option value={0}>Deactive</option>
				</select>
				{errors?.is_active && (
					<div className="invalid-feedback">{errors.is_active[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="type" className="form-label">
				Discount Type
				</label>
				<select
					className={
						errors
							? errors.discount_type
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="discount_type"
					name="discount_type"
					onChange={handleSelect}
					value={formData.discount_type}>
				
					{types.map((el, index) => (
						<option
							key={index}
							value={el.value}
							style={{ textTransform: "uppercase" }}>
							{el.value}
						</option>
					))}
				</select>
				{errors?.discount_type && (
					<div className="invalid-feedback">{errors.discount_type[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="discount_amount" className="form-label">
					 Discount Amount
				</label>
				<input
					type="text"
					className={
						errors
							? errors.discount_amount
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="discount_amount"
					name="discount_amount"
					onChange={handleChange}
					value={formData.discount_amount}
				/>
				{errors?.discount_amount && (
					<div className="invalid-feedback">{errors.discount_amount[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
		
	
{
	(formData.category_id && formData.is_all_category_product === "0")?(
<div className="row">
		<h3 className="text-center mt-5">
			Product List
		</h3>
            {
				!data?.length?(
			<div className="noProduct d-flex align-items-center justify-content-center">
			{
				loading ? "loading..." : <h3 className="display-3" >
					No products to show
				</h3>
			}

		</div>
				):(
					<React.Fragment>
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
						<th scope="col">Quantity</th>
						<th scope="col">Status</th>
						<th scope="col">Featured</th>
						
					</tr>
				</thead>
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>
										<div className="form-check" >
											<input
												className="form-check-input"
												type="checkbox"
												id={`check_${el.id}`}
												name="chech"
												value={`check_${el.id}`}
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
									
									<td>{el.qty && el.qty}</td>
									<td>{el.status && el.status}</td>
									<td>{el.is_featured ? "yes":"no"}</td>
								
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
			
			</div>
					</React.Fragment>
				)
			}

		</div>


	):(null)
}
		

			<div className="text-center">
				<button type="submit" className="btn btn-primary me-2">
					Submit
				</button>
				<button
					type="button"
					onClick={resetFunction}
					className="btn btn-secondary">
					Reset
				</button>
			</div>
		</form>
	);
};

export default AddCouponForm;

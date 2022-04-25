import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";

interface FormData {
	name: string;
	expire_date:string;
	category_id:string;
	discount:string;
	is_active:string;
}

const AddCouponForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
	name: "",
	expire_date: "",
	category_id: "",
	discount: "",
	is_active:"1",
	});
	const [categories, setCategories] = useState([]);
	const [errors, setErrors] = useState<any>(null);

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
			discount: "",
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
		apiClient()
			.post(`${BACKENDAPI}/v1.0/coupons`, { ...formData })
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
					<option value="">Please Select</option>
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
			<div className="col-md-4">
				<label htmlFor="discount" className="form-label">
					 Discount
				</label>
				<input
					type="text"
					className={
						errors
							? errors.discount
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="discount"
					name="discount"
					onChange={handleChange}
					value={formData.discount}
				/>
				{errors?.discount && (
					<div className="invalid-feedback">{errors.discount[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="expire_date" className="form-label">
					 Expire Date
				</label>
				<input
					type="date"
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

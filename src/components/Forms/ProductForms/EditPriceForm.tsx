import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";

interface FormData {
	type: string;
	amount: string;
	variations:any[]
}

const EditPriceForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
	type: "fixed",
	amount: "",
	variations:[]
	});
	
	const [errors, setErrors] = useState<any>(null);

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
			type: "",
			amount: "",
			variations:[]
		});
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors(null);
		if (props.type === "update") {
			updateData();
		} else {
			// createData();
		}
	};
	const createData = () => {
		apiClient()
			.post(`${BACKENDAPI}/v1.0/categories`, { ...formData })
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
			console.log(props)
			setFormData({...formData,variations:props.value});
		}
	}, []);
	const updateData = () => {
		console.log(formData)
	
		apiClient()
			.put(`${BACKENDAPI}/v1.0/products/bulkedit/price`, { ...formData })
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
				<label htmlFor="type" className="form-label">
				Type
				</label>
				<select
					className={
						errors
							? errors.type
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="type"
					name="type"
					onChange={handleSelect}
					value={formData.type}>
				
					{types.map((el, index) => (
						<option
							key={index}
							value={el.value}
							style={{ textTransform: "uppercase" }}>
							{el.value}
						</option>
					))}
				</select>
				{errors?.type && (
					<div className="invalid-feedback">{errors.type[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="amount" className="form-label">
				Amount
				</label>
				<input
					type="text"
					className={
						errors
							? errors.amount
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="amount"
					name="amount"
					onChange={handleChange}
					value={formData.amount}
				/>
				{errors?.amount && (
					<div className="invalid-feedback">{errors.amount[0]}</div>
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

export default EditPriceForm;

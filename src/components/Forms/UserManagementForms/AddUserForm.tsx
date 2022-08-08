import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";

interface FormData {
	first_name: string,
	last_name: string,
	email: string;
	password: string;
	password_confirmation: string;
	role_name: string;
	discount:string;
}
const AddUserForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password_confirmation: "",
		role_name: "",
		discount:""
	});
	const [errors, setErrors] = useState<any>(null);
	const [roles, setRoles] = useState([]);
	useEffect(() => {
		loadWings();
	}, []);
	const loadWings = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/roles/all`)
			.then((response: any) => {
				console.log(response);
				setRoles(response.data.roles);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	// handle Change Function
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		// if (e.target.name === "wing_id") {
		// 	loadBills(e.target.value);
		// }
	};

	const resetFunction = () => {
		setFormData({
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			password_confirmation: "",
			role_name: "",
			discount:""
		});
	};
	// handle submit Function
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
			.post(`${BACKENDAPI}/v1.0/users`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("Data saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
				if (
					error.response.status === 404 ||
					error.response.status === 400
				) {
					toast.error(error.response.data.message);
				}
				if (error.response.status === 422) {
					toast.error("invalid input");
					setErrors(error.response.data.errors);
				}
			});
	};
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	// edit data section
	useEffect(() => {
		if (props.type == "update") {
		
			setFormData({...props.value,role_name:	props.value.roles[0].name});
		}
	}, []);
	const updateData = () => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/users`, { ...formData })
			.then((response: any) => {
				console.log(response);
				toast.success("Data Updated");

				props.updateDataStates(response.data.data);
				props.showModal(false);
			})
			.catch((error) => {
				console.log(error);
				return
				console.log(error.response);
				if (
					error.response.status === 404 ||
					error.response.status === 400
				) {
					toast.error(error.response.data.message);
				}
				if (error.response.status === 422) {
					toast.error("invalid input");
					setErrors(error.response.data.errors);
				}
			});
	};
	// end edit Data section
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	return (
		<form className="row g-3">
				<div className="col-6">
					<label htmlFor="first_name" className="form-label">
					First Name
					</label>
					<input
						type="text"
						name="first_name"
						className={
							errors
								? errors.first_name
									? `form-control is-invalid`
									: `form-control is-valid`
								: "form-control"
						}
						id="first_name"
						required
						onChange={handleChange}
						value={formData.first_name}
					/>
					{errors?.first_name && (
						<div className="invalid-feedback">{errors.first_name[0]}</div>
					)}
					{errors && <div className="valid-feedback">Looks good!</div>}
				</div>
				<div className="col-6">
					<label htmlFor="last_name" className="form-label">
					Last Name
					</label>
					<input
						type="text"
						name="last_name"
						className={
							errors
								? errors.last_name
									? `form-control is-invalid`
									: `form-control is-valid`
								: "form-control"
						}
						id="last_name"
						required
						onChange={handleChange}
						value={formData.last_name}
					/>
					{errors?.last_name && (
						<div className="invalid-feedback">{errors.last_name[0]}</div>
					)}
					{errors && <div className="valid-feedback">Looks good!</div>}
				</div>
			<div className="col-6">
				<label htmlFor="yourEmail" className="form-label">
					Email
				</label>
				<div className="input-group has-validation">
					<span className="input-group-text" id="inputGroupPrepend">
						@
					</span>
					<input
						type="text"
						name="email"
						className={
							errors
								? errors.email
									? `form-control is-invalid`
									: `form-control is-valid`
								: "form-control"
						}
						id="email"
						required
						onChange={handleChange}
						value={formData.email}
					/>
					{errors?.email && (
						<div className="invalid-feedback">{errors.email[0]}</div>
					)}
					{errors && <div className="valid-feedback">Looks good!</div>}
				</div>
			</div>
			<div className="col-6">
				<label htmlFor="password" className="form-label">
					Password
				</label>
				<input
					type="password"
					name="password"
					className={
						errors
							? errors.password
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="password"
					required
					onChange={handleChange}
					value={formData.password}
				/>
				{errors?.password && (
					<div className="invalid-feedback">{errors.password[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-6">
				<label htmlFor="password_confirmation" className="form-label">
					Confirm Password
				</label>
				<input
					type="password"
					name="password_confirmation"
					// className={
					// 	errors
					// 		? errors.password_confirmation
					// 			? `form-control is-invalid`
					// 			: `form-control is-valid`
					// 		: "form-control"
					// }
					className="form-control"
					id="password_confirmation"
					required
					onChange={handleChange}
					value={formData.password_confirmation}
				/>
				{/* {errors?.password_confirmation && (
					<div className="invalid-feedback">
						{errors.password_confirmation[0]}
					</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>} */}
			</div>
			<div className="col-md-12">
				<label htmlFor="role_name" className="form-label">
					Roles
				</label>
				<select
					className={
						errors
							? errors.role_name
								? `form-select is-invalid`
								: `form-select is-valid`
							: "form-select"
					}
					id="role_name"
					name="role_name"
					onChange={handleSelect}
					value={formData.role_name}>
					<option value="">Please Select</option>
					{roles.map((el: any, index) => (
						<option
							key={index}
							value={el.name}
							style={{ textTransform: "uppercase" }}>
							{el.name}
						</option>
					))}
				</select>
				{errors?.role_name && (
					<div className="invalid-feedback">{errors.role_name[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-6">
				<label htmlFor="discount" className="form-label">
					Discount
				</label>
				<input
					type="text"
					name="discount"
					className={
						errors
							? errors.discount
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="discount"
					required
					onChange={handleChange}
					value={formData.discount}
				/>
				{errors?.discount && (
					<div className="invalid-feedback">{errors.discount[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>

			<div className="text-center">
				<button
					onClick={handleSubmit}
					type="button"
					className="btn btn-primary me-2">
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

export default AddUserForm;

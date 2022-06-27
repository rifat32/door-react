import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";

interface FormData {
	id:string;
	type: string;
	name: string;
	url:string;
	is_active:string;
	children:ChildrenUrl[]
}
interface ChildrenUrl {
	type: string;
	name: string;
	url:string;
}
const AddMenuForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
	id:"",
	type: "single",
	name:"",
	url:"",
	is_active:"1",
	children:[{
		name:"",
		type:"children",
		url:""
	}]
	});
	
	const [errors, setErrors] = useState<any>(null);

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
			id:"",
			type: "single",
			name:"",
			url:"",
			is_active:"1",
			children:[{
				name:"",
				type:"children",
				url:""
			}]
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
			.post(`${BACKENDAPI}/v1.0/menus`, { ...formData })
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

			apiClient().get(`${BACKENDAPI}/v1.0/menus/${props.value.id}`)
			.then((response: any) => {
				console.log(response.data)
			const {id,name,url,type,is_active,children} = 	response.data.data
               setFormData({
				...formData,
id,
name,
url,
type,
is_active,
children


			   })

			})
			.catch(err => {
				console.log(err.response)
			})

			
		}
	}, []);
	const updateData = () => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/menus`, { ...formData })
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
	const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let index: number = parseInt(e.target.name.split(".")[1])
		let name: string = e.target.name.split(".")[2]

		const tempValues = JSON.parse(JSON.stringify(formData.children))
		tempValues[index][name] = e.target.value;
		setFormData({ ...formData, children: tempValues });
	};
	const deleteChildren = (index: number) => {

		const tempValues = [...formData.children]

		// if(tempValues.length > 1){
		// 	tempValues.pop()
		// }
		tempValues.splice(index, 1);

		setFormData({ ...formData, children: tempValues });

	};
	const AddChildren = () => {

		const tempValues = [...formData.children]
		
		
		
			tempValues.push({
				name:"",
				type:"children",
				url:""
			})

			setFormData({ ...formData, children: tempValues });
		

	};
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
					value={formData.type}
					disabled={props.type == "update"}
					
					>
					<option value="single">single</option>
					<option value="dropdown">dropdown</option>
				</select>

				{errors?.type && (
					<div className="invalid-feedback">
						{errors.type[0]}
					</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
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
				<label htmlFor="url" className="form-label">
				Url
				</label>
				<input
					type="text"
					className={
						errors
							? errors.url
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="url"
					name="url"
					onChange={handleChange}
					value={formData.url}
				/>
				{errors?.url && (
					<div className="invalid-feedback">{errors.url[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="is_active" className="form-label">
					Active
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
					<option value="1">active</option>
					<option value="0">inactive</option>
				</select>

				{errors?.is_active && (
					<div className="invalid-feedback">
						{errors.is_active[0]}
					</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
		
			<br />
			<br />
			{/* children */}
			{
formData.type == "dropdown"?(
	<>
	<div className="row mt-5">
				<h4 className="text-center">
					Children
				</h4>
			</div>
		<div className="row">
				<div className="col-md-12 ">


					<div className="row">
						

						<div className="col-md-3">Name</div>
						<div className="col-md-3">Type</div>
						<div className="col-md-3">URL</div>
						<div className="col-md-3">Action</div>


					</div>


					{
						formData.children.map((el, index) => {
							console.log(formData.children[index].name)
							return (
								<div className="row mt-4 mb-4" key={index}>
									{/* colors */}
							

									{/* children name */}
									<div className="col-md-3">
										<input
											type="text"
											className={
												errors
													? errors[`children.${index}.name`]
														? `form-control is-invalid`
														: `form-control is-valid`
													: "form-control"
											}
											id={`children.${index}.name`}
											name={`children.${index}.name`}
		
											onChange={handleChildrenChange}
											value={formData.children[index].name}
										/>


										{errors && (
											<>
												{
													errors[`children.${index}.name`] ? (<div className="invalid-feedback">This field is required</div>) : (<div className="valid-feedback">Looks good!</div>)

												}

											</>

										)}



									</div>
									{/* end children name*/}
									{/* children type */}
									<div className="col-md-3">
										<input
											type="text"
											className={
												errors
													? errors[`children.${index}.type`]
														? `form-control is-invalid`
														: `form-control is-valid`
													: "form-control"
											}
											id={`children.${index}.type`}
											name={`children.${index}.type`}
		                                    readOnly
											onChange={handleChildrenChange}
											value={formData.children[index].type}
										/>


										{errors && (
											<>
												{
													errors[`children.${index}.type`] ? (<div className="invalid-feedback">This field is required</div>) : (<div className="valid-feedback">Looks good!</div>)

												}

											</>

										)}



									</div>
									{/* end children type*/}
									{/* children url */}
									<div className="col-md-3">
										<input
											type="text"
											className={
												errors
													? errors[`children.${index}.url`]
														? `form-control is-invalid`
														: `form-control is-valid`
													: "form-control"
											}
											id={`children.${index}.url`}
											name={`children.${index}.url`}
		
											onChange={handleChildrenChange}
											value={formData.children[index].url}
										/>


										{errors && (
											<>
												{
													errors[`children.${index}.url`] ? (<div className="invalid-feedback">This field is required</div>) : (<div className="valid-feedback">Looks good!</div>)

												}

											</>

										)}



									</div>
									{/* end children url*/}
									<div className="col-md-3">

										<button className="btn btn-danger " type="button" onClick={() => {
											deleteChildren(index)
										}}>-</button>

									</div>
									<br />
								</div>


							)
						})
					}




				</div>
				<div className="row">
					<div className="col-md-8 offset-2">
						<div className="text-center">

							<button className="btn btn-primary" type="button" onClick={() => AddChildren()}>+</button>

						</div>
					</div>
				</div>
			</div>
	</>
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

export default AddMenuForm;

import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";

interface FormData {
	id: string;
	name: string;
	option_value_template:TemplateValue[]
	
}
interface TemplateValue {
	id: string;
	name: string;
	variation_template_id: string;
	

}

const AddOtionTemplateForm: React.FC<UpdateFormInterface> = (props:any) => {
	console.log(props)
	const [formData, setFormData] = useState<FormData>({
		id:"",
	name: "",
	option_value_template:[
		{
			id:"",
			name:"",
			variation_template_id:""
		}
	]
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
	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let index:number = parseInt(e.target.name.split(".")[1])
		console.log(index)
		const tempValues = [...formData.option_value_template]
	
		tempValues[index].name = e.target.value;
		setFormData({ ...formData,option_value_template:tempValues });
	};
	
	const AddValue = () => {

		const tempValues = [...formData.option_value_template]
		tempValues.push({
			id:"",
			name:"",
			variation_template_id:formData.id
		})
		
		setFormData({ ...formData,option_value_template:tempValues });
	};
	const deleteValue = () => {

		const tempValues = [...formData.option_value_template]
	
		if(tempValues.length > 1){
			tempValues.pop()
		}
		setFormData({ ...formData,option_value_template:tempValues });
		
	};
	
	const resetFunction = () => {
		setFormData({
			id:"",
			name: "",
			option_value_template:[
				{
					id:"",
					name:"",
					variation_template_id:""
				}
			]
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
			.post(`${BACKENDAPI}/v1.0/options`, { ...formData })
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
		else if(props.type == "duplicate"){
			apiClient()
			.get(`${BACKENDAPI}/v1.0/options/${props.value}`)
			.then((response:any) => {
				console.log(response.data.data);
				setFormData(response.data.data);
			})
			.catch((error) => {
				console.log(error.response);
			
			});
		}
	}, []);
	const updateData = () => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/options`, { ...formData })
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
		
			<div className="col-md-4 offset-4">
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
		
	
		<div className="col-md-4 offset-4">
				<label htmlFor="variation_value_template" className="form-label">
					 Values
				</label>
				{
					formData.option_value_template.map( (el,index) => {
						return (
					<>
				
					<input
					type="text"
					className={
						errors
							? errors[`variation_value_template.${index}.name`]
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id={`variation_value_template.${index}.name`}
					name={`variation_value_template.${index}.name`}
				
					onChange={handleValueChange}
					value={formData.option_value_template[index].name}
				/>
				
			
				{errors && (
				<>	
				{
					errors[`variation_value_template.${index}.name`] ? (<div className="invalid-feedback">This field is required</div>):(<div className="valid-feedback">Looks good!</div>)

				}
				
				</>
					
				)}
			

				<br/>
					</>
					)})
				}
			
		

			</div>
			
			<div className="text-center">
			<button className="btn btn-danger me-2" 	type="button" onClick={deleteValue}>-</button>	
			<button className="btn btn-primary" 	type="button" onClick={AddValue}>+</button>
			
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

export default AddOtionTemplateForm;

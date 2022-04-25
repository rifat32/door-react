import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";


interface FormData {
	id:string;
	name: string;
	category_id: string;
	sku: string;
	description: string;
	type: string;
	price: string;
	qty: string;
	variation:Variation[];
    image:"";
	images:string[];

}
interface Variation {
	variation_template_id:string;
	variation_value_template:any;
}
const AddProductForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
		id:"",
		name: "",
		description: "",
		sku: "",
		type: "single",
		category_id: "",
		price: "",
		qty: "",
		variation:[
			{
				variation_template_id:"",
				variation_value_template:[],

			}
		],
	    image: "",
		images:[]
	});
	const [imageFile, setImageFile] = useState<any>();
	const [categories, setCategories] = useState([]);
	const [variationTemplates, setVariationTemplates] = useState<any>([]);
	const [productTypes, setProductTypes] = useState([
		{
			id:1,
			value:"single"
		},
		{
			id:1,
			value:"variable"
		}
	]);
	const [errors, setErrors] = useState<any>(null);

	useEffect(() => {
		loadCategories();
		loadVariationTemplates();
	}, []);
	// pagination required
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
	const loadVariationTemplates = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/variation-templates/all`)
			.then((response: any) => {
				console.log(response);
				setVariationTemplates(response.data.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	
		if (!e.target.files) {
			return;
		  }
		 
		let file = e.target.files[0]
		setImageFile(file)

            let data:any = new FormData();
            data.append('image', file, file.name);
            apiClient().post(`${BACKENDAPI}/v1.0/image/upload/single/product`, data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
			.then((response: any) => {
				console.log(response);
			setFormData((prevData)=> {
return {
	...prevData,
	image:response.data.image
}
			})
			})
			.catch((error) => {
				console.log(error.response);
			});

		
	  };
	  const handleMultipleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	
		if(!e.target.files) {
			return;
		  }
const tempImages:string[] = [];

let files:any = e.target.files
for (var i = 0; i < files.length; i++) 
{
	let data:any = new FormData();
	data.append('image', e.target.files[i], e.target.files[i].name);
	apiClient().post(`${BACKENDAPI}/v1.0/image/upload/single/product`, data, {
		headers: {
			'accept': 'application/json',
			'Accept-Language': 'en-US,en;q=0.8',
			'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
		}
	})
	.then((response: any) => {
		console.log(response);
	tempImages.push(response.data.image)
	if(i = files.length -1 ){
		setFormData((prevData)=> {
			return {
				...prevData,
				images:[...tempImages]
			}
						})
	}
	})
	.catch((error) => {
		console.log(error.response);
	});
}


		 
		
	

        

		
	  };
	  
	const handleVariationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if(!e.target.value){
			return;
		}
		let index:number = parseInt(e.target.name.split(".")[1])
		console.log(index)
	
		const tempValues =  JSON.parse(JSON.stringify(formData.variation)) 
	
		tempValues[index].variation_template_id = e.target.value;
		tempValues[index].id = 0;
		
    let variationTemlateIndex =  variationTemplates.findIndex((el:any) => {
		 return  el.id == e.target.value;
	   })

	   let variation_value_template = variationTemplates[variationTemlateIndex].variation_value_template.map((el:any) => {
		el.id = 0
         el.price = 0;
		 el.qty = 0;
		 return el;
	   })

	   tempValues[index].variation_value_template = variation_value_template;
	   console.log(tempValues)
 
		setFormData({ ...formData,variation:tempValues });

	};
	const handleVariationPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		let index:number = parseInt(e.target.name.split(".")[1])
		let vindex:number = parseInt(e.target.name.split(".")[3])
		console.log(index,vindex)
	

		const tempValues =  JSON.parse(JSON.stringify(formData.variation)) 
	
	  console.log(tempValues)
		tempValues[index].variation_value_template[vindex].price = e.target.value;
		setFormData({ ...formData,variation:tempValues });

	};
	const handleVariationValueDelete = (index:number,vindex:number) => {
		if (window.confirm("Are you sure  want to delete ?")) {
			console.log(index,vindex)
			if (props.type === "update") {
				
				apiClient()
				.delete(`${BACKENDAPI}/v1.0/products/${formData.variation[index].variation_value_template[vindex].id}`)
				.then((response: any) => {
					console.log(response)
					console.log(formData.variation[index].variation_value_template[vindex].id)
				})
				.catch((error) => {
					console.log(error.response);
				});
			}

			const tempVariation =  JSON.parse(JSON.stringify(formData.variation)) 
		
		  console.log(tempVariation)
		  
		 const tempValue =	tempVariation[index].variation_value_template.filter((el:any,indx:number) => {
			
				// if(indx == vindex) {
				// 	console.log("ffff",indx,vindex)
				//    return el;
				// }
				return indx !== vindex;
			});
			tempVariation[index].variation_value_template = tempValue
			
			 setFormData({ ...formData,variation:tempVariation });
		}
	
	};
	const handleVariationValueAdd = (index:number) => {

	
	
	

		const tempVariation =  JSON.parse(JSON.stringify(formData.variation)) 
	
	  console.log(tempVariation)
	tempVariation[index].variation_value_template.push({
id:0,
		name:"dummy",
		price:0,
		qty:0
	})
	
		
		 setFormData({ ...formData,variation:tempVariation });

	};
	const handleVariationQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		let index:number = parseInt(e.target.name.split(".")[1])
		let vindex:number = parseInt(e.target.name.split(".")[3])
		console.log(index,vindex)
	

		const tempValues =  JSON.parse(JSON.stringify(formData.variation)) 
	
	  console.log(tempValues)
		tempValues[index].variation_value_template[vindex].qty = e.target.value;
		setFormData({ ...formData,variation:tempValues });

	};
	const AddVariation = () => {

		const tempValues =  JSON.parse(JSON.stringify(formData.variation)) 
		tempValues.push(
			{
				variation_template_id:"",
				variation_value_template:[],

			}
		)
		
		setFormData({ ...formData,variation:tempValues });
	};
	const resetFunction = () => {
		setFormData({
			id:"",
			name: "",
		description: "",
		sku: "",
		type: "single",
		category_id: "",
		price: "",
		qty: "",
		variation:[
			{
				variation_template_id:"",
				variation_value_template:[]
		}
		],
	 image: "",
	 images:[]
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
	const invalidInputHandler = (error:any) => {
		if (error.status === 422) {
			setErrors(error.data.errors);
		}
	}
	const createData = () => {
	
	

		apiClient()
			.post(`${BACKENDAPI}/v1.0/products`, { ...formData},
				)
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
	const loadProduct = (id:string) => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/products/${id}`)
			.then((response: any) => {
				console.log(response);
				const {id,name,category_id,sku,description,type,product_variations,variations,image} = response.data.product

				
				
              let price = "";
			  let qty = "";
			  let tempVariation = []
				if(type === "single"){
                   price = variations[0].price
				   qty = variations[0].qty
				} else {
					tempVariation = product_variations.map((el:any) => {

			


					
						el.variation_value_template = el.variations.map((el2:any) => {
						 return el2;
							 })
							return el
					   
					   })
				}
			

				console.log(tempVariation)


				setFormData({
				...formData,
				id,
				name,
				category_id,
				sku,
				description,
				type,
				price,
				qty,
				variation:tempVariation,
				image
				})
				// setCategories(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		if (props.type == "update") {
			console.log(props.value)
			loadProduct(props.value.id)
			
			return
			setFormData(props.value);
		}
	}, []);
	const updateData = () => {
		apiClient()
			.put(`${BACKENDAPI}/v1.0/products`, { ...formData })
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
					Product Name
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
				<label htmlFor="sku" className="form-label">
					SKU
				</label>
				<input
					type="text"
					className={
						errors
							? errors.sku
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="sku"
					name="sku"
					onChange={handleChange}
					value={formData.sku}
				/>
				{errors?.sku && (
					<div className="invalid-feedback">{errors.sku[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>

		
			<div className="col-md-12">
				<label htmlFor="description" className="form-label">
					Description
				</label>
			
				<textarea
				 rows={6}
					className={
						errors
							? errors.description
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="description"
					name="description"
					onChange={handleTextAreaChange}
					value={formData.description}
				>
					</textarea>
				{errors?.description && (
					<div className="invalid-feedback">{errors.description[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="sku" className="form-label">
				 {imageFile?.name?imageFile.name:"upload image"}
				</label>
				<br />
				{imageFile && 	<img src={URL.createObjectURL(imageFile)} alt="..." height={100} width={100} />}
	
				<input
					type="file"
					className={
						errors
							? errors.image
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="image"
					name="image"
					onChange={handleImageChange}
			
				/>
				{errors?.image && (
					<div className="invalid-feedback">{errors.image[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="images" className="form-label">
				Upload multiple Image
				</label>
				
	
				<input
					type="file"
					className={
						errors
							? errors.images
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="images"
					name="images"
					onChange={handleMultipleImageChange}
					multiple
			
				/>
				{errors?.images && (
					<div className="invalid-feedback">{errors.images[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="category_id" className="form-label">
					Product Type
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
					disabled={props.type === "update"}
					>
				
					{productTypes.map((el: any, index) => (
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
			{
				formData.type === "single"?(<div className="col-md-4">
				<label htmlFor="price" className="form-label">
					Price
				</label>
				<input
					type="number"
					className={
						errors
							? errors.price
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="price"
					name="price"
					onChange={handleChange}
					value={formData.price}
				/>
				{errors?.price && (
					<div className="invalid-feedback">{errors.price[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>):(null)
			}
			{
				formData.type === "single"?(<div className="col-md-4">
				<label htmlFor="qty" className="form-label">
					Quantity
				</label>
				<input
					type="number"
					className={
						errors
							? errors.qty
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="qty"
					name="qty"
					onChange={handleChange}
					value={formData.qty}
				/>
				{errors?.qty && (
					<div className="invalid-feedback">{errors.qty[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>):(null)
			}
			{
				formData.type === "variable"?(<div className="col-md-10 offset-md-1">
				{/* head */}
				<div className="row mb-2 ">
					<div className="col-md-2 bg-success me-1">
					 <div className="text-light">Variation</div>
					</div>
					<div className="col-md-9 bg-success ">
					<div className="text-light">Variation Values</div>
					</div>
				</div>
				{/* head 2 */}
				{
					formData.variation.map((el,index) => {
					  return (<div className="row ">
					  <div className="col-md-2  me-1">
					  <div className="">
					  
					  <select
						  className={
							  errors
								  ? errors[`variation.${index}.variation_template_id`]
									  ? `form-control is-invalid`
									  : `form-control is-valid`
								  : "form-control"
						  }
						  id={`variation.${index}.variation_template_id`}
						  name={`variation.${index}.variation_template_id`}
						  onChange={handleVariationSelect}
						  value={formData.variation[index].variation_template_id}>
						  <option value="">Please Select</option>
						  {variationTemplates.map((el: any, index:any) => (
							  <option
								  key={index}
								  value={el.id}
								  style={{ textTransform: "uppercase" }}>
								  {el.name}
							  </option>
						  ))}
					  </select>
					  {errors && (
				<>	
				{
					errors[`variation.${index}.variation_template_id`] ? (<div className="invalid-feedback">This field is required</div>):(<div className="valid-feedback">Looks good!</div>)

				}
				
				</>
					
				)}
					 
				  </div>
					  </div>
					  <div className="col-md-9 ">
					  <div className="row ">
									<div className="col-md-3 me-1   text-light bg-primary">Value</div>
									<div className="col-md-3 me-1 text-light bg-primary">Price</div>
									<div className="col-md-3 me-1 text-light bg-primary">Quantity</div>
									<div className="col-md-2">
								<button className="btn  btn-primary"
								//  style={{height:"0.1rem"}}
								  	type="button" onClick={() => handleVariationValueAdd(index)}>+</button>	
								</div>
								 </div>
						{
							el.variation_value_template.length?(
								el.variation_value_template.map((elv:any,vindex:any) => {
									return 	(<div className="row mt-2">
									<div className="col-md-3 me-1 ">{elv.name}</div>

	{/* price start */}

									<div className="col-md-3 me-1">
								
					<input
						type="number"
						className={
							errors
								? errors[`variation.${index}.variation_value_template.${vindex}.price`]
									? `form-control is-invalid`
									: `form-control is-valid`
								: "form-control"
						}
						id={`variation.${index}.variation_value_template.${vindex}.price`}
						name={`variation.${index}.variation_value_template.${vindex}.price`}
						onChange={handleVariationPriceChange}
						value={formData.variation[index].variation_value_template[vindex].price}
					/>
					
					
					{errors && (
				<>	
				{
					errors[`variation.${index}.variation_value_template.${vindex}.price`] ? (<div className="invalid-feedback">This field is required</div>):(<div className="valid-feedback">Looks good!</div>)

				}
				
				</>
					
				)}
					
					
					
					</div>
					{/* price end */}
	{/* quantity start */}
					<div className="col-md-3 me-1">
								
								<input
									type="number"
									className={
										errors
											? errors[`variation.${index}.variation_value_template.${vindex}.qty`]
												? `form-control is-invalid`
												: `form-control is-valid`
											: "form-control"
									}
									id={`variation.${index}.variation_value_template.${vindex}.qty`}
									name={`variation.${index}.variation_value_template.${vindex}.qty`}
									onChange={handleVariationQtyChange}
									value={formData.variation[index].variation_value_template[vindex].qty}
								/>
								
								
								{errors && (
							<>	
							{
								errors[`variation.${index}.variation_value_template.${vindex}.qty`] ? (<div className="invalid-feedback">This field is required</div>):(<div className="valid-feedback">Looks good!</div>)
			
							}
							
							</>
								
							)}
								
								
								
								</div>
{/* quantity end */}

								<div className="col-md-2">
								<button className="btn  btn-danger"
								//  style={{height:"0.1rem"}}
								  	type="button" onClick={() => handleVariationValueDelete(index,vindex)}>-</button>	
								</div>




								 </div>)
								})
							):(null)
						}
							 
				
						 
					  
					  </div>
				  </div>)
					})
				}
				
			</div>):(null)
			}
			{
				formData.type === "variable"?(<div className="text-center">
		
				<button className="btn btn-primary" 	type="button" onClick={AddVariation}>+</button>
				
				</div>):(null)
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

export default AddProductForm;

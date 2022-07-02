import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { ErrorMessage } from "../../../utils/ErrorMessage";


interface FormData {
	id: string;
	name: string;
	category_id: string;
	style_id: string;
	sku: string;
	description: string;
	type: string;
	price: string;
	qty: string;
	status: string;
	variation: Variation[];
	image: "";
	is_featured: string;
	images: string[];
	colors: Colors[];
	length_lower_limit:string;
	length_upper_limit:string;

}
interface Variation {
	id: String;
	variation_template_id: string;
	color_id: string;
	variation_value_template: any;
}
interface Colors {
	id: string;
	name: string;
	code: string;
	color_id: string;
	color_image: string,
	is_variation_specific: boolean,
}
const AddProductForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
		id: "",
		name: "",
		description: "",
		sku: "",
		type: "single",
		category_id: "",
		style_id: "",
		price: "",
		qty: "",
		status: "active",
		is_featured: "0",
		variation: [
			{
				id: "0",
				variation_template_id: "",
				color_id: "",
				variation_value_template: [],

			}
		],
		image: "",
		images: [],
		colors: [
			{
				id: "",
				name: "",
				code: "",

				color_id: "",
				color_image: "",
				is_variation_specific: false
			}
		],
	length_lower_limit:"",
	length_upper_limit:"",

	});
	const [imageFile, setImageFile] = useState<any>();
	const [categories, setCategories] = useState([]);
	const [styles, setStyles] = useState([]);

	const [colors, setColors] = useState([]);
	const [options, setOptions] = useState<any>([]);
	
	const [variationTemplates, setVariationTemplates] = useState<any>([]);
	const [productTypes, setProductTypes] = useState([
		{
			id: 1,
			value: "single"
		},
		{
			id: 1,
			value: "variable"
		}
	]);
	const [errors, setErrors] = useState<any>(null);

	useEffect(() => {
		loadCategories();
		loadStyles();
		loadVariationTemplates();
		loadColors();
		loadOptions();
	}, []);
 const	handleOptionChecked = (e:React.ChangeEvent<HTMLInputElement>) => {
          const tempOptions = JSON.parse(JSON.stringify(options))
		  tempOptions.map((el:any) => {
			if(el.id == e.target.value){
				el.selected = e.target.checked
			}
            return el
		  })
		  setOptions(tempOptions)
 }
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
	const loadStyles = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/styles/all`)
			.then((response: any) => {
				console.log(response);
				setStyles(response.data.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const loadColors = () => {

		apiClient()
			.get(`${BACKENDAPI}/v1.0/colors/all`)
			.then((response: any) => {
				console.log(response);
				setColors(response.data.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const loadOptions= () => {

		apiClient()
			.get(`${BACKENDAPI}/v1.0/options/all`)
			.then((response: any) => {
				console.log(response);
				const tempData = response.data.data.map((el:any) => {
					el.selected = false;
              return el;
				})
				setOptions(tempData);
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

		let data: any = new FormData();
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
				setFormData((prevData) => {
					return {
						...prevData,
						image: response.data.image
					}
				})
			})
			.catch((error) => {
				console.log(error.response);
			});


	};
	const handleMultipleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		if (!e.target.files) {
			return;
		}
		const tempImages: string[] = [];

		let files: any = e.target.files
		for (var i = 0; i < files.length; i++) {
			let data: any = new FormData();
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
					if (i = files.length - 1) {
						setFormData((prevData) => {
							return {
								...prevData,
								images: [...tempImages]
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
		if (!e.target.value) {
			return;
		}
		let index: number = parseInt(e.target.name.split(".")[1])
		console.log(index)

		const tempValues = JSON.parse(JSON.stringify(formData.variation))

		tempValues[index].variation_template_id = e.target.value;
		tempValues[index].color_id = formData.variation[index].color_id;
		tempValues[index].id = 0;

		let variationTemlateIndex = variationTemplates.findIndex((el: any) => {
			return el.id == e.target.value;
		})

		let variation_value_template = variationTemplates[variationTemlateIndex].variation_value_template.map((el: any) => {
			el.id = 0
			el.price = 0;
			el.qty = 0;
			el.sub_sku = "";
			return el;
		})

		tempValues[index].variation_value_template = variation_value_template;
		console.log(tempValues)

		setFormData({ ...formData, variation: tempValues });

	};
	const [colorToggle, setColorToggle] = useState("test")

	const handleVariationColorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {

		// if(!e.target.value){
		// 	return;
		// }



		let index: number = parseInt(e.target.name.split(".")[1])
		console.log(index)

		const tempValues = JSON.parse(JSON.stringify(formData.variation))

		tempValues[index].color_id = e.target.value;
		tempValues[index].variation_template_id = formData.variation[index].variation_template_id;
		tempValues[index].id = formData.variation[index].id;

		// let variationTemlateIndex =  variationTemplates.findIndex((el:any) => {
		// 	 return  el.id == e.target.value;
		//    })

		//    let variation_value_template = variationTemplates[variationTemlateIndex].variation_value_template.map((el:any) => {
		// 	el.id = 0
		//      el.price = 0;
		// 	 el.qty = 0;
		// 	 el.sub_sku = "";
		// 	 return el;
		//    })

		//    tempValues[index].variation_value_template = variation_value_template;
		//    console.log(tempValues)


		setColorToggle(e.target.value)



		setFormData({ ...formData, variation: tempValues });




	};
	useEffect(() => {
		// window.alert(colorToggle)
		if (colorToggle != "test") {
			AddColor(colorToggle, true)
		}
	}, [colorToggle])

	const handleVariationValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		let index: number = parseInt(e.target.name.split(".")[1])
		let vindex: number = parseInt(e.target.name.split(".")[3])
		let name: string = e.target.name.split(".")[4]
		console.log(index, name)


		const tempValues = JSON.parse(JSON.stringify(formData.variation))

		console.log(tempValues)
		tempValues[index].variation_value_template[vindex][name] = e.target.value;
		setFormData({ ...formData, variation: tempValues });

	};
	const handleVariationValueDelete = (index: number, vindex: number) => {
		if (window.confirm("Are you sure  want to delete ?")) {
			console.log(index, vindex)
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

			const tempVariation = JSON.parse(JSON.stringify(formData.variation))

			console.log(tempVariation)

			const tempValue = tempVariation[index].variation_value_template.filter((el: any, indx: number) => {

				// if(indx == vindex) {
				// 	console.log("ffff",indx,vindex)
				//    return el;
				// }
				return indx !== vindex;
			});
			tempVariation[index].variation_value_template = tempValue

			setFormData({ ...formData, variation: tempVariation });
		}

	};
	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let index: number = parseInt(e.target.name.split(".")[1])
		let name: string = e.target.name.split(".")[2]

		const tempValues = JSON.parse(JSON.stringify(formData.colors))
		tempValues[index][name] = e.target.value;
		setFormData({ ...formData, colors: tempValues });
	};
	const handleColorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		if (!e.target.files) {
			return;
		}

		let file = e.target.files[0]
		setImageFile(file)

		let data: any = new FormData();
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

				let index: number = parseInt(e.target.name.split(".")[1])
				let name: string = e.target.name.split(".")[2]



				const tempValues = JSON.parse(JSON.stringify(formData.colors))
				tempValues[index][name] = response.data.image;
				setFormData({ ...formData, colors: tempValues });







			})
			.catch((error) => {
				console.log(error.response);
			});


	};
	const handleColorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let index: number = parseInt(e.target.name.split(".")[1])

		let value = e.target.value

		if (value) {
			let color: any = colors.find((el: any) => {
				return parseInt(el.id) == parseInt(value)
			})

			const tempValues = JSON.parse(JSON.stringify(formData.colors))

			tempValues[index].id = "";
			tempValues[index].name = color.name;
			tempValues[index].code = color.code;
			tempValues[index].color_id = color.id;

			setFormData({ ...formData, colors: tempValues });
		}

	};
	const AddColor = (color_id: string, is_variation_specific = false) => {

		const tempValues = [...formData.colors]
		let colorFound = false
		tempValues.map((el: any) => {
			if (el.color_id == color_id) {
				colorFound = true
			}
		})
		if (!colorFound) {
			tempValues.push({
				id: "",
				name: "",
				code: "",
				color_id: color_id,
				color_image: "",
				is_variation_specific: is_variation_specific
			})

			setFormData({ ...formData, colors: tempValues });
		}

	};
	const deleteColor = (index: number) => {

		const tempValues = [...formData.colors]

		// if(tempValues.length > 1){
		// 	tempValues.pop()
		// }
		tempValues.splice(index, 1);

		setFormData({ ...formData, colors: tempValues });

	};
	const handleVariationValueAdd = (index: number) => {


		const tempVariation = JSON.parse(JSON.stringify(formData.variation))

		console.log(tempVariation)
		tempVariation[index].variation_value_template.push({
			id: 0,
			name: "dummy",
			price: 0,
			qty: 0,
			sub_sku: ""
		})


		setFormData({ ...formData, variation: tempVariation });

	};
	const handleVariationDelete = (index: number) => {


		const tempVariation = JSON.parse(JSON.stringify(formData.variation))

		tempVariation.splice(index, 1)


		setFormData({ ...formData, variation: tempVariation });

	};





	const AddVariation = () => {

		const tempValues = JSON.parse(JSON.stringify(formData.variation))
		tempValues.push(
			{
				variation_template_id: "",
				color_id: "",
				variation_value_template: [],

			}
		)

		setFormData({ ...formData, variation: tempValues });
	};
	const resetFunction = () => {
		setFormData({
			id: "",
			name: "",
			description: "",
			sku: "",
			type: "single",
			category_id: "",
			style_id: "",
			price: "",
			qty: "",
			status: "active",
			is_featured: "0",
			variation: [
				{
					id: "0",
					variation_template_id: "",
					color_id: "",
					variation_value_template: []
				}
			],
			image: "",
			images: [],
			colors: [
				{
					id: "",
					name: "",
					code: "",
					color_id: "",
					color_image: "",
					is_variation_specific: false
				}
			],
	length_lower_limit:"",
	length_upper_limit:"",
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
	const invalidInputHandler = (error: any) => {
		if (error.status === 422) {
			setErrors(error.data.errors);
		}
	}
	const createData = () => {

		//    check color
		let tempFormData = JSON.parse(JSON.stringify(formData));

		if (formData.colors.length <= 1) {
			if (!formData.colors[0].color_id) {
				console.log(formData.colors[0])
				tempFormData.colors = []

			}

		}

		const tempOptions = options.filter((el:any) => {
			return el.selected === true
		})

		apiClient()
			.post(`${BACKENDAPI}/v1.0/products`, { ...tempFormData,options:tempOptions },
		)
			.then((response) => {
				console.log(response);
				toast.success("Data saved");
				// resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
				invalidInputHandler(error.response)
				ErrorMessage(error.response)
			});
	};
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	// edit data section
	const loadProduct = (id: string) => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/products/${id}`)
			.then((response: any) => {
				console.log(response);
				const { id, name, category_id, style_id, sku, description, type, product_variations, variations, image, colors, status, is_featured,options:productOptions
					,
					length_lower_limit,
					length_upper_limit,
				
				
				} = response.data.product

				
			apiClient()
			.get(`${BACKENDAPI}/v1.0/options/all`)
			.then((response: any) => {
				console.log(response);
				const tempData = response.data.data.map((el:any) => {
				productOptions.map((el2:any) => {
                     if(el2.option_id == el.id) {
						el.selected = true
					 }
				})
              return el;
				})
				setOptions(tempData);
			})
			.catch((error) => {
				console.log(error.response);
			});
		





				let price = "";
				let qty = "";
				let tempVariation = []
				if (type === "single") {
					price = variations[0].price
					qty = variations[0].qty

				} else {
					tempVariation = product_variations.map((el: any) => {





						el.variation_value_template = el.variations.map((el2: any) => {
							return el2;
						})
						return el

					})
				}


				console.log(tempVariation)
				let tempColors = colors.map((el: any) => {
					el.name = el.color.name
					el.code = el.color.code
					return el;
				})


				setFormData({
					...formData,
					id,
					name,
					category_id,
					style_id,
					sku,
					description,
					type,
					price,
					qty,
					variation: tempVariation,
					image,
					colors: tempColors,
					status,
					is_featured,
					length_lower_limit,
					length_upper_limit
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
		const tempOptions = options.filter((el:any) => {
			return el.selected === true
		})

		apiClient()
			.put(`${BACKENDAPI}/v1.0/products`, { ...formData,options:tempOptions })
			.then((response: any) => {
				console.log(response);
				toast.success("Data Updated");

				// props.updateDataStates(response.data.data);
				// props.showModal(false);
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
				<label htmlFor="style_id" className="form-label">
					Style
				</label>
				<select
					className={
						errors
							? errors.style_id
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="style_id"
					name="style_id"
					onChange={handleSelect}
					value={formData.style_id}>
					<option value="">Please Select</option>
					{styles.map((el: any, index) => (
						<option
							key={index}
							value={el.id}
							style={{ textTransform: "uppercase" }}>
							{el.name}
						</option>
					))}
				</select>
				{errors?.style_id && (
					<div className="invalid-feedback">{errors.style_id[0]}</div>
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
			<div className="col-md-4">
				<label htmlFor="status" className="form-label">
					Status
				</label>
				<select
					className={
						errors
							? errors.status
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="status"
					name="status"
					onChange={handleSelect}
					value={formData.status}>
					<option value="active">active</option>
					<option value="inactive">inactive</option>
					<option value="draft">draft</option>

				</select>
				{errors?.category_id && (
					<div className="invalid-feedback">{errors.category_id[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="is_featured" className="form-label">
					Featured Product
				</label>
				<select
					className={
						errors
							? errors.is_featured
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="is_featured"
					name="is_featured"
					onChange={handleSelect}
					value={formData.is_featured}>
					<option value={1}>yes</option>
					<option value={0}>no</option>
				</select>
				{errors?.is_featured && (
					<div className="invalid-feedback">{errors.is_featured[0]}</div>
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
					{imageFile?.name ? imageFile.name : "upload image"}
				</label>
				<br />
				{imageFile && <img src={URL.createObjectURL(imageFile)} alt="..." height={100} width={100} />}

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
				formData.type === "single" ? (<div className="col-md-4">
					<label htmlFor="price" className="form-label">
						Price
					</label>
					<input
						type="text"
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
				</div>) : (null)
			}
			{
				formData.type === "single" ? (<div className="col-md-4">
					<label htmlFor="qty" className="form-label">
						Quantity
					</label>
					<input
						type="text"
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
				</div>) : (null)
			}
			{
				formData.type === "variable" ? (<div className="col-md-10 offset-md-1">
					{/* head */}
					<div className="row mb-2 ">
						<div className="col-md-2 bg-success ">
							<div className="text-light">Color</div>
						</div>
						<div className="col-md-2 bg-success ">
							<div className="text-light">Height</div>
						</div>
						<div className="col-md-8 bg-success ">
							<div className="text-light">Variation Values</div>
						</div>
					</div>
					{/* head 2 */}
					{
						formData.variation.map((el, index) => {
							return (<div className="row " key={index}>
								{/* Color Start */}
								<div className="col-md-2 ">
									<div className="">

										<select
											className={
												errors
													? errors[`variation.${index}.color_id`]
														? `form-control is-invalid`
														: `form-control is-valid`
													: "form-control"
											}
											id={`variation.${index}.color_id`}
											name={`variation.${index}.color_id`}
											onChange={handleVariationColorSelect}
											value={formData.variation[index].color_id}>
											<option value="">Please Select</option>
											{colors.map((el: any, index) => (
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
													errors[`variation.${index}.color_id`] ? (<div className="invalid-feedback">This field is required</div>) : (<div className="valid-feedback">Looks good!</div>)

												}

											</>

										)}

									</div>
								</div>
								{/* height Start */}
								<div className="col-md-2">
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
											{variationTemplates.map((el: any, index: any) => (
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
													errors[`variation.${index}.variation_template_id`] ? (<div className="invalid-feedback">This field is required</div>) : (<div className="valid-feedback">Looks good!</div>)

												}

											</>

										)}

									</div>
								</div>
								<div className="col-md-8">
									<div className="row ">
										<div className="col-md-2 me-1   text-light bg-primary">Width</div>
										<div className="col-md-2  me-1 text-light bg-primary">Price</div>
										<div className="col-md-2 me-1  text-light bg-primary">Quantity</div>
										<div className="col-md-2  me-1
									 text-light bg-primary">Sku</div>
										<div className="col-md-3">
											<button className="btn  btn-primary"
												//  style={{height:"0.1rem"}}
												type="button" onClick={() => handleVariationValueAdd(index)}>+</button>
											<button className="btn  btn-danger"
												//  style={{height:"0.1rem"}}
												type="button" onClick={() => handleVariationDelete(index)}>-</button>
										</div>
									</div>
									{
										el.variation_value_template.length ? (
											el.variation_value_template.map((elv: any, vindex: any) => {
												return (<div className="row mt-2">
													{/* name start */}

													<div className="col-md-2 me-1">

														<input
															type="text"
															className={
																errors
																	? errors[`variation.${index}.variation_value_template.${vindex}.name`]
																		? `form-control is-invalid`
																		: `form-control is-valid`
																	: "form-control"
															}
															id={`variation.${index}.variation_value_template.${vindex}.name`}
															name={`variation.${index}.variation_value_template.${vindex}.name`}
															onChange={handleVariationValueChange}
															value={formData.variation[index].variation_value_template[vindex].name}
														/>


														{errors && (
															<>
																{
																	errors[`variation.${index}.variation_value_template.${vindex}.name`] ? (<div className="invalid-feedback">This field is required</div>) : (<div className="valid-feedback">Looks good!</div>)

																}

															</>

														)}



													</div>
													{/* name end */}

													{/* price start */}

													<div className="col-md-2 me-1">

														<input
															type="text"
															className={
																errors
																	? errors[`variation.${index}.variation_value_template.${vindex}.price`]
																		? `form-control is-invalid`
																		: `form-control is-valid`
																	: "form-control"
															}
															id={`variation.${index}.variation_value_template.${vindex}.price`}
															name={`variation.${index}.variation_value_template.${vindex}.price`}
															onChange={handleVariationValueChange}
															value={formData.variation[index].variation_value_template[vindex].price}
														/>


														{errors && (
															<>
																{
																	errors[`variation.${index}.variation_value_template.${vindex}.price`] ? (<div className="invalid-feedback">This field is required</div>) : (<div className="valid-feedback">Looks good!</div>)

																}

															</>

														)}



													</div>
													{/* price end */}
													{/* quantity start */}
													<div className="col-md-2 me-1">

														<input
															type="text"
															className={
																errors
																	? errors[`variation.${index}.variation_value_template.${vindex}.qty`]
																		? `form-control is-invalid`
																		: `form-control is-valid`
																	: "form-control"
															}
															id={`variation.${index}.variation_value_template.${vindex}.qty`}
															name={`variation.${index}.variation_value_template.${vindex}.qty`}
															onChange={handleVariationValueChange}
															value={formData.variation[index].variation_value_template[vindex].qty}
														/>


														{errors && (
															<>
																{
																	errors[`variation.${index}.variation_value_template.${vindex}.qty`] ? (<div className="invalid-feedback">This field is required</div>) : (<div className="valid-feedback">Looks good!</div>)

																}

															</>

														)}



													</div>
													{/* quantity end */}
													{/*  sku start */}
													<div className="col-md-2 me-1">

														<input
															type="text"
															className={
																errors
																	? errors[`variation.${index}.variation_value_template.${vindex}.sub_sku`]
																		? `form-control is-invalid`
																		: `form-control is-valid`
																	: "form-control"
															}
															id={`variation.${index}.variation_value_template.${vindex}.sub_sku`}
															name={`variation.${index}.variation_value_template.${vindex}.sub_sku`}
															onChange={handleVariationValueChange}
															value={formData.variation[index].variation_value_template[vindex].sub_sku}
														/>


														{errors && (
															<>
																{
																	errors[`variation.${index}.variation_value_template.${vindex}.sub_sku`] ? (<div className="invalid-feedback">This field is required</div>) : (<div className="valid-feedback">Looks good!</div>)

																}

															</>

														)}



													</div>
													{/* sku end */}

													<div className="col-md-2">
														<button className="btn  btn-danger"
															//  style={{height:"0.1rem"}}
															type="button" onClick={() => handleVariationValueDelete(index, vindex)}>-</button>
													</div>




												</div>)
											})
										) : (null)
									}




								</div>
							</div>)
						})
					}

				</div>) : (null)
			}
			{
				formData.type === "variable" ? (<div className="text-center">

					<button className="btn btn-primary" type="button" onClick={AddVariation}>+</button>

				</div>) : (null)
			}
			{/* 
			 */}
			<br />
			<br />
			{/* colors */}
			<div className="row mt-5">
				<h4 className="text-center">
					Colors
				</h4>
			</div>
			<div className="row">
				<div className="col-md-12 ">


					<div className="row">
						<div className="col-md-3">
							Colors
						</div>

						<div className="col-md-3">Code</div>
						<div className="col-md-3">Image</div>
						<div className="col-md-3">Action</div>


					</div>


					{
						formData.colors.map((el, index) => {
							console.log(formData.colors[index].color_id)
							return (
								<div className="row mt-4 mb-4" key={index}>
									{/* colors */}
									<div className="col-md-3">
										<select
											className={
												errors
													? errors[`colors.${index}.color_id`]
														? `form-control is-invalid`
														: `form-control is-valid`
													: "form-control"
											}
											id={`colors.${index}.color_id`}
											name={`colors.${index}.color_id`}
											onChange={handleColorSelect}

											value={formData.colors[index].color_id}>
											<option value="">Please Select</option>
											{colors.map((el: any, index) => (
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
													errors[`colors.${index}.color_id`] ? (<div className="invalid-feedback">This field is required</div>) : (<div className="valid-feedback">Looks good!</div>)

												}

											</>

										)}
									</div>

									{/*  color name */}

									{/* color code */}
									<div className="col-md-3">
										<input
											type="text"
											className={
												errors
													? errors[`colors.${index}.code`]
														? `form-control is-invalid`
														: `form-control is-valid`
													: "form-control"
											}
											id={`colors.${index}.code`}
											name={`colors.${index}.code`}
											readOnly
											onChange={handleColorChange}
											value={formData.colors[index].code}
										/>


										{errors && (
											<>
												{
													errors[`colors.${index}.code`] ? (<div className="invalid-feedback">This field is required</div>) : (<div className="valid-feedback">Looks good!</div>)

												}

											</>

										)}



									</div>
									{/* end color code */}
									{/* color image */}

									<div className="col-md-3">
										<input
											type="file"
											className={
												errors
													? errors[`colors.${index}.color_image`]
														? `form-control is-invalid`
														: `form-control is-valid`
													: "form-control"
											}
											id={`colors.${index}.color_image`}
											name={`colors.${index}.color_image`}
											readOnly
											onChange={handleColorImageChange}

										/>


										{errors && (
											<>
												{
													errors[`colors.${index}.color_image`] ? (<div className="invalid-feedback">This field is required</div>) : (<div className="valid-feedback">Looks good!</div>)

												}

											</>

										)}



									</div>
									{/* end color image */}
									<div className="col-md-3">

										<button className="btn btn-danger " type="button" onClick={() => {
											deleteColor(index)
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

							<button className="btn btn-primary" type="button" onClick={() => AddColor("")}>+</button>

						</div>
					</div>
				</div>
			</div>
			{/* end of colors */}

			<div className="row mt-5">
				<h3 className="text-center">
				Options
				</h3>
				{
					options.length?(
						options.map((el:any) => {
							return (<div className="col-md-3" key={el.id}>
									<div className="form-check">
											<input
												className="form-check-input"
												name="option"
												type={"checkbox"} 
												checked={el.selected}
												id={`option-${el.id}`}
												value={el.id}
												 onChange={handleOptionChecked}
											/>

											<label
												className="form-check-label"
												htmlFor={`option-${el.id}`}>
												{el.name}
											</label>
										</div>
					
                            
							</div>)
						})
						
					):(null)
				}
                 
			</div>

<div className="row">

	
			<div className="col-md-4">
				<label htmlFor="length_lower_limit" className="form-label">
				length lower limit
				</label>
				<input
					type="text"
					className={
						errors
							? errors.length_lower_limit
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="length_lower_limit"
					name="length_lower_limit"
					onChange={handleChange}
					value={formData.length_lower_limit}
				/>
				{errors?.length_lower_limit && (
					<div className="invalid-feedback">{errors.length_lower_limit[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-4">
				<label htmlFor="length_upper_limit" className="form-label">
				length upper limit
				</label>
				<input
					type="text"
					className={
						errors
							? errors.length_upper_limit
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="length_upper_limit"
					name="length_upper_limit"
					onChange={handleChange}
					value={formData.length_upper_limit}
				/>
				{errors?.length_upper_limit && (
					<div className="invalid-feedback">{errors.length_upper_limit[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
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

export default AddProductForm;

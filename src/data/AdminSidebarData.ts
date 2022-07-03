import { NavInterface } from "../interfaces/AdminSideBarInterface";
import { ROUTE_LIST } from "../RoutConstants";
export const adminSideBarData: NavInterface[] = [
	// {
	// 	name: "Master Setup",

	// 	list: [
	// 		{
	// 			name: "Create Wing",
	// 			link: "/admin/wings/create",
	// 			permissions: [],
	// 		},
	// 		{
	// 			name: "Wings",
	// 			link: "/admin/wings",
	// 			permissions: [],
	// 		},
	// 		{
	// 			name: "Create Bank",
	// 			link: "/admin/banks/create",
	// 			permissions: [],
	// 		},
	// 		{
	// 			name: "Banks",
	// 			link: "/admin/banks",
	// 			permissions: [],
	// 		},
	// 	],
	// },
	{
		name: "Setting",
		list: [
			{
				name: "Menu",
				link: "/admin/settings/menu",
				permissions: [],
			},
		
		],
	},
	{
		name: "User Management",
		list: [
			{
				name: "Create User",
				link: "/admin/users/create",
				permissions: [],
			},
			{
				name: "Users",
				link: "/admin/users",
				permissions: [],
			},
			{
				name: "Create Role",
				link: "/admin/roles/create",
				permissions: [],
			},
			{
				name: "Roles",
				link: "/admin/roles",
				permissions: [],
			},
		],
	},


	{
		name: "Product",
		list: [
			{
				name: "Add Product",
				link: "/admin/products/create",
				permissions: [],
			},
			{
				name: "List Products",
				link: "/admin/products",
				permissions: [],
			},

			
			{
				name: "Color",
				link: ROUTE_LIST.listColor,
				permissions: [],
			},
			{
				name: "Height && Width",
				link: ROUTE_LIST.listVariationTemplate,
				permissions: [],
			}
			,
			{
				name: "Style",
				link: ROUTE_LIST.listStyle,
				permissions: [],
			},
			{
				name: "Category",
				link: ROUTE_LIST.listCategory,
				permissions: [],
			},
			{
				name: "Option",
				link: ROUTE_LIST.listOptionTemplate,
				permissions: [],
			},
			
		],
	},

		{
		name: "Coupon",
		list: [
			{
				name: "Coupon List",
				link: ROUTE_LIST.listCoupon,
				permissions: [],
			},
		
			
		],
	},
	{
		name: "Order",
		list: [
			{
				name: "Order List",
				link: ROUTE_LIST.listOrder,
				permissions: [],
			},
		
			
		],
	},
	{
		name: "Customer",
		list: [
			{
				name: "Customer List",
				link: ROUTE_LIST.listCustomers,
				permissions: [],
			},
		
			
		],
	},
	
	

];

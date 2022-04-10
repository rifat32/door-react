import HomePage from "./pages/HomePage/index";
import LoginPage from "./pages/LoginPage/index";
import RegisterPage from "./pages/RegisterPage/index";
import Admin from "./pages/AdminPages/DemoAdmin";
import AddProductPage from "./pages/AdminPages/Product/AddProductPage";
import ListProductPage from "./pages/AdminPages/Product/ListProductPage";

import { RouteInterface } from "./interfaces/RoutesInterface";

import AddRequisition from "./pages/AdminPages/Requisition/AddRequisitionPage";
import RequisitionsPage from "./pages/AdminPages/Requisition/RequisitionsPage";
import AddParchasePage from "./pages/AdminPages/Parchase/AddParchasePage";
import ListParchasePage from "./pages/AdminPages/Parchase/ListParchase";
import AddRevenuePage from "./pages/AdminPages/Income/AddRevenuePage";
import ListRevenuePage from "./pages/AdminPages/Income/ListRevenuePage";
import AddCreditNotePage from "./pages/AdminPages/Income/AddCreditNotePage";
import ListCreditNotesPage from "./pages/AdminPages/Income/ListCreditNotesPage";
import CreateBillPage from "./pages/AdminPages/Expense/AddBillPage";
import ListBillsPage from "./pages/AdminPages/Expense/ListBillsPage";
import CreatePaymentPage from "./pages/AdminPages/Expense/AddPaymentPage";
import ListPaymentPage from "./pages/AdminPages/Expense/ListPaymentPage";
import CreateDebitNotePage from "./pages/AdminPages/Expense/AddDebitNotePage";
import ListDebitNotesPage from "./pages/AdminPages/Expense/ListDebitNotesPage";
import CreateWingPage from "./pages/AdminPages/MasterSetup/AddWingPage";
import ListWingsPage from "./pages/AdminPages/MasterSetup/ListWingsPage";
import CreateBankPage from "./pages/AdminPages/MasterSetup/AddBankPage";
import ListBankPage from "./pages/AdminPages/MasterSetup/ListBankPage";
import BankBalancePage from "./pages/AdminPages/Balance/BankBalancePage";
import BankTransferPage from "./pages/AdminPages/Balance/BankTransferPage";
import CreateUserPage from "./pages/AdminPages/UserManagement/CreateUserPage";
import UsersPage from "./pages/AdminPages/UserManagement/UsersPage";
import CreateRolePage from "./pages/AdminPages/UserManagement/CreateRolePage";

import RolesPage from "./pages/AdminPages/UserManagement/RolesPage";
import CreateCharOfAccountPage from "./pages/AdminPages/DoubleEntry/AddAccountPage";
import ChartOfAccountsPage from "./pages/AdminPages/DoubleEntry/ChartOfAccountsPage";

import ListTransfersPage from "./pages/AdminPages/Balance/BankTransferHistory";
import RequisitionsReturnPage from "./pages/AdminPages/Requisition/RequisitionsReturnPage";
import RequisitionsReportPage from "./pages/AdminPages/Requisition/RequisitionsReportPage";
import ListParchaseReturnPage from "./pages/AdminPages/Parchase/PurchaseReturnpage";
import PurchaseReportPage from "./pages/AdminPages/Parchase/PurchaseReportPage";
import IncomeReportPage from "./pages/AdminPages/Income/IncomeReportPage";
import ExpenseReportPage from "./pages/AdminPages/Expense/ExpenseReportPage";
import ListCategoryPage from "./pages/AdminPages/Product/Category/ListCategoryPage";
import { ROUTE_LIST } from "./RoutConstants";
import AddCategoryPage from "./pages/AdminPages/Product/Category/AddCategoryPage";

import ListVariationTemplatePage from "./pages/AdminPages/Product/Variation/ListVariationTemplatePage";
import AddVariationTemplatePage from "./pages/AdminPages/Product/Variation/AddVariationTemplatePage";



export const RouteData: RouteInterface[] = [
	{
		path: "/",
		exact: true,
		component: HomePage,
	},
	{
		path: "/login",
		exact: false,
		component: LoginPage,
	},
	{
		path: "/register",
		exact: false,
		component: RegisterPage,
	},
	{
		path: "/register",
		exact: false,
		component: RegisterPage,
	},
	{
		path: "/admin",
		exact: true,
		component: Admin,
	},

	// wings
	{
		path: "/admin/wings/create",
		exact: false,
		component: CreateWingPage,
	},
	{
		path: "/admin/wings",
		exact: true,
		component: ListWingsPage,
	},
	// users
	{
		path: "/admin/users/create",
		exact: false,
		component: CreateUserPage,
	},
	{
		path: "/admin/users",
		exact: true,
		component: UsersPage,
	},
	{
		path: "/admin/roles/create",
		exact: false,
		component: CreateRolePage,
	},
	{
		path: "/admin/roles",
		exact: true,
		component: RolesPage,
	},
	// banks
	{
		path: "/admin/banks/create",
		exact: false,
		component: CreateBankPage,
	},
	{
		path: "/admin/banks",
		exact: true,
		component: ListBankPage,
	},

	

	// products
	{
		path: ROUTE_LIST.createProduct,
		exact: false,
		component: AddProductPage,
	},
	{
		path: ROUTE_LIST.listProduct,
		exact: true,
		component: ListProductPage,
	},
	{
		path: ROUTE_LIST.listVariationTemplate,
		exact: true,
		component: ListVariationTemplatePage,
	},
	{
		path: ROUTE_LIST.createVariationTemplate,
		exact: false,
		component: AddVariationTemplatePage,
	},
	{
		path: ROUTE_LIST.listCategory,
		exact: true,
		component: ListCategoryPage,
	},
	{
		path: ROUTE_LIST.createCategory,
		exact: false,
		component: AddCategoryPage,
	},
	

	// Requisitions
	{
		path: "/admin/requisitions/create",
		exact: false,
		component: AddRequisition,
	},
	{
		path: "/admin/requisitions",
		exact: true,
		component: RequisitionsPage,
	},
	{
		path: "/admin/requisitions/return",
		exact: false,
		component: RequisitionsReturnPage,
	},
	{
		path: "/admin/requisitions/report",
		exact: false,
		component: RequisitionsReportPage,
	},
	// Parchases
	{
		path: "/admin/parchases/create",
		exact: false,
		component: AddParchasePage,
	},
	{
		path: "/admin/parchases",
		exact: true,
		component: ListParchasePage,
	},
	{
		path: "/admin/parchases/return",
		exact: false,
		component: ListParchaseReturnPage,
	},
	{
		path: "/admin/parchases/report",
		exact: false,
		component: PurchaseReportPage,
	},

	// Incomes
	{
		path: "/admin/revenues/create",
		exact: false,
		component: AddRevenuePage,
	},
	{
		path: "/admin/revenues",
		exact: true,
		component: ListRevenuePage,
	},
	{
		path: "/admin/credits/create",
		exact: false,
		component: AddCreditNotePage,
	},
	{
		path: "/admin/credits",
		exact: true,
		component: ListCreditNotesPage,
	},
	{
		path: "/admin/income/report",
		exact: false,
		component: IncomeReportPage,
	},
	// expense
	{
		path: "/admin/bills/create",
		exact: false,
		component: CreateBillPage,
	},
	{
		path: "/admin/bills",
		exact: true,
		component: ListBillsPage,
	},
	{
		path: "/admin/payments/create",
		exact: false,
		component: CreatePaymentPage,
	},
	{
		path: "/admin/payments",
		exact: true,
		component: ListPaymentPage,
	},
	{
		path: "/admin/debitNotes/create",
		exact: false,
		component: CreateDebitNotePage,
	},
	{
		path: "/admin/debitNotes",
		exact: true,
		component: ListDebitNotesPage,
	},
	{
		path: "/admin/expense/report",
		exact: false,
		component: ExpenseReportPage,
	},
	// Balance
	{
		path: "/admin/bank/balance",
		exact: true,
		component: BankBalancePage,
	},
	{
		path: "/admin/bank/transfer",
		exact: true,
		component: BankTransferPage,
	},
	{
		path: "/admin/bank/transfer/history",
		exact: false,
		component: ListTransfersPage,
	},
	// chart of account
	{
		path: "/admin/chart-of-account/create",
		exact: false,
		component: CreateCharOfAccountPage,
	},
	{
		path: "/admin/chart-of-account/list",
		exact: false,
		component: ChartOfAccountsPage,
	},
];
//

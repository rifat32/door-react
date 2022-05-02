import React from "react";
import Chart from 'react-apexcharts'
import AdminPageComponent from "../../components/PageComponent/AdminPageComponent";
import { endOfMonth, startOfYear, addMonths } from 'date-fns'
import { users } from "../../data/hello"
import { dateCheck } from "./../../utils/date-check";
const Admin: React.FC = () => {


	const year = endOfMonth(startOfYear(new Date()))
	// Array of months from Feb/Mar to current month Feb
	const monthArray = Array.from({ length: 13 }, (_, i) => {
  
	  return addMonths(new Date(year), i - 11)
		.toISOString()
		.slice(0, 10)
	})
  
  
  
  
  const  usersDataArray:number[] = Array.from({ length: 13 }, (_, i) => {
		   return 0
	  });
  
	 users.map(el => {
	   let date = new Date(el.date).toISOString()
	   .slice(0, 10)
	  for(let i = 0; i<monthArray.length; i++) {
		let fromDate = monthArray[i - 1]
		let toDate = monthArray[i]
		if(fromDate && toDate){
		  if(dateCheck(fromDate,toDate,date)){
			  usersDataArray[i - 1] = usersDataArray[i - 1] + 1   
		  }
		}  
	  }
  
	 })
  
   
  
	  console.log(usersDataArray)



	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Dashboard</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Pages</li>
							<li className="breadcrumb-item active">Blank</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
			 <section className="section dashboard">
  <div className="row">
    <div className="col-lg-8">
      <div className="row">
        <div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Sales <span>| Today</span></h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-cart" />
                </div>
                <div className="ps-3">
                  <h6>145</h6>
                  <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-md-6">
          <div className="card info-card revenue-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Revenue <span>| This Month</span></h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-currency-dollar" />
                </div>
                <div className="ps-3">
                  <h6>$3,264</h6>
                  <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-xl-12">
          <div className="card info-card customers-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Customers <span>| This Year</span></h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-people" />
                </div>
                <div className="ps-3">
                  <h6>1244</h6>
                  <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Reports <span>/Today</span></h5>
              <div id="reportsChart">

			  <Chart
          type="area"
          height={300}
          width={600}
          options={{
            colors: ['yellow'],
            chart: {
              toolbar: {
                show: false
              },
              zoom: {
                enabled: false
              },
              foreColor: 'gray'
            },
            grid: {
              show: false
            },
            dataLabels: {
              enabled: false
            },
            tooltip: {
              enabled: false
            },
            xaxis: {
              type: 'datetime',
              axisBorder: {
                color: 'gray'
              },
              axisTicks: {
                color: 'gray'
              },
              categories: monthArray
            },
            fill: {
              opacity: 0.4,
              type: 'gradient',
              gradient: {
                shade: 'dark',
                opacityFrom: 0.7,
                opacityTo: 0.2
              }
            }
          }}
          series={[
            {
              name: 'series1',
              // TODO: get data parsed to fit the year
              // data: [31, 120, 10, 28, 51, 18, 59,99,99,99,99,99,99,99]
               data: usersDataArray
              
            }
          ]}
        />
			  </div>
            </div>
          </div>
        </div>
		
        <div className="col-12">
          <div className="card top-selling overflow-auto">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>
            <div className="card-body pb-0">
              <h5 className="card-title">Top Selling <span>| Today</span></h5>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Preview</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Sold</th>
                    <th scope="col">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"><a href="#"><img src="assets/img/product-1.jpg"  /></a></th>
                    <td><a href="#" className="text-primary fw-bold">Ut inventore ipsa voluptas nulla</a></td>
                    <td>$64</td>
                    <td className="fw-bold">124</td>
                    <td>$5,828</td>
                  </tr>
                  <tr>
                    <th scope="row"><a href="#"><img src="assets/img/product-2.jpg"  /></a></th>
                    <td><a href="#" className="text-primary fw-bold">Exercitationem similique doloremque</a></td>
                    <td>$46</td>
                    <td className="fw-bold">98</td>
                    <td>$4,508</td>
                  </tr>
                  <tr>
                    <th scope="row"><a href="#"><img src="assets/img/product-3.jpg"  /></a></th>
                    <td><a href="#" className="text-primary fw-bold">Doloribus nisi exercitationem</a></td>
                    <td>$59</td>
                    <td className="fw-bold">74</td>
                    <td>$4,366</td>
                  </tr>
                  <tr>
                    <th scope="row"><a href="#"><img src="assets/img/product-4.jpg"  /></a></th>
                    <td><a href="#" className="text-primary fw-bold">Officiis quaerat sint rerum error</a></td>
                    <td>$32</td>
                    <td className="fw-bold">63</td>
                    <td>$2,016</td>
                  </tr>
                  <tr>
                    <th scope="row"><a href="#"><img src="assets/img/product-5.jpg"  /></a></th>
                    <td><a href="#" className="text-primary fw-bold">Sit unde debitis delectus repellendus</a></td>
                    <td>$79</td>
                    <td className="fw-bold">41</td>
                    <td>$3,239</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>&lt;
      </div>
    </div>
   
  </div>
</section>

			</main>
		</AdminPageComponent>
	);
};

export default Admin;

export const API_CONSTANT = {
   summaryData: 'Dashboard/GetSummaryDashboardData?phaseNo={phaseNo}',
   mapReports: 'Dashboard/GetDashboardDataBasedOnTab',
   villageList: 'Common/GetVillageList?deptId={deptId}&userId={userId}',
   plotShareDetails: 'Plot/GetPlotShareDetails?villageId={villageId}&searchText={searchText}&pageNumber={pageNumber}&pageSize={pageSize}',
   company: 'Common/GetCompanyList?deptId={deptId}&userId={userId}',
   khasraBasedOnVillage: 'Common/GetKhasraNoBasedOnVilList?deptId={deptId}&userId={userId}&villageId={villageId}',
   commonFarmer: 'Common/GetFarmerListBasedOnVill?deptId={deptId}&userId={userId}&villageId={villageId}',
   addAcquisition: 'Acquisition/CreateAcquisition',
   deleteAcquisition: 'Acquisition/DeleteAcquisitionData?id={id}&villageId={villageId}&khasraNo={khasraNo}',
   plotList: 'Plot/GetPlotListDetails_khasra?villageId={villageId}&khasraNo={khasraNo}&pageNumber={pageNumber}&pageSize={pageSize}',
   farmerReport: 'Report/GetVillagePurchageReport?userId={userId}&reportType={reportType}&villageId={villageId}&farmerId={farmerId}&pageNumber={pageNumber}&pageSize={pageSize}',
   consolidatedList: 'Chart/GetVillageSummaryDataForChart?villageId={villageId}&khasraNo={khasraNo}&pageNumber={pageNumber}&pageSize={pageSize}',
   surveyList: 'Chart/GetVillageSummaryDataForChart?villageId={villageId}&khasraNo={khasraNo}&pageNumber={pageNumber}&pageSize={pageSize}',
   menuSideList: 'Common/GetMenuList?userId={userId}&desigId={desigId}',
   addMenu: 'Menu',

   //new api start from here
   userLogin: 'Auth/Login',
   menuList: 'Menus',
   weatherData: 'WeatherData?lat={lat}&lon={lon}&radius={radius}&fromDate={fromDate}&toDate={toDate}',

   //village api
   villageData: 'Villages?pageNo={pageNo}&pageSize={pageSize}&searchText={searchText}',
   addVillage: 'Villages',
   updateDeletegetVillage: 'Villages/{id}',
   activeDeactiveVillage: 'Villages/DeActivateVillage?villageId={villageId}',

   //khasra api
   khasraList: 'Khasras?pageNo={pageNumber}&pageSize={pageSize}&villageId={villageId}&searchText={searchText}',
   addKhasra: 'Khasras',
   updateDeleteKhasra: 'Khasras/{id}',
   activeDeactiveKhasra : 'Khasras/DeActivateKhasra?khasraId={khasraId}',

   //farmer api
   farmerList: 'Farmers?pageNo={pageNo}&pageSize={pageSize}&villageId={villageId}&searchText={searchText}',
   addFarmer: 'Farmers',
   updateDeleteFarmer: 'Farmers/{id}',
   activeDeactiveFarmer: 'Farmers/DeActivateFarmer?farmerId={farmerId}',

   //user api
   userList: 'Users?pageNo={pageNo}&pageSize={pageSize}&searchText={searchText}',
   addUser: 'Users',
   updateDeleteUser: 'Users/{id}',
   activeDeactiveUser: 'Users/DeActivateUser?userId={userId}',

   //common api
   roleList : 'Roles',
   commonVillageList : 'Villages/GetVillageList',
   commonKhasraList : 'Khasras/GetKhasraList?villageId={villageId}',
   commonFarmerList : 'Farmers/GetFarmerList?villageId={villageId}&khasraId={khasraId}',

   //dispute details api
   disputeDetails : 'Khasras/GetDisputedDetailsList?pageNo={pageNo}&pageSize={pageSize}&searchText={searchText}&villageId={villageId}',
   addDisputeDetails : 'Khasras/CreateDisputedDetails',
   updateDisputeDetails : 'Khasras/UpdateDisputedDetails/{id}',
   deleteDisputeDetails : 'Khasras/DeleteDisputedDetails/{id}',
   activeDeactiveDisputeDetails : 'Khasras/DeActivateDisputedDetails?khasraId={khasraId}',

   //acquisition details api
   acquisitionList : 'Acquisitions?pageNo={pageNo}&pageSize={pageSize}&villageId={villageId}&khasraNo={khasraNo}&searchText={searchText}',
   addAcquisitionDetails : 'Acquisitions',
   updateAcquisitionDetails : 'Acquisitions/{id}',
}
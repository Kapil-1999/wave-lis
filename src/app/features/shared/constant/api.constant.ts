export const API_CONSTANT = {
   summaryData: 'Dashboard/GetSummaryDashboardData?phaseNo={phaseNo}',
   mapReports: 'Dashboard/GetDashboardDataBasedOnTab',
   plotShareDetails: 'Plot/GetPlotShareDetails?villageId={villageId}&searchText={searchText}&pageNumber={pageNumber}&pageSize={pageSize}',
   company: 'Common/GetCompanyList?deptId={deptId}&userId={userId}',
   plotList: 'Plot/GetPlotListDetails_khasra?villageId={villageId}&khasraNo={khasraNo}&pageNumber={pageNumber}&pageSize={pageSize}',
   farmerReport: 'Report/GetVillagePurchageReport?userId={userId}&reportType={reportType}&villageId={villageId}&farmerId={farmerId}&pageNumber={pageNumber}&pageSize={pageSize}',
   consolidatedList: 'Chart/GetVillageSummaryDataForChart?villageId={villageId}&khasraNo={khasraNo}&pageNumber={pageNumber}&pageSize={pageSize}',
   surveyList: 'Chart/GetVillageSummaryDataForChart?villageId={villageId}&khasraNo={khasraNo}&pageNumber={pageNumber}&pageSize={pageSize}',
   menuSideList: 'Common/GetMenuList?userId={userId}&desigId={desigId}',
   addMenu: 'Menu',

   //new api start from here
   userLogin: 'Auth/Login',
   menuList: 'Menus',
   weatherData: 'Weather?lat={lat}&lon={lon}&radius={radius}&fromDate={fromDate}&toDate={toDate}',
   dayNightWeatherData : 'Weather/{id}',

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
   khasraBoundaryData:'Khasras/GetKhasraBoundaryData?villageId={villageId}&khasraNo={khasraNo}',

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
   khasraDisputedArea : 'Khasras/GetKhasraDisputedData?villageId={villageId}&khasraId={khasraId}',

   //acquisition details api
   acquisitionList : 'Acquisitions?pageNo={pageNo}&pageSize={pageSize}&villageId={villageId}&khasraNo={khasraNo}&searchText={searchText}',
   addAcquisition : 'Acquisitions',
   updateDeleteAcquisition: 'Acquisitions/{id}',
   partyList : 'Acquisitions/GetPartyList',

   //khasra farmer api here
   khasraFarmerList : 'Farmers/GetKhasraFarmerList?pageNo={pageNo}&pageSize={pageSize}&villageId={villageId}&searchText={searchText}',
   addKhasraFarmer : 'Farmers/MappingKhasraFarmer',
   updateKhasraFarmer : 'Farmers/UpdateKhasraFarmer/{id}',
   DeleteKhasraFarmer : 'Farmers/DeleteKhasraFarmer/{id}',

   //upload document api here
   documentList : 'Khasras/GetKhasraDocs?pageNo={pageNo}&pageSize={pageSize}&villageId={villageId}&searchText={searchText}',
   addKhasraDoc : 'Khasras/CreateKhasraDoc',
   updateKhasraDoc : 'Khasras/UpdateKhasraDoc'
}
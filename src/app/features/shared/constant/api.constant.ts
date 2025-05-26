export const API_CONSTANT = {
   summaryData: 'Dashboard/GetSummaryDashboardData?phaseNo={phaseNo}',
   mapReports: 'Dashboard/GetDashboardDataBasedOnTab',
   villageList: 'Common/GetVillageList?deptId={deptId}&userId={userId}',
   plotShareDetails: 'Plot/GetPlotShareDetails?villageId={villageId}&searchText={searchText}&pageNumber={pageNumber}&pageSize={pageSize}',
   company: 'Common/GetCompanyList?deptId={deptId}&userId={userId}',
   acquisitionList: 'Acquisition?villageId={villageId}&khasraNo={khasraNo}&farmerName={farmerName}&pageNumber={pageNumber}&pageSize={pageSize}',
   khasraBasedOnVillage: 'Common/GetKhasraNoBasedOnVilList?deptId={deptId}&userId={userId}&villageId={villageId}',
   commonFarmer: 'Common/GetFarmerListBasedOnVill?deptId={deptId}&userId={userId}&villageId={villageId}',
   addAcquisition: 'Acquisition/CreateAcquisition',
   deleteAcquisition: 'Acquisition/DeleteAcquisitionData?id={id}&villageId={villageId}&khasraNo={khasraNo}',
   farmer: 'Farmer?pageNo={pageNo}&pageSize={pageSize}',
   addFarmer: 'Farmer',
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
   activeDeactiveKhasra : 'Khasras/DeActivateKhasra?khasraId={khasraId}'

}
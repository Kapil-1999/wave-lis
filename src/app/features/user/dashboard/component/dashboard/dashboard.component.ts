import { Component } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { LocalStorageService } from '../../../../shared/services/localstorage.service';

@Component({
  selector: 'dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  cardData :any;
  activeTab: string = 'Phase1';
  measureData: any = 'sqm';
  tabs = [
    { id: 'Phase1', title: 'PHASE 1' },
    { id: 'Phase2', title: 'PHASE 2' },
  ];
  tabHeadings: any = [
    { id: 'sqm', title: 'In Sqm' },
    { id: 'acres', title: 'In Acres' },
    { id: 'hectares', title: 'In Hectors' },
    { id: 'gaj', title: 'Gaj' }
  ];
  dashboardSummary: any;
  spinnerLoading: boolean = false;
  masterData: any;
  categoriesData: any;
  constructor(
    private dashboardService : DashboardService,
    private localStorageService : LocalStorageService
  ) {}

  ngOnInit() {
    this.summaryData()
  }

  summaryData() {
    this.spinnerLoading = true
    let param = {
      phaseNo: this.activeTab,
    };
    this.dashboardService.summaryData(param).subscribe((res: any) => {
      this.spinnerLoading = false
      this.dashboardSummary = res?.body?.result;      
      this.setCard(this.dashboardSummary)
    })
  }

  setCard(data: any) {    
      this.cardData = [      { 
        name: 'Total Village', 
        icon: 'images/village-icon.png', 
        count: data?.totalVillages || 0,
        value: 'Village'
      },
      { 
        name: 'Total Farmer', 
        icon: 'images/farmer.png', 
        count: data?.totalFarmers || 0,
        value: 'Farmer'
      },
      { 
        name: 'Total Area', 
        icon: 'images/total-area.png', 
        count: data?.totalArea || 0,
        value: ''
      },
      { 
        name: 'Total Acquisition', 
        icon: 'images/acquisition.png', 
        count: data?.totalAcquired || 0,
        value: ''
      },
      { 
        name: 'Acquisition Pending', 
        icon: 'images/pending_Acqusition.png', 
        count: data?.pending || 0 ,
        value: ''
      },
      { 
        name: 'Total Dispute Area', 
        icon: 'images/dispute_area.png', 
        count: data?.totalDisputeArea || 0,
        value: ''
      },
      { 
        name: 'Total Court Cases', 
        icon: 'images/court-case.png', 
        count: data?.totalCourtCases || 0,
        value: ''
      },
      { 
        name: 'Total Court Dispute Area', 
        icon: 'images/court_dispute.png', 
        count: data?.totalCourtDisArea || 0,
        value: ''
      }
    ];
  
    // Handle masterData with fallbacks
    this.masterData = [
      { 
        name: 'Total Plots', 
        availbility: '', 
        icon: 'images/village-icon.png', 
        count: data?.master_plan?.totalPlots || 0 
      },
      { 
        name: 'Total Sold Plots', 
        availbility: '( On Available Land )', 
        icon: 'images/farmer.png', 
        count: data?.master_plan?.availSoldPlots || 0 
      },
      { 
        name: 'Total Sold Plots', 
        availbility: '( On Un-Available Land )', 
        icon: 'images/total-area.png', 
        count: data?.master_plan?.unAvailSoldPlots || 0 
      },
      { 
        name: 'Unsold Plots', 
        availbility: '( On Available Land )', 
        icon: 'images/acquisition.png', 
        count: data?.master_plan?.availUnSoldPlots || 0 
      },
    ];
  
    // Handle categoriesData with array safety
    this.categoriesData = [
      { 
        name: data?.plot_cat?.[0]?.inv_type || 'N/A', 
        icon: 'images/village-icon.png', 
        count: data?.plot_cat?.[0]?.inv_count || 0 
      },
      { 
        name: data?.plot_cat?.[1]?.inv_type || 'N/A', 
        icon: 'images/farmer.png', 
        count: data?.plot_cat?.[1]?.inv_count || 0 
      },
      { 
        name: data?.plot_cat?.[2]?.inv_type || 'N/A', 
        icon: 'images/total-area.png', 
        count: data?.plot_cat?.[2]?.inv_count || 0 
      },
      { 
        name: data?.plot_cat?.[3]?.inv_type || 'N/A', 
        icon: 'images/acquisition.png', 
        count: data?.plot_cat?.[3]?.inv_count || 0 
      },
    ];
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
    this.summaryData()
  }

  setMeasureTab(tabId: string) {
    this.measureData = tabId;
    this.summaryData()

  }

}

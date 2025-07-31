export interface ImprestRequestsModel {
  [x: string]: any;
  no:string;
  employeeNo:string;
  employeeName:string;
  currencyCode:string;
  mpesaPhoneNo:string;
  amount:string;
  destination:string;
  approvalComment:string;
  description:string;
  startDate:string;
  endDate:string;
  documentDate:string;
  postingDate:string;
  globalDimension1Code:string;
  globalDimension2Code:string;
  shortcutDimension3Code:string;
  shortcutDimension4Code:string;
  shortcutDimension5Code:string;
  shortcutDimension6Code:string;
  hsortcutDimension7Code:string;
  hsortcutDimension8Code:string;
  responsibilityCenter:string;
  status:string;
}

export interface ImprestHeaderRequests {
  [x: string]: any;
  lineNo:any;
  imprestCode: string;
  imprestRequestNo:string;
  amount:any;
  amountSpent:any;
  description:string;
  projectCode:string;
  costCategoryCode: string;
  programAreaCode: string;
  subProgramAreaCode: string;
  countyCode: string;
  siteCode: string;

}

export interface ImprestLinesRequests {
  [x: string]: any;
  lineNo: string,
  imprestCode: string,
  imprestNo: string,
  amount: string,
  amountSpent: string,
  description: string,
  globalDimension1Code: string,
  globalDimension2Code: string,
  shortcutDimension3Code: string,
  shortcutDimension4Code: string,
  shortcutDimension5Code: string,
  shortcutDimension6Code: string,
  shortcutDimension7Code: string,
  shortcutDimension8Code: string,
  status: string,
}



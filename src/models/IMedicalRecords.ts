import { NametitlesInterface } from "./INameTitles";
import { HealthInsurancesInterface } from "./IHealthInsurances";
import { MedRecOfficersInterface } from "./IMedRecOfficers";

export interface MedicalRecordInterface {
  ID: number,
  Hospital_Number: string,

  Personal_ID: string,

  NameTitleID: number,
  NameTitle: NametitlesInterface,

  Patient_Name: string,
    
  Patient_Age: number,

  Patient_dob: Date ,

  Patient_Tel: string,

  HealthInsuranceID: number,
  HealthInsurance: HealthInsurancesInterface
  
  MedRecOfficerID: number,
  MedRecOfficer: MedRecOfficersInterface,
   
  Register_Date: Date ,

}
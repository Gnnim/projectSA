
package entity

import (
	"time"
	"gorm.io/gorm"
)

type MedicalRecordOfficer struct {
	gorm.Model
	MedRecOfficer_Name string
	MedRecOfficer_Email string `gorm:"uniqueIndex"`
	MedRecOfficer_Pass string
	MedicalRecord []MedicalRecord  `gorm:"foreignKey:MedRecOfficerID"`
}

type NameTitle struct {
	gorm.Model
	Title string
	MedicalRecord []MedicalRecord `gorm:"foreignKey:NameTitleID"`
}

type HealthInsurance struct {
	gorm.Model
	HealthInsurance_Name string
	Detail string
	MedicalRecord []MedicalRecord `gorm:"foreignKey:HealthInsuranceID"`
}


type MedicalRecord struct {
	gorm.Model
	
	Hospital_Number string
	Personal_ID string

	NameTitleID *uint
	NameTitle NameTitle

	Patient_Name string
	Patient_Age int
	Patient_dob time.Time
	Patient_Tel string
	Register_Date time.Time

	HealthInsuranceID *uint
	HealthInsurance HealthInsurance

	MedRecOfficerID *uint
	MedRecOfficer MedicalRecordOfficer
}
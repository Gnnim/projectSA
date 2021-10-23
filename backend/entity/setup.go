package entity

import (

	
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}


func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("MedicalRecord"), &gorm.Config{})
	if err != nil {
		panic ("faiiled to connect database")
	}

	database.AutoMigrate(
		&MedicalRecord{}, &MedicalRecordOfficer{}, &NameTitle{}, &HealthInsurance{}, 
	)

	db = database

	MedicalRecordOfficer1 := MedicalRecordOfficer{
		MedRecOfficer_Name : "Rosie",
		MedRecOfficer_Email : "rosie@gmail.com",
		MedRecOfficer_Pass : "111111a",
	}
	db.Model(&MedicalRecordOfficer{}).Create(&MedicalRecordOfficer1)

	MedicalRecordOfficer2 := MedicalRecordOfficer{
		MedRecOfficer_Name : "Carla",
		MedRecOfficer_Email : "carla@gmail.com",
		MedRecOfficer_Pass : "2222222a",
	}
	db.Model(&MedicalRecordOfficer{}).Create(&MedicalRecordOfficer2)


	NameTitle1 := NameTitle{
		Title : "นาง",
	}
	db.Model(&NameTitle{}).Create(&NameTitle1)

	NameTitle2 := NameTitle{
		Title : "นางสาว",
	}
	db.Model(&NameTitle{}).Create(&NameTitle2)

	NameTitle3 := NameTitle{
		Title : "นาย",
	}
	db.Model(&NameTitle{}).Create(&NameTitle3)

	NameTitle4 := NameTitle{
		Title : "เด็กหญิง",
	}
	db.Model(&NameTitle{}).Create(&NameTitle4)

	NameTitle5 := NameTitle{
		Title : "เด็กชาย",
	}
	db.Model(&NameTitle{}).Create(&NameTitle5)

	HealthInsurance1 := HealthInsurance{
		HealthInsurance_Name : "นักศึกษา",
		Detail: "นักศึกษามหาวิทยาลัยเทคโนโลยีสุรนารีรักษาฟรี",
	}
	db.Model(&HealthInsurance{}).Create(&HealthInsurance1)

	HealthInsurance2 := HealthInsurance{
		HealthInsurance_Name : "บัตรทอง",
		Detail: "สวัสดิการแห่งรัฐ 30 บาทรักษาทุกโรค",
	}
	db.Model(&HealthInsurance{}).Create(&HealthInsurance2)
}


package main

import (
	"github.com/Gnnim/projectSA/entity"
	"github.com/Gnnim/projectSA/middlewares"
	"github.com/gin-gonic/gin"

	MedicalRecord "github.com/Gnnim/projectSA/controller/MedicalRecord"
	Actor "github.com/Gnnim/projectSA/controller/Actor"
	Disease "github.com/Gnnim/projectSA/controller/Disease"
	DrugAllergy "github.com/Gnnim/projectSA/controller/DrugAllergy"
	LabResult "github.com/Gnnim/projectSA/controller/LabResult"
	MedicalHistory "github.com/Gnnim/projectSA/controller/MedicalHistory"
	Refer "github.com/Gnnim/projectSA/controller/Refer"
	Screening "github.com/Gnnim/projectSA/controller/Screening"


)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			//api Diseases
			protected.GET("/api/ListDiseases", Disease.ListDiseases)

			//api DrugAllergy
			protected.POST("/api/CreateDrugAllergy", DrugAllergy.CreateDrugAllergy)
			protected.GET("/api/ListDrugAllergy", DrugAllergy.ListDrugAllergy)
			protected.GET("/api/ListDrug", DrugAllergy.ListDrug)

			//api MedicalRecord
			protected.GET("/api/ListMedicalRecord", MedicalRecord.ListMedicalRecord)
			protected.GET("/api/ListHealthInsurance", MedicalRecord.ListHealthInsurance)
			protected.GET("/api/ListNameTitle", MedicalRecord.ListNameTitle)
			protected.POST("/api/CreateMedicalRecord", MedicalRecord.CreateMedicalRecord)

			//api MedicalHistory
			protected.GET("/api/ListDepartments", MedicalHistory.ListDepartments)
			protected.POST("/api/CreateMedicalHistory", MedicalHistory.CreateMedicalHistory)
			protected.GET("/api/ListMedicalHistories", MedicalHistory.ListMedicalHistories)

			//api Refer
			protected.GET("/api/ListHospitals", Refer.ListHospitals)
			protected.POST("/api/CreateRefer", Refer.CreateRefer)
			protected.GET("/api/ListRefer", Refer.ListRefer)

			//api Screening
			protected.POST("/api/CreateScreening", Screening.CreateScreening)
			protected.GET("/api/ListScreenings", Screening.ListScreenings)

			//api ListLabResult
			protected.GET("/api/ListLabType", LabResult.ListLabType)
			protected.GET("/api/ListLabRoom", LabResult.ListLabRoom)
			protected.POST("/api/CreateLabResult", LabResult.CreateLabResult)
			protected.GET("/api/ListLabResult", LabResult.ListLabResult)

		}
	}
	//Get func login/Actor
	r.POST("/api/LoginDoctor", Actor.LoginDoctor)
	r.POST("/api/LoginMedicalRecordOfficer", Actor.LoginMedicalRecordOfficer)
	r.POST("/api/LoginMedicalTech", Actor.LoginMedicalTech)
	r.POST("/api/LoginNurse", Actor.LoginNurse)

	// Run the server
	r.Run()
}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
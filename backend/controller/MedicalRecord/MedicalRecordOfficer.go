package controller


import (

        "github.com/Gnnim/projectSA/entity"

        "github.com/gin-gonic/gin"

        "net/http"

)


func ListMedicalRecordOfficer(c *gin.Context) {
    var medicalrecordofficers []entity.MedicalRecordOfficer
    if err := entity.DB().Table("medical_record_officers").Find(&medicalrecordofficers).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": medicalrecordofficers})
}


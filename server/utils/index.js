const validateStartDate = (startDate) =>{
    if(new Date(startDate) <= new Date()) return false
    return true
}

const validateEndDate = (startDate,endDate) =>{
    if(new Date(startDate) >= new Date(endDate)) return false
    return true
}


module.exports = {
    validateStartDate,
    validateEndDate
}
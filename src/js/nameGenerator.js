export const nameGenerator = function (group) {
  switch(group){
    case 1:
      return "Nursing";
    case 2:
      return "Physician or Psychiatrist";
    case 3:
      return "Other Health Professionals";
    case 4:
      return "Clinical Support Services";
    case 5:
      return "Corporate Support Services";
    case 6:
      return "Building Services";
    case 7:
      return "Research"
    case 8:
      return "Leadership"
    case 9:
      return "Volunteers"
    case 10:
      return "Patients & Visitors"
    case 11:
      return "Third Party Staff"

    default:
      return "Funemployed"
  }
}

export function GetTagInfo(category: string){
  let categoryName: string;
	let categoryLink: string;
	let categoryColor: string;

  switch (category) {
    case "Beauty":
      categoryName = "Beauty";
      categoryLink = "/beauty"
      categoryColor = "pink.500"
      break;
    case "Fashion_and_Style":
      categoryName = "Fashion & Style";
      categoryLink = "fashion-and-style"
      categoryColor =  "pink.500"
      break;
    case "Food_and_Wellness":
      categoryName = "Food & Wellness";
      categoryLink = "/food-and-wellness"
      categoryColor = "orange.500"
      break;
    case "Lifestyle":
      categoryName = "Lifestyle";
      categoryLink = "/lifestyle"
      categoryColor = "purple.500"
      break;
    default:
      categoryName = "No Category";
      categoryLink = "#"
      categoryColor = "black.500"
  }

  return { categoryColor, categoryName, categoryLink }
}


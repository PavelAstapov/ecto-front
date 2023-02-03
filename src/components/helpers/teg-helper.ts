export function GetTagInfo(category: string){
  let categoryName: string;
	let categoryLink: string;
	let categoryColor: string;

  switch (category) {
    case "Beauty":
      categoryName = "Beauty";
      categoryLink = "category/beauty"
      categoryColor = "pink.500"
      break;
    case "Fashion_and_Style":
      categoryName = "Fashion & Style";
      categoryLink = "category/fashion-and-style"
      categoryColor =  "pink.500"
      break;
    case "Food_and_Wellness":
      categoryName = "Food & Wellness";
      categoryLink = "category/food-and-wellness"
      categoryColor = "orange.500"
      break;
    case "Lifestyle":
      categoryName = "Lifestyle";
      categoryLink = "category/lifestyle"
      categoryColor = "purple.500"
      break;
    default:
      categoryName = "No Category";
      categoryLink = "#"
      categoryColor = "black.500"
  }

  return { categoryColor, categoryName, categoryLink }
}


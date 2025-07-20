import idliImg from '../assets/Idli-Sambhar.jpg';
import pooriImg from '../assets/Poori-Bhaji.jpg';
import dosaImg from '../assets/Masala-Dosa.jpg'; 
import thaliImg from '../assets/Veg-Thaali.jpg';
import pulaoImg from '../assets/Pulao.jpg';
import pastaImg from '../assets/Pasta.jpg';
import teaImg from '../assets/Tea.jpg';
import coffeeImg from '../assets/coffee.jpg';
import juiceImg from '../assets/fresh-juice.jpg';
import burgerImg from '../assets/burger.jpg';
import samosaImg from '../assets/samosa.jpg';
import friesImg from '../assets/french-fries.jpg';




export  const menuData = {
  Breakfast: [
    { id: 1, name: "Idli Sambhar", price: 30, imageUrl: idliImg },
    { id: 2, name: "Poori Bhaji", price: 40, imageUrl: pooriImg },
    { id: 3, name: "Masala Dosa", price: 50, imageUrl: dosaImg },
  ],
  Lunch: [
    { id: 4, name: "Veg Thali", price: 70, imageUrl: thaliImg },
    { id: 5, name: "Veg Biryani", price: 120, imageUrl: pulaoImg },
    { id: 6, name: "Pasta", price: 80, imageUrl: pastaImg },
  ],
  Beverages: [
    { id: 7, name: "Tea", price: 10, imageUrl: teaImg},
    { id: 8, name: "Coffee", price: 20, imageUrl: coffeeImg },
    { id: 9, name: "Fresh Juice", price: 30, imageUrl: juiceImg },
  ],
  Snacks: [
    { id: 10, name: "Burger", price: 25, imageUrl: burgerImg },
    { id: 11, name: "Samosa", price: 20, imageUrl: samosaImg },
    { id: 12, name: "French Fries", price: 50, imageUrl: friesImg },
  ],
};

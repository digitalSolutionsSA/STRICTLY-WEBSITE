// Transcribed from the printed Strictly Come Coffee menu.
// Prices in Rand. `large` is the large-size price where a drink comes in two sizes.

export interface MenuItem {
  name: string;
  description?: string;
  price?: number;
  large?: number;
}

export interface MenuCategory {
  id: string;
  title: string;
  group: "drinks" | "food";
  /** Line under the heading, e.g. "Served with chips or a salad" */
  note?: string;
  /** Shows "Regular / Large" price columns */
  sized?: boolean;
  /** Short items laid out in two columns (add-ons, flavours) */
  compact?: boolean;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  // ---------------------------------------------------------------- Drinks
  {
    id: "traditional-coffee",
    title: "Traditional Coffee",
    group: "drinks",
    sized: true,
    items: [
      { name: "Cappuccino", price: 41, large: 49 },
      { name: "Creamiccino", price: 50, large: 56 },
      { name: "Café Latte", price: 44, large: 50 },
      { name: "Americano", price: 39, large: 42 },
      { name: "Flat White", price: 42, large: 46 },
      { name: "Red Cappuccino", price: 42, large: 46 },
      { name: "Red Latte", price: 44, large: 50 },
      { name: "Bottomless Coffee", price: 47 },
      { name: "Espresso Straight Shot", price: 25 },
      { name: "Extra Cream", price: 29 },
    ],
  },
  {
    id: "speciality-coffee",
    title: "Speciality Coffee",
    group: "drinks",
    sized: true,
    items: [
      { name: "Café Mocha", price: 49, large: 54 },
      { name: "Strictly Mocha", price: 53, large: 59 },
      { name: "Café Bon Bon", price: 47, large: 54 },
      { name: "Flavoured Latte / Cappuccino", price: 47, large: 54 },
      { name: "Hot Chocolate", price: 43, large: 46 },
      { name: "Pot of Tea", price: 32 },
      { name: "Milo", price: 46, large: 49 },
      { name: "Chai Latte", price: 46, large: 49 },
    ],
  },
  {
    id: "soft-drinks",
    title: "Soft Drinks",
    group: "drinks",
    items: [
      { name: "Sodas", price: 26 },
      { name: "Floats", price: 37 },
      { name: "Appletiser / Grapetiser", price: 37 },
      { name: "Still / Sparkling Water", price: 25 },
      { name: "Fruit Juice", description: "Mango, fruit cocktail, orange", price: 30 },
      { name: "Lemonade / Soda Water 200ml", price: 28 },
      { name: "Cola and Tonic", price: 38 },
      { name: "Passion Fruit and Lemonade", price: 38 },
      { name: "Lime and Soda", price: 38 },
    ],
  },
  {
    id: "freezos-smoothies",
    title: "Freezo's & Smoothies",
    group: "drinks",
    items: [
      { name: "Ice Coffee", description: "Plain, vanilla, chocolate, toffee, hazelnut", price: 50 },
      { name: "Iced Chai Latte", price: 43 },
      { name: "Ice Cream Coffee", price: 52 },
      { name: "Milkshake", description: "Bubblegum, lime, strawberry, chocolate, vanilla, banana", price: 50 },
      { name: "Gourmet Milkshake", description: "With cream — marshmallow, blueberry, lemon, Milo, Bar-One", price: 54 },
      { name: "Peanut Butter Smoothie", description: "Whey protein, banana, peanut butter, Nutella", price: 77 },
      {
        name: "Freezo's",
        description: "Powder + syrup — coconut, chocolate, mocha, coffee, passion fruit, mango, strawberry",
        price: 53,
      },
    ],
  },
  {
    id: "bubble-tea",
    title: "Bubble Tea & Bobas",
    group: "drinks",
    items: [
      { name: "Bubble Tea with Lemonade or Tea", price: 65 },
      { name: "Bubble Tea Smoothie", price: 65 },
      { name: "Bubble Tea with Water", price: 55 },
    ],
  },
  {
    id: "flavours",
    title: "Flavours",
    group: "drinks",
    note: "For your bubble tea",
    compact: true,
    items: [
      { name: "Mango" },
      { name: "Cherry" },
      { name: "Strawberry" },
      { name: "Litchi" },
      { name: "Blueberry" },
      { name: "Passion Fruit" },
    ],
  },
  {
    id: "milk-bobas",
    title: "Milk Bobas",
    group: "drinks",
    compact: true,
    items: [{ name: "Strawberry" }, { name: "Coffee" }, { name: "Chocolate" }],
  },

  // ---------------------------------------------------------------- Food
  {
    id: "breakfast",
    title: "Breakfast Corner",
    group: "food",
    items: [
      {
        name: "Strictly Breakfast",
        description: "2 eggs, pork sausages, boerewors, cheese griller, bacon, mushrooms, tomato, toast and hashbrown",
        price: 132,
      },
      { name: "Eggs Benedict", description: "Choose between ham or bacon, served on an English muffin", price: 93 },
      { name: "Eggs Salmon Benedict", description: "Served on an English muffin", price: 137 },
      { name: "Breakfast Roll", description: "Bacon, fried egg & cheddar cheese on an open seeded roll", price: 86 },
      { name: "Avo Sunrise Ciabatta", description: "Ciabatta with creamy avo & a fried egg", price: 45 },
      { name: "Poached Egg Brekkie", description: "2 poached eggs, low GI, cherry tomato & cream cheese", price: 81 },
      { name: "Breakfast Croissant", description: "1 croissant with bacon, scrambled eggs & cheese", price: 94 },
      {
        name: "Omelette",
        description: "Choose 3 toppings — feta, cheddar, mozzarella, bacon, ham, tomato, pepper, onion, olives, mushrooms",
        price: 100,
      },
      { name: "Breakfast Wrap", description: "Scrambled eggs, cheese & bacon", price: 90 },
    ],
  },
  {
    id: "pensioners",
    title: "Pensioners",
    group: "food",
    note: "Monday to Friday, 08:00 – 11:00 only",
    items: [
      {
        name: "Strictly Seniors Breakfast",
        description: "2 slices of bacon, 1 slice of toast, grilled tomato, grilled mushrooms, 1 fried egg, free coffee or tea",
        price: 65,
      },
    ],
  },
  {
    id: "vintage-scramble",
    title: "Vintage Scramble",
    group: "food",
    note: "All served with white, brown or low GI toast",
    items: [
      { name: "Spring Onion & Mozzarella", price: 76 },
      { name: "Bacon Cubes, Spring Onion & Mozzarella", price: 82 },
      { name: "Feta, Spinach & Mushroom", price: 82 },
    ],
  },
  {
    id: "build-your-own",
    title: "Build Your Own",
    group: "food",
    compact: true,
    items: [
      { name: "Egg", price: 12 },
      { name: "Toast", price: 10 },
      { name: "Baked Beans", price: 13 },
      { name: "Mushrooms", price: 15 },
      { name: "Cheese Grillers", price: 19 },
      { name: "Boerewors", price: 29 },
      { name: "Salmon", price: 93 },
      { name: "Cheddar", price: 15 },
      { name: "2 Bacon", price: 26 },
      { name: "Slice of Cheese", price: 8 },
      { name: "Pattie", price: 41 },
      { name: "Halloumi", price: 41 },
      { name: "Feta", price: 15 },
      { name: "Mozzarella", price: 15 },
      { name: "Hollandaise Sauce", price: 24 },
      { name: "Peppers", price: 15 },
      { name: "Pork Sausage", price: 26 },
      { name: "Ham", price: 20 },
      { name: "Onion", price: 8 },
      { name: "Sweet Potato", price: 12 },
      { name: "Small Plate Chips", price: 30 },
      { name: "Large Plate Chips", price: 41 },
      { name: "Loaded Fries (small)", price: 57 },
    ],
  },
  {
    id: "health-sandwiches",
    title: "Health Sandwiches",
    group: "food",
    note: "Served with chips or a salad",
    items: [
      { name: "Famous Roll", description: "Hickory ham, cheese and tomato on a seeded roll", price: 83 },
      {
        name: "The Melt",
        description: "Toasted ciabatta with a choice of tuna mayo or chicken mayo, mozzarella and peppadews",
        price: 83,
      },
      {
        name: "Salmon Open Sandwich",
        description: "80g salmon, cucumber, rocket, avo, cream cheese and a slice of lemon, served on low GI bread",
        price: 149,
      },
      {
        name: "Hickory Ham Open Sandwich",
        description: "Ciabatta or sourdough, cream cheese, hickory ham, lettuce, cucumber, red onion, tomato, olives, hollandaise sauce",
        price: 89,
      },
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    group: "food",
    note: "Served with chips or a salad — ciabatta, white, brown, low GI or rye",
    items: [
      { name: "Cheese", price: 53 },
      { name: "Cheese & Tomato", price: 67 },
      { name: "Ham & Tomato", price: 72 },
      { name: "Ham, Cheese & Tomato", price: 77 },
      { name: "Bacon & Egg", price: 73 },
      { name: "Bacon, Egg & Cheese", price: 79 },
      { name: "Chicken Mayo", price: 77 },
      { name: "Mince & Cheese", price: 77 },
      { name: "Club Sandwich", price: 80 },
    ],
  },
  {
    id: "tramezzinis",
    title: "Tramezzinis",
    group: "food",
    note: "Served with chips or a salad",
    items: [
      { name: "Chicken Mayo, Avo and Feta", price: 107 },
      { name: "Bacon, Egg and Cheese", price: 93 },
      { name: "Savoury Mince, Cheese and Tomato", price: 97 },
      { name: "Bacon, Avo and Feta", price: 105 },
    ],
  },
  {
    id: "wraps",
    title: "Wraps",
    group: "food",
    note: "Served with chips or a salad",
    items: [
      { name: "Chicken Wrap", description: "Grilled chicken, avo, rocket, peppadews, carrot and mayo", price: 96 },
      { name: "Halloumi Wrap", description: "Halloumi, avo, olive pesto, sweet chilli mayo and garnish", price: 100 },
      { name: "Salmon Wrap", description: "Salmon, cucumber, rocket, avo and cream cheese", price: 140 },
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    group: "food",
    items: [
      { name: "200g Sirloin Steak, Egg and Chips", description: "Served with chips or salad", price: 85 },
      { name: "Chicken Wings (hot or not)", description: "Served with chips or salad", price: 75 },
      { name: "Quiche with Side Salad", description: "Bacon, mushroom and cheese", price: 96 },
      { name: "Beef Cheese Burger and Chips", description: "150g pure beef pattie", price: 96 },
      { name: "Bacon, Egg & Cheese Beef Burger and Chips", description: "150g pure beef pattie", price: 102 },
      { name: "Chicken Cheese Burger and Chips", description: "Chicken fillet", price: 106 },
      { name: "Lasagne with Side Salad", price: 102 },
      { name: "Chicken Strips and Chips", description: "Served with chilli mayo", price: 100 },
      { name: "Chicken Schnitzel with Chips or Salad", description: "With mushroom or cheese sauce", price: 106 },
      {
        name: "Basket for 2",
        description: "Halloumi, chicken strips, pork cocktail sausages, spring rolls, chips and two sauces",
        price: 204,
      },
      { name: "Pepper Steak Pie", description: "Served with chips or salad", price: 95 },
      { name: "Cottage Pie", description: "Served with chips or salad", price: 95 },
    ],
  },
  {
    id: "light-lunch",
    title: "Light Lunch",
    group: "food",
    items: [
      { name: "Chicken Strips & Mushroom Sauce Spud", price: 90 },
      { name: "Mince and Cheese Spud", price: 90 },
      { name: "Ham, Pine and Cheese Spud", price: 90 },
    ],
  },
  {
    id: "fitness-meals",
    title: "Fitness Meals",
    group: "food",
    items: [
      {
        name: "Low Calorie Burger",
        description: "No bread — pattie, avo, bacon, cheese, tomato, onions with salad",
        price: 99,
      },
      {
        name: "Fitness Lunch",
        description:
          "Two grilled chicken breasts or a full portion of tuna, with boiled potato or sweet potato and cream cheese, with a side salad",
        price: 104,
      },
      {
        name: "Tuna Salad",
        description: "Tuna, lettuce, cucumber, cherry tomato, cheddar cheese, red onions & mayo",
        price: 85,
      },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    group: "food",
    note: "Served with ciabatta (avos in season)",
    items: [
      { name: "Crispy Bacon and Avo Salad", price: 97 },
      { name: "Grilled Chicken Salad", price: 106 },
      { name: "Halloumi Wrapped in Bacon & Avo Salad", price: 102 },
    ],
  },
  {
    id: "hashbrown-waffles",
    title: "Hashbrown Waffles",
    group: "food",
    items: [
      { name: "Bacon, Egg and Cheese", price: 77 },
      { name: "Fried Chicken, Sweet Mayo, Rocket and Cherry Tomatoes", price: 87 },
    ],
  },
  {
    id: "little-beans",
    title: "Little Beans",
    group: "food",
    note: "For the kids",
    items: [
      { name: "Spaghetti Bolognese", price: 55 },
      { name: "Mac & Cheese", price: 55 },
      { name: "Toasted Cheese and Chips", price: 51 },
      { name: "Viennas and Chips", price: 65 },
      { name: "Fish Fingers and Chips", price: 65 },
      { name: "Chicken Nuggets and Smileys", price: 60 },
      { name: "Mini-Chino", price: 27 },
      { name: "Little Shake", price: 42 },
      { name: "Ice Cream and Chocolate Sauce", price: 51 },
    ],
  },
  {
    id: "sweet-savoury",
    title: "Sweet & Savoury",
    group: "food",
    items: [
      { name: "Croissant", description: "Served with jam and cheese", price: 65 },
      { name: "Scone", description: "Served with jam and cheese, or jam and cream", price: 43 },
      { name: "Slice of Cake", description: "Please ask your waiter about today's availability", price: 67 },
      { name: "Lemon Meringue", price: 42 },
    ],
  },
];

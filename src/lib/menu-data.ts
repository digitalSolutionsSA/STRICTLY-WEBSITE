const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

export interface MenuItem {
  name: string;
  description?: string;
  image?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "traditional-coffee",
    title: "Traditional Coffee",
    items: [
      { name: "Cappuccino", image: U("1509042239860-f550ce710b93") },
      { name: "Creamiaccino", image: U("1572286258217-215cf8cd3f95") },
      { name: "Café Latte", image: U("1461023058943-07fcbe16d735") },
      { name: "Americano", image: U("1510591509098-f4fdc6d0ff04") },
      { name: "Flat White", image: U("1497515114629-f71d768fd07c") },
      { name: "Red Cappuccino", image: U("1544787219-7f47ccb76574") },
      { name: "Red Latte", image: U("1544145945-f90425340c7e") },
      { name: "Bottomless Coffee", image: U("1495474472287-4d71bcdd2085") },
      { name: "Extra Cream", image: U("1534040385115-33943c3f5e1b") },
      { name: "Espresso Straight Shot", image: U("1596952954288-16862d37405b") },
    ],
  },
  {
    id: "speciality-coffee",
    title: "Speciality Coffee",
    items: [
      { name: "Café Mocha", image: U("1578314675249-a6910f80cc4e") },
      { name: "Strictly Mocha", image: U("1552346154-21969185db4b") },
      { name: "Café Bon Bon", image: U("1559056199-641a0ac8b55e") },
      { name: "Flavoured Latte / Cappuccino", image: U("1541167760496-1628856ab772") },
      { name: "Hot Chocolate", image: U("1542990253-a781e04c0082") },
      { name: "Pot of Tea", image: U("1556679343-c7306c1976bc") },
      { name: "Milo", image: U("1571934811356-5cc061b6821f") },
      { name: "Chai Latte", image: U("1571934811356-5cc061b6821f") },
    ],
  },
  {
    id: "freezos-smoothies",
    title: "Freezo's & Smoothies",
    items: [
      { name: "Ice Coffee", description: "Plain, vanilla, chocolate, toffee or hazelnut", image: U("1461023058943-07fcbe16d735") },
      { name: "Iced Chai Latte", image: U("1563227812-0eb4d1e51d19") },
      { name: "Ice Cream Coffee", image: U("1570197788417-0e82375c9371") },
      { name: "Milkshake", description: "Blueberry, lime, strawberry, chocolate, vanilla or banana", image: U("1579954115545-a95591f28bfc") },
      { name: "Gourmet Milkshake", description: "With cream — marshmallow, blueberry, lotus, red velvet or Oreo", image: U("1572490122747-3968b75cc699") },
      { name: "Peanut Butter Smoothie", description: "Whey protein, banana, peanut butter & Nutella", image: U("1553530666-ba11a7da3888") },
      { name: "Freezo's", description: "Powder/syrup — coconut, chocolate mocha, chocolate coffee, passion fruit, mango or strawberry", image: U("1533630247904-f64e3ea35a6b") },
    ],
  },
  {
    id: "soft-drinks",
    title: "Soft Drinks",
    items: [
      { name: "Sodas", image: U("1622483767028-3f66f32aef97") },
      { name: "Apple / Grapetiser", image: U("1600271886742-f049cd451bba") },
      { name: "Still / Sparkling Water", image: U("1548839140-29a749e1cf4d") },
      { name: "Fruit Juice", description: "Mango, fruit cocktail or orange", image: U("1600271886742-f049cd451bba") },
      { name: "Lemonade / Soda Water 200ml", image: U("1621263764928-df1444c5e859") },
      { name: "Add Cordial", description: "Passion fruit, cola or lime", image: U("1609951651490-56e4d2c4e6b2") },
    ],
  },
  {
    id: "bubble-tea",
    title: "Bubble Tea",
    items: [
      { name: "Bubble Tea with Lemonade or Tea", image: U("1558618666-fcd25c85cd64") },
      { name: "Bubble Tea Smoothie", image: U("1559526324-593bc073d938") },
      { name: "Bubble Tea with Water", image: U("1558618666-fcd25c85cd64") },
      { name: "Bobas", description: "Mango, strawberry, blueberry, passion fruit, cherry or litchi", image: U("1561043160-e3eb0f3e7b62") },
      { name: "Syrups", description: "Blueberry, cherry, passion fruit, strawberry, mango or litchi", image: U("1609951651490-56e4d2c4e6b2") },
      { name: "Milk Bobas", description: "Chocolate, strawberry or coffee", image: U("1569691105751-88df003de7a4") },
    ],
  },
  {
    id: "breakfast",
    title: "Breakfast Corner",
    items: [
      { name: "Strictly Breakfast", description: "2 eggs, pork sausages, boerewors, cheese griller, bacon, mushrooms, tomato, toast & hashbrown", image: U("1504674900247-0877df9cc836") },
      { name: "Eggs Benedict", description: "Choose between ham or bacon, served on an English muffin", image: U("1525351484163-7529414344d8") },
      { name: "Eggs Salmon Benedict", description: "Served on an English muffin", image: U("1519984388953-d2406bc725e1") },
      { name: "Breakfast Roll", description: "Bacon, fried egg & cheddar cheese on an open seeded roll", image: U("1607532941433-304659e8198a") },
      { name: "Salmon Breakfast", description: "Scrambled eggs topped with fresh salmon and cream cheese, with a slice of toast", image: U("1519984388953-d2406bc725e1") },
      { name: "Poached Egg Brekkie", description: "2 poached eggs, low GI toast, cherry tomato and cream cheese", image: U("1510693206972-df098062cb71") },
      { name: "Breakfast Croissant", description: "1 croissant with bacon, scrambled eggs & cheese", image: U("1555507036-ab1f4038808a") },
      { name: "Omelette", description: "Choose between 3 toppings: feta, cheddar, mozzarella, bacon, ham, tomato, pepper, onion, olives or mushrooms", image: U("1510693206972-df098062cb71") },
      { name: "Breakfast Wrap", description: "Scrambled eggs, cheese and bacon", image: U("1626700051175-6818013e1d4f") },
    ],
  },
  {
    id: "vintage-scrambles",
    title: "Vintage Scrambles",
    items: [
      { name: "Scrambled Eggs, Spring Onion & Mozzarella", image: U("1525351484163-7529414344d8") },
      { name: "Scrambled Eggs, Bacon Cubes, Spring Onion & Mozzarella", image: U("1607532941433-304659e8198a") },
      { name: "Scrambled Eggs, Feta, Spinach & Mushrooms", image: U("1510693206972-df098062cb71") },
    ],
  },
  {
    id: "build-your-own",
    title: "Build Your Own",
    items: [
      { name: "Egg", image: U("1510693206972-df098062cb71") },
      { name: "Toast", image: U("1541519227354-08fa5d50c820") },
      { name: "Baked Beans", image: U("1604329760661-69a41943aad8") },
      { name: "Mushrooms", image: U("1504674900247-0877df9cc836") },
      { name: "Cheese Grillers", image: U("1504674900247-0877df9cc836") },
      { name: "Boerewors", image: U("1544025162-d76538b0e21e") },
      { name: "Salmon", image: U("1519984388953-d2406bc725e1") },
      { name: "Cheddar", image: U("1452195100486-9cc805987862") },
      { name: "2 Bacon", image: U("1607532941433-304659e8198a") },
      { name: "Slice of Cheese", image: U("1452195100486-9cc805987862") },
      { name: "Pattie", image: U("1568901346375-23c9450c58cd") },
      { name: "Halloumi", image: U("1548940392-db5e76370c1d") },
      { name: "Feta", image: U("1452195100486-9cc805987862") },
      { name: "Mozzarella", image: U("1452195100486-9cc805987862") },
      { name: "Hollandaise Sauce", image: U("1525351484163-7529414344d8") },
      { name: "Peppers", image: U("1592417817098-8fd3d9eb14a5") },
      { name: "Pork Sausage", image: U("1504674900247-0877df9cc836") },
      { name: "Ham", image: U("1607532941433-304659e8198a") },
      { name: "Onion", image: U("1592417817098-8fd3d9eb14a5") },
      { name: "Plate Chips", image: U("1573080496219-bb964701c2b1") },
      { name: "Loaded Fries", image: U("1573080496219-bb964701c2b1") },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    items: [
      { name: "Crispy Bacon & Avo Salad", description: "Served with ciabatta (avo in season)", image: U("1512621776951-a57141f2eefd") },
      { name: "Grilled Chicken Salad", description: "Served with ciabatta (avo in season)", image: U("1540420773420-3366772f4999") },
      { name: "Salmon Salad", description: "Served with ciabatta (avo in season)", image: U("1519984388953-d2406bc725e1") },
      { name: "Halloumi Wrapped in Bacon & Avo Salad", image: U("1512621776951-a57141f2eefd") },
      { name: "Grilled Chicken and Bacon Salad", description: "Cherry tomatoes, avo, feta & cucumber", image: U("1540420773420-3366772f4999") },
    ],
  },
  {
    id: "health-sandwiches",
    title: "Health Sandwiches",
    items: [
      { name: "Famous Roll", description: "Hickory, ham, cheese & tomato on a seeded roll — served with chips or salad", image: U("1528735602780-2552fd46c7af") },
      { name: "The Melt", description: "Toasted ciabatta, choice of tuna mayo or chicken mayo, mozzarella & peppadews", image: U("1528735602780-2552fd46c7af") },
      { name: "Salmon Open Sandwich", description: "80g salmon, cucumber, rocket, avo, cream cheese and a slice of lemon on low-GI bread", image: U("1519984388953-d2406bc725e1") },
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    items: [
      { name: "Cheese", image: U("1528735602780-2552fd46c7af") },
      { name: "Cheese and Tomato", image: U("1528735602780-2552fd46c7af") },
      { name: "Ham & Tomato", image: U("1528735602780-2552fd46c7af") },
      { name: "Ham, Cheese & Tomato", image: U("1528735602780-2552fd46c7af") },
      { name: "Bacon and Egg", image: U("1607532941433-304659e8198a") },
      { name: "Bacon, Egg & Cheese", image: U("1607532941433-304659e8198a") },
      { name: "Chicken Mayo", image: U("1567620905732-2d1ec7ab7445") },
      { name: "Mince and Cheese", image: U("1528735602780-2552fd46c7af") },
    ],
  },
  {
    id: "fitness-meals",
    title: "Fitness Meals",
    items: [
      { name: "Low Calorie Burger", description: "No bread — pattie, avo, bacon, cheese, tomato & onions with salad", image: U("1568901346375-23c9450c58cd") },
      { name: "Fitness Lunch", description: "Two grilled chicken breasts or a full portion of tuna with boiled or sweet potato & cream cheese, side salad", image: U("1540420773420-3366772f4999") },
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    items: [
      { name: "Soup of the Day", description: "Served with a mini loaf (in season)", image: U("1547592180-85f173990554") },
      { name: "Chicken Noodle", image: U("1547592180-85f173990554") },
      { name: "Beef & Veggie", image: U("1547592180-85f173990554") },
      { name: "Butternut", image: U("1547592180-85f173990554") },
      { name: "Quiche", description: "Bacon, mushroom & cheese, served with a side salad", image: U("1565299585323-38d6b0865b47") },
      { name: "Beef Burger & Chips", description: "150g pure beef pattie", image: U("1568901346375-23c9450c58cd") },
      { name: "Bacon & Cheese Beef Burger & Chips", description: "150g pure beef pattie", image: U("1565299585323-38d6b0865b47") },
      { name: "Chicken Burger & Chips", description: "Chicken fillet", image: U("1567620905732-2d1ec7ab7445") },
      { name: "Lasagne", description: "Served with a side salad", image: U("1560781290-5f09c3964960") },
      { name: "Chicken Strips with Chips", description: "Served with chilli mayo", image: U("1562967914-608f82629710") },
      { name: "Chicken Schnitzel with Chips or Salad", description: "With cheese & cheese sauce", image: U("1562967914-608f82629710") },
      { name: "Basket for 2", description: "Halloumi, chicken strips, mini cocktail sausages, onion rings, dips & hot sauce", image: U("1585238342024-78d387f4a707") },
      { name: "Pepper Steak Pie", description: "Served with chips or salad", image: U("1535920527002-b35e96722eb9") },
      { name: "Chicken and Mushroom Pie", description: "Served with chips or salad", image: U("1535920527002-b35e96722eb9") },
    ],
  },
  {
    id: "hashbrown-waffle",
    title: "Hashbrown Waffle",
    items: [
      { name: "Bacon, Egg and Cheese", image: U("1560180474-e8563fd75bab") },
      { name: "Fried Chicken, Sweet Mayo, Rocket and Cherry Tomatoes", image: U("1560180474-e8563fd75bab") },
    ],
  },
  {
    id: "tramezzinis",
    title: "Tramezzinis",
    items: [
      { name: "Chicken Mayo, Avo & Feta", description: "Served with salad or chips", image: U("1567620905732-2d1ec7ab7445") },
      { name: "Bacon, Egg & Cheese", description: "Served with salad or chips", image: U("1607532941433-304659e8198a") },
      { name: "Savoury Mince, Cheese & Tomato", description: "Served with salad or chips", image: U("1528735602780-2552fd46c7af") },
      { name: "Bacon, Avo & Feta", description: "Served with salad or chips", image: U("1512621776951-a57141f2eefd") },
    ],
  },
  {
    id: "wraps",
    title: "Wraps",
    items: [
      { name: "Chicken Wrap", description: "Grilled chicken, avo, rocket, peppadews, carrot & mayo", image: U("1626700051175-6818013e1d4f") },
      { name: "Halloumi Wrap", description: "Halloumi, avo, olive pesto, sweet chilli mayo & garnish", image: U("1626700051175-6818013e1d4f") },
      { name: "Salmon Wrap", description: "Salmon, cucumber, rocket, avo & cream cheese", image: U("1626700051175-6818013e1d4f") },
    ],
  },
  {
    id: "sweet-savoury",
    title: "Sweet & Savoury",
    items: [
      { name: "Sweet French Toast", description: "Nutella or Bashoff", image: U("1484723091739-30990a9a5b28") },
      { name: "Croissant", description: "Served with jam and cheese", image: U("1555507036-ab1f4038808a") },
      { name: "Scone", description: "Jam & cheese or jam & cream", image: U("1558961363-fa8fdf82db35") },
      { name: "Selection of Cheese Cakes", image: U("1565958011703-44f9829ba187") },
      { name: "Slice of Cake", description: "Ask about our selection", image: U("1578985545062-69928b1d9587") },
    ],
  },
  {
    id: "little-beans",
    title: "Little Beans (Kids)",
    items: [
      { name: "Cheese Griller & 2 Scrambled Eggs", image: U("1510693206972-df098062cb71") },
      { name: "Toasted Cheese & Chips", image: U("1573080496219-bb964701c2b1") },
      { name: "Chicken Nuggets & Smileys", image: U("1562967914-608f82629710") },
      { name: "Mini-Chino", image: U("1509042239860-f550ce710b93") },
      { name: "Little Shake", image: U("1579954115545-a95591f28bfc") },
      { name: "Ice Cream & Chocolate Sauce", image: U("1563805042-7684c019e1cb") },
    ],
  },
];

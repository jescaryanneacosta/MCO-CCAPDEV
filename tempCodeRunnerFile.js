const Establishment = require("./mongo model/resto.model");


async function saveEstablishment() {
  const newEstablishment = new Establishment({
    name: 'Zarks Burger',
    popularitems: ['Tombstone Burger','Zarks Ultimate Burger','Luther Burger','Hall-of-Fame Fries','Grilled Cheese Burger'],
    avatar: '/static/images/default-avatar.jpg',
    images: [],
    category: 'Restaurant',
    cuisine: ['American','Mexican'],
    description: 'Growing up, ZARK always had this bubbling frustration over bland burgers, which are commonly overpriced and barely fulfilling. Rather than keeping silent about this --- he thought, why not take matters into his own hands Armed with determination to create a new wave of burgers that are fresh, huge, and great.',
    location: '2464 Taft Ave, Malate, Manila, 1000 Metro Manila',
    rating: 0,
  });

  try {
    const existingEstablishment = await Establishment.findOne({ name: newEstablishment.name });

    if (!existingEstablishment) {
      await newEstablishment.save();
      console.log('Establishment created:', newEstablishment);
    } else {
      console.log('Establishment with the same name already exists:', existingEstablishment);
    }
  } catch (error) {
    console.error('Error creating or checking establishment:', error);
  }
 
}

saveEstablishment();
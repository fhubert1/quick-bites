const restaurants = [
    {
        id: '1',
        name: 'Freds Chicken and Waffles',
        address: '123 Fred Drive, Ellicott City, MD 21042',
        phone: '555-111-1111',
        menu: [
            {
                id: '1',
                name: 'Hot Honey Chicken and Waffles',
                description: '4 Tenders in special hot honey sauce on a belgin waffle.',
                price: 14.99,
            },
            {
                id: '2',
                name: 'Chicken and Waffles',
                description: '4 Tenders on a belgin waffle.',
                price: 11.99,
            },
            {
                id: '3',
                name: 'Reg Fries',
                description: 'Waffle Fries.',
                price: 4.99,
            },
            {
                id: '4',
                name: 'Lg Fries',
                description: 'Waffle Fries.',
                price: 6.99,
            },
            {
                id: '5',
                name: 'Reg Drink',
                description: 'fountain drink.',
                price: 1.99,
            },
            {
                id: '6',
                name: 'Lg Drink',
                description: 'fountain drink.',
                price: 2.99,
            },
        ],
        reviews: [
            {
                id: 1,
                user: 'Tom',
                rating: 10,
                comment: 'Amazing food and service, Fred is the GREATEST!!!',
                date: '2024-07-01'
            },
            {
                id: '2',
                user: 'Jerry',
                rating: 9,
                comment: 'Great food great value!!.',
                date: '2024-07-21'
            }            
        ]
    },
    {
        id: '2',
        name: 'Shandys Shake Shack',
        address: '234 Shandy Lane, Fairfax, VA  12121',
        phone: '555-222-2222',
        menu: [
            {
                id: '1',
                name: 'Cheeseburger',
                description: 'A tasty cheeseburger with all the fixings.',
                price: 7.99,
            },
            {
                id: '2',
                name: 'Veggie Burger',
                description: 'Delicious veggie burger.',
                price: 6.99,
            },
            {
                id: '3',
                name: 'Reg Fries',
                description: 'Waffle Fries.',
                price: 4.99,
            },
            {
                id: '4',
                name: 'Lg Fries',
                description: 'Waffle Fries.',
                price: 6.99,
            },
            {
                id: '5',
                name: 'Reg Shake',
                description: 'Delicious Shake.',
                price: 2.99,
            },
            {
                id: '6',
                name: 'Lg Shake',
                description: 'Delicious Shake.',
                price: 4.99,
            },
        ],
        reviews: [
            {
                id: 1,
                user: 'Harry',
                rating: 10,
                comment: 'Amazing food and service, Best Shakes in the world!!!',
                date: '2024-06-01'
            },
            {
                id: '2',
                user: 'Ron',
                rating: 9,
                comment: 'Great food great value!!.',
                date: '2024-06-21'
            }            
        ]        
    },
    {
        id: '3',
        name: 'Sams BBQ Joint',
        address: '567 Sam Hywy, Silver Spring, MD  23233',
        phone: '555-333-3333',
        sides: [
            {
                id: 1,
                name: 'Fries',
                description: 'French Fries',
            },
            {
                id: 2,
                name: 'mac n cheese',
                description: 'mac n cheese',
            },
            {
                id: 3,
                name: 'mixed veggies',
                description: 'seasonal veggies',
            },
        ],
        menu: [
            {
                id: '1',
                name: 'Half Rack Ribs Platter',
                description: 'A tasty half rack of ribs in savior bbq sauce with 2 sides.',
                price: 15.99,
            },
            {
                id: '2',
                name: 'Full Rack Ribs Platter',
                description: 'A tasty half rack of ribs in savior bbq sauce with 3 sides.',
                price: 23.99,
            },
            {
                id: '3',
                name: 'Pulled Chicken Platter',
                description: 'Pulled chicken sandwich with fries',
                price: 11.99,
            },
            {
                id: '4',
                name: 'Pulled Pork Platter',
                description: 'Pulled pork sandwich with fries.',
                price: 10.99,
            },
            {
                id: '5',
                name: 'Reg Fountain Drink',
                description: 'Fountain Drink.',
                price: 1.99,
            },
            {
                id: '6',
                name: 'Lg Fountain Drink',
                description: 'Fountain Drink.',
                price: 2.99,
            },
        ],
        reviews: [
            {
                id: 1,
                user: 'Luke',
                rating: 10,
                comment: 'Amazing food and service, Ribs fall off the bone!!!',
                date: '2024-07-12'
            },
            {
                id: '2',
                user: 'Yoda',
                rating: 9,
                comment: 'Great food great value!!.',
                date: '2024-06-23'
            }            
        ]        
    },
    {
        id: '4',
        name: 'Sabas Scillian Pizza Place',
        address: '789 Saba St, Columbia, MD  56565',
        phone: '555-444-4444',
        menu: [
            {
                id: '1',
                name: 'Pepperoni Pizza',
                description: 'A delicious pepperoni pizza.',
                price: 9.99,
            },
            {
                id: '2',
                name: 'Margherita Pizza',
                description: 'Classic Margherita with fresh basil.',
                price: 8.99,
            },
            {
                id: '3',
                name: 'Spaghetti w/ meat sauce',
                description: 'Classic Spaghetti Noodles in a meat sauce.',
                price: 12.99,
            },
            {
                id: '4',
                name: 'Chicken Fettucci Alfredo',
                description: 'Fettucci Noodles in creamy Alfredo Sauce with grilled chicken.',
                price: 20.99,
            },
            {
                id: '5',
                name: 'Reg Fountain Drink',
                description: 'Fountain Drink.',
                price: 1.99,
            },
            {
                id: '6',
                name: 'Lg Fountain Drink',
                description: 'Fountain Drink.',
                price: 2.99,
            },
        ],
        reviews: [
            {
                id: 1,
                user: 'Mulder',
                rating: 10,
                comment: 'Amazing food and service, Great Pizza!!!',
                date: '2024-07-01'
            },
            {
                id: '2',
                user: 'Dana',
                rating: 9,
                comment: 'Great food great value!!.',
                date: '2024-07-21'
            }            
        ]        
    },

];

module.exports = { restaurants };

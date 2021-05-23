const { db, log } = require('server-framework')
const { public_host } = require('../config')

const init = async () => {
	const admin = await db.isEmpty()
	if (!admin) return
	const admin_id = admin._id

	log(log.DB, `Initialized products in database. This happens only one time.`)
	// Create admin user

	await db.createDiscount({
		discount: { code: 'alfred', percent: 100 },
		owner: admin_id
	})

	// 1
	let product = {
		name: 'Mug',
		price: 150,
		stock: 2300,
		availability: 2300,
		keywords: ['Drink', 'Tableware'],
		short_desc: 'Mug that is perfect for drinking coffee',
		long_desc: 'It keeps the heat well and comes with a nice handle that is good to hold in.' +
			' It is made to last a long time',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/0a32a0fa-db26-4bb7-b19a-8cad088015be.jpg`]
	}

	await db.createProduct({ product })

	// 2
	product = {
		name: 'Speaker 3000',
		price: 3500,
		stock: 450,
		availability: 450,
		keywords: ['Music'],
		short_desc: 'Speaker with deep and rich sound',
		long_desc: 'Fits any room and can be paired with up to four others of the same type to get surround sound. ' +
			'Provides a unique music experience',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/88d395a8-fd13-48a7-bafd-f8be0b1f1399.jpg`]
	}

	await db.createProduct({ product })

	// 3
	product = {
		name: 'Cutlery set',
		price: 500,
		stock: 1000,
		availability: 1000,
		keywords: ['Tableware'],
		short_desc: 'A set of cutleries for eating food',
		long_desc: 'The cutlery is durable and can be used for most dishes. The cutlery is stylish and can be' +
			' combined with many different plates',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/3ca58ea3-ec88-4650-90d7-dd475f68cf3a.jpg`]
	}

	await db.createProduct({ product })

	// 4
	product = {
		name: 'Running shoes terrain',
		price: 1800,
		stock: 230,
		availability: 230,
		keywords: ['Sport'],
		short_desc: 'Running shoes for running in the terrain',
		long_desc: 'The running shoes have good support and good grip on the surface with a rubber sole. ' +
			'They are very durable and are water repellent',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/998b3e60-5b50-4107-99b4-e857218dc20d.jpg`]
	}

	await db.createProduct({ product })

	// 5
	product = {
		name: 'Running shoes sprint',
		price: 2400,
		stock: 140,
		availability: 140,
		keywords: ['Sport'],
		short_desc: 'Running shoes made for high speed',
		long_desc: 'These running shoes are super light and are made to break records. They have good damping and ' +
			'have a carbon plate that gives it extra kick',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/70d98f38-bdf3-4108-95fa-7bd4265429df.jpg`]
	}

	await db.createProduct({ product })

	// 6
	product = {
		name: 'Camera c4000',
		price: 17500,
		stock: 78,
		availability: 78,
		keywords: ['Camera', 'Electronics'],
		short_desc: 'This camera takes high quality pictures',
		long_desc: 'High resolution sensor with 32.5 megapixels. 4K video that utilizes the entire sensor. ' +
			'Fully angled touch screen',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/53651358-dfd1-4cda-ac54-b1e7a44bf5c5.jpg`]
	}

	await db.createProduct({ product })

	// 7
	product = {
		name: 'Mouse Maser XDR',
		price: 1500,
		stock: 670,
		availability: 670,
		keywords: ['Electronics'],
		short_desc: 'Mice for productive work',
		long_desc: 'This mouse is designed for productive work in programming and movie editing. It has several ' +
			'smart functionalities to make the work more efficient',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/4ed73684-c2bd-4473-a67a-42d023e77cf2.jpg`]
	}

	await db.createProduct({ product })

	// 8
	product = {
		name: 'Keyboard Master XDR',
		price: 2200,
		stock: 450,
		availability: 450,
		keywords: ['Electronics'],
		short_desc: 'Keyboard for productive work',
		long_desc: 'This keyboard is designed for productive work in programming and movie editing. It has several ' +
			'smart functionalities to make the work more efficient',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/a7d3b695-828c-4673-9035-65a5dcc8d0d0.jpg`]
	}

	await db.createProduct({ product })

	// 9
	product = {
		name: 'Phone Stand',
		price: 200,
		stock: 1300,
		availability: 1300,
		keywords: ['Stand', 'Electronics'],
		short_desc: 'Stand to support phone and tablet',
		long_desc: 'This stand is perfect for online meetings and can support both phones and tablets. ' +
			'It is possible to adjust the angle',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/11001eaa-12fc-473a-a0ef-46208b87e6d9.jpg`]
	}

	await db.createProduct({ product })

	// 10
	product = {
		name: 'Face mask',
		price: 25,
		stock: 5000,
		availability: 5000,
		keywords: ['Health'],
		short_desc: 'Face mask to protect against germs',
		long_desc: 'Face mask that can be used several times and can be washed. The mask sits comfortably but ' +
			'tight on the face. It also has style',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/a65b3d19-41d0-415f-9c9e-c30ed86cf266.jpg`]
	}

	await db.createProduct({ product })

	// 11
	product = {
		name: 'Coffee machine',
		price: 5200,
		stock: 340,
		availability: 340,
		keywords: ['Drink', 'Electronics'],
		short_desc: 'This elegant machine makes good coffee',
		long_desc: 'The machine is fully automatic and eliminates the brewing itself. All you have to do is choose ' +
			'settings and sit back and enjoy the good taste',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/0d76f0b2-4b14-498d-9cd0-7a1cbfd3aded.jpg`]
	}

	await db.createProduct({ product })

	// 12
	product = {
		name: 'USB-C cable',
		price: 250,
		stock: 1232,
		availability: 1232,
		keywords: ['Electronics', 'Cables'],
		short_desc: 'USB-C cable for fast data transfer',
		long_desc: 'USB-C is compact and thus fits even on small devices. What is extra practical is that USB-C ' +
			'can be connected both ways, so you do not have to guess and try and make mistakes ' +
			'when attaching the cable',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/2a041ea3-cd7d-4dbc-9772-7ce80fc8d723.jpg`]
	}

	await db.createProduct({ product })

	// 13
	product = {
		name: 'Thunderbolt cable',
		price: 600,
		stock: 750,
		availability: 750,
		keywords: ['Electronics', 'Cables'],
		short_desc: 'Thunderbolt for extremely fast data transfer',
		long_desc: 'It supports high-resolution displays and high-performance data transfers through a single port',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/d0dc4e6f-c830-466f-81de-05cf4a98d8f7.jpg`]
	}

	await db.createProduct({ product })

	// 14
	product = {
		name: 'Gaming controller',
		price: 500,
		stock: 2000,
		availability: 2000,
		keywords: ['Gaming', 'Electronics'],
		short_desc: 'Gaming controller for gaming consoles',
		long_desc: 'This game controller is compatible with all consoles and can also be paired with a PC. ' +
			'With two you can play multiplayer',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/e81b05f7-00b7-407f-94b0-7f3a698298f6.jpg`]
	}

	await db.createProduct({ product })

	// 15
	product = {
		name: 'Wireless charger',
		price: 750,
		stock: 780,
		availability: 780,
		keywords: ['Electronics', 'Cables'],
		short_desc: 'Wireless charger for mobile phones and other devices that support it',
		long_desc: 'With wireless charging, you do not have to worry about wires. All you have to do is ' +
			'place the device on top and it starts charging',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/4314de29-8606-4402-a994-2d6891ba1a30.jpg`]
	}

	await db.createProduct({ product })

	// 16
	product = {
		name: 'Bottle',
		price: 150,
		stock: 1100,
		availability: 1100,
		keywords: ['Drink'],
		short_desc: 'Bottle that you can take with you anywhere',
		long_desc: 'This bottle keeps your drink cold and refreshing. It does not leak and is elegant and nice',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/bc5a2f1c-fb41-454c-9847-03529fc36f50.jpg`]
	}

	await db.createProduct({ product })

	// 17
	product = {
		name: 'Portable speaker',
		price: 1750,
		stock: 800,
		availability: 800,
		keywords: ['Music', 'Electronics'],
		short_desc: 'This portable speaker has great sound in a small body',
		long_desc: 'This speaker is perfect to take to the park. It has deep bass in addition to high ' +
			'clear tones. Very clear vocals',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/2f7f6b73-c20e-498b-ad0a-a3f8e7d36101.jpg`]
	}

	await db.createProduct({ product })

	// 18
	product = {
		name: 'One-Two-Tree Polaroid M2',
		price: 4000,
		stock: 300,
		availability: 300,
		keywords: ['Electronics', 'Camera'],
		short_desc: 'The latest affordable and eco-friendly polaroid camera',
		long_desc: 'The One-Two-Tree Polaroid M2 camera is the latest in the line of polaroid cameras' +
			' from OneStep, and the most affordable and environmentally friendly yet! 70% of the material ' +
			'used in every One-Two-Tree is fully recycled, not including the 500 pieces of polaroid ' +
			'film which are made from 100% recycled material. Every buyer can send a request for another ' +
			'packet of 500 pieces of film and only pay for the shipping!',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/96c3e6e8-3bff-4664-abe9-8436f137b32e.jpg`]
	}

	await db.createProduct({ product })

	// 19
	product = {
		name: 'Jaguar Elite N1 Tennis Racket',
		price: 1500,
		stock: 200,
		availability: 200,
		keywords: ['Sport'],
		short_desc: 'Top grade tennis racket for amatuer and pro use',
		long_desc: 'Perfect for any new or experienced player looking to get a durable racket with one of the best ' +
			'grips around. New griptape gives great airflow and greatly reduces sweat buildup for the maximum grip.' +
			' Get this high grade racket for this great price today! Tennis ball not included',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/fcc60e8e-3e61-4e96-b645-5a55b108fafc.jpg`]
	}

	await db.createProduct({ product })

	// 20
	product = {
		name: 'Blueberry vase',
		price: 500,
		stock: 100,
		availability: 100,
		keywords: ['Decor'],
		short_desc: 'Beautiful fully handmade vase for medium sized plants',
		long_desc: 'This handcrafted vase is also painted by hand. Made to perfectly fit plants that are too big' +
			' for small pots and too small for larger pots, this vase can bring color and warmth both inside and' +
			' outside your home. Made extra tall to encourage deeper and longer surviving roots',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/071fb7de-44cd-4b1c-8ca7-defb12d04faa.jpg`]
	}

	await db.createProduct({ product })

	// 21
	product = {
		name: 'StrawPOLE Fishing Rod',
		price: 3200,
		stock: 490,
		availability: 490,
		keywords: ['Sport'],
		short_desc: 'Classic flexible yet sturdy carbon-based fishing pole ',
		long_desc: 'A great fishing pole for all-round use! The carbon-based rod gives opportunity for hunting' +
			' bigger game as the sturdy and flexible rod can bend 100 degrees and hold up to 30kg of weight.' +
			' The classic reel mechanism you got used to when you first tried fishing and a high quality rod ' +
			'all in one great product!',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/d2022e7a-e23c-44ed-9017-f9275577a33f.jpg`]
	}

	await db.createProduct({ product })

	// 22
	product = {
		name: 'Head Bust Bookend',
		price: 300,
		stock: 500,
		availability: 500,
		keywords: ['Decor'],
		short_desc: 'Simple and enlightening bookend perfect for your shelf',
		long_desc: 'Enlighten your books by keeping them upright with the mind of a great philosopher. ' +
			'A pleasing bookend perfect for any bookshelf missing some personality or has empty space to fill. ' +
			'Will also contribute to an aesthetically satisfying look if paired with small potted ' +
			'plants or other greenery',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/4891d621-107c-4151-80b2-ddc06d1d4d50.jpg`]
	}

	await db.createProduct({ product })

	// 23
	product = {
		name: 'VictoriaBronze Pocket Watch',
		price: 1000,
		stock: 50,
		availability: 50,
		keywords: ['Watch'],
		short_desc: 'Stylish and intricate pocket watch for great price',
		long_desc: 'This beautiful pocket watch is made with purposely low-polished bronze to give a convincing' +
			' victorian era feel of antiquity. With an intricate design and durable chain, this pocket watch ' +
			'gives astounding value for the price. Spare parts may be available if needed',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/9d0b0eb3-7fe4-48a1-b59f-248d5c9938ab.jpg`]
	}

	await db.createProduct({ product })

	// 24
	product = {
		name: 'RedWire Pro 12 Film Camera',
		price: 24099,
		stock: 490,
		availability: 490,
		keywords: ['Camera', 'Electronics'],
		short_desc: 'Professional grade video camera',
		long_desc: 'For a great price you can get your hands on the widely used RedWire Pro 12 and ready for ' +
			'some hands-on film work. Shoot film and video in Hollywood quality with a single amazing camera. ' +
			'The handle and supports leave no need for extra equipment to carry around',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/1428675a-32db-4ced-a857-1a321bc0347a.jpg`]
	}

	await db.createProduct({ product })

	// 25
	product = {
		name: 'Swirl 3 Record Player',
		price: 3000,
		stock: 300,
		availability: 300,
		keywords: ['Music', 'Electronics'],
		short_desc: 'Minimalistic and stylish vinyl record player',
		long_desc: 'Offering a simple design and great audio quality for its size, the SwirlVictrola 3 is a ' +
			'fantastic choice for anyone looking for an affordable yet stylish and effective record player. ' +
			'Fits perfectly on bookshelves or TV shelves. Vinyl records and radio featured in ' +
			'the picture are not included',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/7c4be451-a408-48bb-8a1a-873452e41fd3.jpg`]
	}

	await db.createProduct({ product })

	// 26
	product = {
		name: 'Dark Academia Globe',
		price: 7000,
		stock: 400,
		availability: 400,
		keywords: ['Decor'],
		short_desc: 'Jet black spinnable globe brings mood to your study ',
		long_desc: 'Get yourself this moody globe to bring the perfect aesthetic to your study room or home. ' +
			'While not being intrusively big it is also very detailed, having borders, country names and ' +
			'even major cities listed in the geographically correct positions. It’s made of black marble ' +
			'and the upholding is of painted steel',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/178afb3a-f4fc-4529-bbe1-152f3c6f3d21.jpg`]
	}

	await db.createProduct({ product })

	// 27
	product = {
		name: 'Champions Cup 2022',
		price: 1500,
		stock: 1000,
		availability: 1000,
		keywords: ['Sport'],
		short_desc: 'Next year’s Champions Cup official ball',
		long_desc: 'Available for early-bird purchase, it’s the Champions Cup official match ball. Want to ' +
			'stay ahead of the game? The patterned skin of the ball prevents slips and sliding when kicked, ' +
			'even in rain! You can be sure that this ball will hit where you aim and help you get your ' +
			'training done right. Only available in one colour',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/1b882e2a-6a25-41e2-a1f5-4b1673eb56a0.jpg`]
	}

	await db.createProduct({ product })

	// 28
	product = {
		name: 'Fender Classic Black 5 Guitar',
		price: 6400,
		stock: 145,
		availability: 145,
		keywords: ['Music', 'Decor'],
		short_desc: 'Metal string guitar for beginners',
		long_desc: 'A great beginner or intermediate acoustic guitar for beginners. In-built compatibility ' +
			'with amps make this an all-round useful and great guitar. Perfect for starting out your training ' +
			'with metal strings or for the stage with a need for acoustic sound. Will be packaged and labeled ' +
			'correctly for the least amount of damage possible during shipping',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/c935467c-10d5-4041-bf5d-84353b5dc8f2.jpg`]
	}

	await db.createProduct({ product })

	// 29
	product = {
		name: 'Odin’s Viking Coffee Mugs',
		price: 200,
		stock: 570,
		availability: 570,
		keywords: ['Drink', 'Tableware'],
		short_desc: 'Awesome viking compass coffee mug',
		long_desc: 'Bring Odin into your morning routine with this awesome viking compass coffee mug. The viking ' +
			'compass is known as the symbol of guidance and protection in norse mythology, so let its power guide ' +
			'and protect you during the day ahead. With a slightly rough texture and an added, and removable, ' +
			'rope handle, this mug looks like it is straight out of the neighbouring viking village',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/bb128b9a-e7f8-44e3-9bb6-f2b91435ee01.jpg`]
	}

	await db.createProduct({ product })

	// 30
	product = {
		name: 'Stand-A-Phone iPhone stand',
		price: 1100,
		stock: 620,
		availability: 620,
		keywords: ['Electronics', 'Stand'],
		short_desc: 'Effective charging stand for iPhone',
		long_desc: 'Stand your iPhone up proud and show it off to the world and yourself while charging it ' +
			'or use it as an extra screen for information when working. Made of hard plastics, this is ' +
			'a durable and stylish stand for your phone. The charger can also be removed if wanted, making ' +
			'it easy to prop up your phone anywhere at any time',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/6b5e8e62-9b9e-4c2f-9a18-14c308ab801d.jpg`]
	}

	await db.createProduct({ product })

	// 31
	product = {
		name: 'Rip-Rail Skateboard',
		price: 900,
		stock: 430,
		availability: 430,
		keywords: ['Sport'],
		short_desc: 'Simple, but high quality skateboard',
		long_desc: 'Great skateboard for anyone into skating, beginner, intermediate or advanced doesn’t matter,' +
			' a great board either way. The one shown in the picture is well used, and shows off the absolutely' +
			' top-notch durability of the underside art and the wheels. The trucks are of course able to be' +
			' changed out, same with wheels and griptape',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/6b0b72fa-575e-4263-adc3-58565bd392e3.jpg`]
	}

	await db.createProduct({ product })

	// 32
	product = {
		name: 'GravelRazor 15 Bicycle',
		price: 12999,
		stock: 150,
		availability: 150,
		keywords: ['Sport'],
		short_desc: 'Sturdy racing bike, great for marathons and casual use',
		long_desc: 'Light and fast racing bike composed of carbon-based materials. Perfect for long ' +
			'distance racing over more level ranges. The design of the handle is made to support a bigger ' +
			'chunk of the upper body weight so as to give the cyclist less strain and tension on the seat. ' +
			'Of course great for casual use as well, with a simple but still intriguing color scheme ' +
			'and the possibility to attach a bell on the handle',
		owner: admin_id,
		images: [`http://${public_host}/usercontent/0e129e7d-ab3e-4fb5-84c4-30ba9ddf89af.jpg`]
	}

	await db.createProduct({ product })


}

module.exports = init

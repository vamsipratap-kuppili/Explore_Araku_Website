/* ===== EXPLORE ARAKU – script.js ===== */

/* ---------- Helpers ---------- */
// Stand-in photos from keyword search. Replace with your own files, e.g. "images/borra-caves.jpg".
const img = (kw, n) => `https://loremflickr.com/800/600/${kw}?lock=${n}`;
// Local photo first (your own files, same folder); falls back to a stand-in photo if the file is missing
const pic = (file, kw, n, alt) => {
  const localImage = file
    ? `images/${file}`
    : img(kw, n);

  return `
    <img
      src="${encodeURI(localImage)}"
      data-fb="${img(kw, n)}"
      alt="${alt}"
      loading="lazy"
    >
  `;
};const $ = (s) => document.querySelector(s);
const mapSrc = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
const tpl = (arr, fn) => arr.map(fn).join('');
const li = (arr) => `<ul>${tpl(arr, (x) => `<li>${x}</li>`)}</ul>`;

/* ---------- DATA: places ----------
   Every place uses the same format. To add one, copy an entry and edit it.
   thumb / imgs are image files kept in the same folder as index.html. */
const places = [
 { id:'borra', name:'Borra Caves', kw:'cave,limestone', loc:'Ananthagiri, ~30 km from Araku',
  thumb:'borracaves3.jpeg',                 // card + sidebar photo
  imgs:['borracaves3.jpeg','borracaves6.jpeg','borracaves5.jpeg'], // 3 photos shown in one row on the place page
  short:'Million-year-old limestone caves with stunning stalactites and stalagmites.',
  desc:'Borra Caves (Borra Guhalu) are among the largest caves in India, formed by the Gosthani river cutting through limestone over millions of years. Inside, coloured lights reveal natural formations that locals link to Shiva and Hindu mythology. The caves sit at about 700 m elevation and are surrounded by Eastern Ghats forest.',
  best:'October to February. Avoid heavy-rain days, when the cave floor can be slippery.',
  todo:['Walk the lit cave pathway (about 45 minutes)','Photograph the rock formations','Shop for bamboo crafts at the entrance','Ride the Vizag–Araku train that passes the caves'],
  near:['Katiki Waterfalls','Tyda Nature Camp','Ananthagiri coffee plantations'] },
 { id:'chaparai', name:'Chaparai Waterfalls', kw:'waterfall,rocks', loc:'Near Araku–Visakhapatnam road',
  thumb:'chaparai4.jpeg',                 // card + sidebar photo
  imgs:['chaparai1.jpeg','chaparai3.jpeg','chaparai2.jpeg'], // 3 photos shown in one row on the place page
  short:'A natural rock-slide cascade loved by families and photographers.',
  desc:'Chaparai, signposted “The Cascade”, is a series of stepped cascades where the stream slides smoothly over wide boulders. In the monsoon the flow is strong and powerful; after the rains it becomes a gentle, safe spot where visitors sit on the rocks and enjoy the cool water.',
  best:'August to December for good water flow. Always check conditions before entering the water.',
  todo:['Enjoy the natural rock slide in shallow zones','Picnic by the stream','Take photos of the cascade','Try roadside snacks and fresh roasted corn'],
  near:['Katiki Waterfalls','Borra Caves','Padmapuram Gardens'] },
 { id:'katiki', name:'Katiki Waterfalls', kw:'waterfall,forest', loc:'Near Borra Caves, Ananthagiri',
  thumb:'katikimain.jpeg',                 // card + sidebar photo
  imgs:['katiki2.jpeg','katiki4.jpeg','katiki3.jpeg'], // 3 photos shown in one row on the place page
  short:'A forest waterfall reached by a scenic trek, close to Borra Caves.',
  desc:'Katiki Waterfalls is a picturesque fall where the Gosthani river tumbles over rock in a green, forested gorge. Visitors follow a short trail through bamboo and coffee groves before reaching a pool at the base, which makes this a popular picnic and photography stop.',
  best:'July to January. The fall is at its fullest just after monsoon.',
  todo:['Trek down to the waterfall','Take a dip only in marked safe areas','Photograph the gorge','Stop at the nearby Katiki viewpoint'],
  near:['Borra Caves','Tyda Jungle Bells','Araku Tribal Museum'] },
 { id:'tarabu', name:'Tarabu Waterfalls', kw:'waterfall,river', loc:'Kommalakonda hills, near Araku',
  thumb:'tarabu6.jpeg',                 // card + sidebar photo
  imgs:['tarabu2.jpeg','tarabu3.jpeg','tarabu5.jpeg'], // 3 photos shown in one row on the place page
  short:'A tall, wide waterfall in the Kommalakonda hills, reached over rocks and ladders.',
  desc:'Tarabu Waterfalls drops in broad white curtains from a high rock face, ringed by dense forest in the Kommalakonda hills. Visitors reach the base over boulders and wooden ladders and gather on the rocks to watch the thundering water, which is strongest just after the monsoon. Wear shoes with good grip, keep clear of fast water and visit only in good weather.',
  best:'September to February.',
  todo:['Relax by the water','Short nature walks','Bird watching in the early morning','Picnic with local snacks'],
  near:['Borra Caves','Ananthagiri Hills','Katiki Waterfalls'] },
 { id:'galikonda', name:'Galikonda View Point', kw:'hills,viewpoint,sunrise', loc:'Galikonda, Chintapalli region',
  thumb:'galikonda2.jpeg',                 // card + sidebar photo
  imgs:['galikonda1.jpeg','galikonda4.jpeg','galikonda3.jpeg'], // 3 photos shown in one row on the place page
  short:'The 2nd highest peak in the Eastern Ghats (1,643 m) with sweeping hill views.',
  desc:'Galikonda is signposted by AP Tourism as the second-highest peak in the Eastern Ghats at 1,643 m, after Arama Konda (1,680 m). A railed viewing platform looks over layered green ridges and Araku Valley, and sunrise paints the clouds below you. The hill is windy and cool even in summer. Roads are narrow, so a local driver is a good idea.',
  best:'October to February, early morning for sunrise and clear skies.',
  todo:['Watch the sunrise','Panoramic photography','Pepper and coffee estate visits en route','Short trek to the top'],
  near:['Madagada','Lambasingi (“Kashmir of Andhra”)','Araku coffee estates'] },
 { id:'madagada', name:'Madagada', kw:'mist,sunrise,hills', loc:'Around 25 km from Araku',
  thumb:'madagada2.jpeg',                 // card + sidebar photo
  imgs:['madagada1.jpeg','madagada4.jpeg','madagada3.jpeg'], // 3 photos shown in one row on the place page
  short:'Famous for its misty sunrise views over rolling hills.',
  desc:'Madagada is a hill viewpoint known for its sea-of-clouds sunrise, when mist fills the valleys beneath the ridges. It is a favourite with photographers and campers, with tents pitched on the rocky hilltop. Sunrise crowds can be large on weekends and holidays, so arrive early for a good spot.',
  best:'November to February, before sunrise.',
  todo:['Sunrise photography','Camping under the stars','Forest walks','Visit tribal hamlets nearby'],
  near:['Galikonda View Point','Rana Jilleda','Araku Valley town'] },
 { id:'rana', name:'Rana Jilleda', kw:'waterfall,tropical', loc:'Near Ananthagiri, Araku region',
  thumb:'ranajilda1.jpeg',                 // card + sidebar photo
  imgs:['ranajilda2.jpeg','ranajilda4.jpeg','ranajilda3.jpeg'], // 3 photos shown in one row on the place page
  short:'A hidden forest waterfall that rewards adventurous travellers.',
  desc:'Rana Jilleda is a lesser-known waterfall surrounded by dense forest and rocky terrain. Getting there involves a short walk along tribal village paths, so wear sturdy footwear. The quiet and the natural pools make it a good place for explorers wanting an offbeat spot.',
  best:'August to January.',
  todo:['Trek through forest trails','Photograph the falls','Interact with local tribal villagers','Bird watching'],
  near:['Madagada','Katiki Waterfalls','Ananthagiri'] },
 { id:'coffee', name:'Araku Coffee Plantations', kw:'coffee,plantation', loc:'Across Araku Valley',
  thumb:'coffeplantation1.jpeg',                 // card + sidebar photo
  imgs:['coffeplantation4.jpeg','ArakuCoffe05.jpg','coffeplantation5.jpeg'], // 3 photos shown in one row on the place page
  short:'Shade-grown Arabica estates tended by tribal farmers.',
  desc:'Araku coffee is grown organically under silver-oak shade by tribal farmers, and is known worldwide for its smooth, fruity taste. Walk through the estates, watch the harvest between November and January, and tour the processing units. The Araku Coffee Museum tells the story from bean to cup. Pepper vines climb the silver-oak trunks along the paths, with roadside stalls, thatched huts and a bird’s-nest-style seat for photos.',
  best:'November to February for the harvest season and pleasant weather.',
  todo:['Guided plantation walk','Taste fresh Araku coffee','Buy beans from the Girijan Co-operative','Visit the Coffee Museum'],
  near:['Padmapuram Botanical Gardens','Tribal Museum','Ananthagiri'] },
 { id:'pinery', name:'Araku Pinery', kw:'pine,forest,camping', loc:'Araku Valley',
   thumb:'arakupinery.jpeg',                 // card + sidebar photo
  imgs:['arakupinery2.jpeg','arakupinery3.jpg','arakupinery4.jpeg'], // 3 photos shown in one row on the place page
  short:'A pine grove with nature camping, a treehouse deck and cool shaded trails.',
  desc:'Araku Pinery is a tall pine grove entered through a wooden arch and red-earth paths. Inside you will find a Nature Camping area with tents, a raised treehouse-style viewing deck among the trunks, signposted photo frames and a pre-wedding shoot area. The pines keep the air cool and shaded, making it popular for families, couples and photographers.',
  best:'October to February; mornings and late afternoons are the most pleasant.',
  todo:['Stay in a tent at the Nature Camping area','Climb the wooden viewing deck','Pose at the photo frames','Picnic and walk among the pines'],
  near:['Tribal Museum','Coffee Museum','Famous Church'] },
 { id:'duduma', name:'Duduma Waterfalls', kw:'waterfall,gorge', loc:'Machkund river, Andhra–Odisha border',
  thumb:'duduma1.jpeg',                 // card + sidebar photo
  imgs:['duduma2.jpeg','duduma4.jpeg','duduma3.jpeg'], // 3 photos shown in one row on the place page
  short:'A tall, powerful fall on the Machkund river, set in deep forest.',
  desc:'Duduma is one of the highest waterfalls in the region, formed where the Machkund river drops into a deep gorge on the Andhra–Odisha border. It is a longer day trip from Araku, but the scale of the fall and the surrounding forest make it worthwhile. Check road and entry conditions before you set out.',
  best:'August to December, when the flow is strongest.',
  todo:['Viewpoint photography','Forest drive on the way','Picnic near the viewing area','Combine with a Galikonda or Madagada trip'],
  near:['Galikonda View Point','Madagada','Araku Coffee Plantations'] },
 { id:'tribal', name:'Tribal Museum', kw:'tribal,museum,culture', loc:'Araku town',
  thumb:'tribalmuseum2.jpeg',                 // card + sidebar photo
  imgs:['tribalmuseum4.jpeg','tribalmuseum1.jpeg','tribalmuseum6.jpeg'], // 3 photos shown in one row on the place page
  short:'Exhibits on tribal dress, ornaments, tools and traditions.',
  desc:'The Tribal Museum in Araku showcases the heritage of the local tribal communities with traditional costumes, jewellery, weapons, musical instruments and household items, along with life-size dioramas of hunting, gathering and village life, inside a distinctive round red-brick building. Cultural Dhimsa dance performances are often held close by in the evenings.',
  best:'Year-round; ideal for a relaxed morning or a rainy afternoon.',
  todo:['Explore the exhibits','Buy tribal handicrafts','Watch Dhimsa dance when scheduled','Learn about the tribes of the Eastern Ghats'],
  near:['Coffee Museum','Padmapuram Gardens','Araku Pinery'] },
 { id:'cmuseum', name:'Coffee Museum', kw:'coffee,museum,cafe', loc:'Araku town',
  thumb:'coffemeseum1.jpeg',                 // card + sidebar photo
  imgs:['coffemuseum4.jpeg','coffemuseum2.jpeg','coffemuseum5.jpeg'], // 3 photos shown in one row on the place page
  short:'The story of Araku coffee, from the plant to your cup.',
  desc:'The Coffee Museum follows the coffee journey “from Ethiopia to Araku Valley, seed to cup”, explaining how Araku Arabica is grown, harvested and processed by tribal farmers, with sculpture panels telling the story, a coffee flavour wheel and displays of processing methods. A coffee house on site serves freshly brewed Araku coffee and sells beans and gifts.',
  best:'Year-round; November to February for the best weather.',
  todo:['Learn the coffee journey','Taste fresh brewed coffee','Buy roasted beans as souvenirs','Combine with a plantation walk'],
  near:['Araku Coffee Plantations','Tribal Museum','Chocolate Factory'] },
 { id:'choco', name:'Chocolate Factory', kw:'chocolate,factory', loc:'Araku Valley',
  thumb:'chocolatefactory4.jpeg',                 // card + sidebar photo
  imgs:['chocolatefactory3.jpeg','chocolatefactory4.jpeg','chocolatefactory2.jpeg'], // 3 photos shown in one row on the place page
  short:'A sweet stop to see chocolate-making and buy local treats.',
  desc:'This small chocolate-making unit lets visitors see how chocolate is made and sample and buy locally produced bars. It is a fun stop for families, and the chocolates make easy gifts. A colourful entrance with cocoa characters welcomes you, and hands-on tables show chocolates being poured and decorated. Visiting hours can change, so please confirm locally.',
  best:'Year-round during daytime hours.',
  todo:['See the chocolate-making process','Sample and buy chocolates','Pair with Araku coffee','Pick up local gifts'],
  near:['Coffee Museum','Tribal Museum','Araku Pinery'] },
 { id:'church', name:'Famous Church', kw:'church,india,hills', loc:'Sunkarimetta hill, near Araku',
  thumb:'arakuchurch.jpeg',                 // card + sidebar photo
  imgs:['arakuchurch2.jpeg','arakuchurch3.jpeg','arakuchurch4.jpeg'], // 3 photos shown in one row on the place page
  short:'A red-and-white hilltop church with a bell tower and wide hill views.',
  desc:'Locally known as Sunkarimetta Church, this hilltop church stands on an open, breezy ridge. It has a stone-and-brick nave with blue shutters and arched red-trimmed windows, and a white bell tower topped by a cross. Visitors come for the views, the calm, and photographs against the surrounding hills. Please dress modestly and respect worshippers.',
  best:'Early morning or evening; avoid heavy rain when the track is muddy.',
  todo:['Quiet visit and photography','Enjoy views over the hills','Respect prayer times','Combine with Araku Pinery'],
  near:['Araku Pinery','Tribal Museum','Coffee Museum'] },
 { id:'school', name:'Araku Famous School', kw:'school,village,india', loc:'Araku Valley',
  thumb:'arakuschool.jpeg',                 // card + sidebar photo
  imgs:['arakuschool1.jpeg','arakuschool2.jpeg','arakuschool3.jpeg'], // 3 photos shown in one row on the place page
  short:'The “Iconic School of Araku Valley”, famous for its colourful murals.',
  desc:'This government school stands out in the green countryside for its brightly painted building, with large murals of children reading and a cosmic scene of planets and space. It shows how education serves the tribal communities of the valley. If you wish to visit, please ask permission, respect students and teachers, and avoid disturbing classes.',
  best:'Visit only with permission, during school hours.',
  todo:['Photograph the murals from outside','Learn about local community life','Ask permission before entering','Respect school routines'],
  near:['Famous Church','Tribal Museum','Araku Pinery'] }
];

// Local photos for the Things to Do cards (same order as the list above; null = stand-in photo)
const TODO_IMG = ['galikonda4.jpeg','chaparai1.jpeg','ArakuCoffe05.jpg','arakupinery2.jpeg','madagada1.jpeg','tribalmuseum6.jpeg','trainjourney.jpg'];

/* ---------- DATA: things to do ---------- */
const todo = [
 ['Trekking','trek,hiking,hills','Trails around Galikonda, Rana Jilleda and Ananthagiri take you through forest, bamboo and tribal villages.'],
 ['Waterfalls','waterfall','Chaparai, Katiki and Tarabu are best after the monsoon. Stay out of fast water.'],
 ['Coffee Plantation Visits','coffee,plantation','Walk shaded estates and taste fresh Arabica at local coffee houses.'],
 ['Camping','camping,tent,forest','Camp at Madagada or Tyda under clear skies; many sites offer bonfires and tribal meals.'],
 ['Photography','landscape,sunrise,mist','Misty sunrises, green terraces and colourful tribal markets give great frames.'],
 ['Tribal Culture Experiences','tribal,dance,india','Watch the Dhimsa dance, visit the Tribal Museum and the weekly tribal market.'],
 ['Scenic Train Journey','train,railway,india','The Visakhapatnam–Araku route crosses 58 tunnels, 84 bridges and the Borra Caves stretch. Book the glass-roof Vistadome coach.']
];

/* ---------- DATA: food ---------- */
/* ===== YOUR PHOTOS FOR FOOD & STAY =====
   Put these files in the same folder as index.html (or change the names to your own files).
   If a file is missing, a stand-in photo is shown instead. null = use stand-in photo. */
const FOOD_IMG = [
 'bamboochiken1.jpeg',   // Bamboo Chicken
 'ragijava.jpeg',        // Ragi Java & Millet Meals
 'foresthoney.jpeg',       // Wild Honey & Forest Fruits
 'arakucofee.jpeg',     // Araku Coffee
 'upmapesarattu.jpeg',        // Pesarattu & Upma
 'andhrameals.jpeg',     // Andhra Meals
 'arakubiriyani.jpeg'   // Chicken Biryani
];
const STAY_IMG = [
 'haritharesorts.jpeg',            // Hotels
 'valleyviewresorts.jpeg',           // Resorts
 'tenthouses.jpeg',         // Homestays
 'arakupinery2.jpeg'     // Camping & Tents
];

const food = [
 ['tribal','Bamboo Chicken','bamboo,chicken,curry','Marinated chicken slow-cooked inside fresh bamboo over charcoal, a signature of Araku.'],
 ['tribal','Ragi Java &amp; Millet Meals','millet,porridge','Finger-millet porridge and millet dishes eaten daily by the local tribes.'],
 ['tribal','Wild Honey &amp; Forest Fruits','honey,jackfruit','Locally gathered honey, jackfruit and seasonal forest produce.'],
 ['andhra','Araku Coffee','coffee,cup','Smooth, aromatic Arabica served hot at cafés and the Araku Coffee House.'],
 ['andhra','Pesarattu &amp; Upma','dosa,breakfast,india','Green gram dosa served with ginger chutney – a classic Andhra breakfast.'],
 ['andhra','Andhra Meals','thali,india,rice','A full rice meal with pappu, gongura pachadi, spicy curries and curd.'],
 ['andhra','Chicken Biryani','biryani','Fragrant, spicy Andhra-style biryani, found in most Araku restaurants.']
];

/* ---------- DATA: stay ---------- */
const stay = [
 ['Hotels','Haritha Hill Resort-style Hotels','hotel,room','Comfortable mid-range hotels in Araku town close to the market and station.',['Wi-Fi','AC rooms','Restaurant','Parking'],'₹1,800 – ₹4,000'],
 ['Resorts','Valley-view Resorts','resort,hills','Hillside resorts with garden views, cottages and relaxing spaces.',['Cottages','Pool (select)','Bonfire','Guided treks'],'₹3,500 – ₹8,000'],
 ['Homestays','Tribal-run Homestays','homestay,village,india','Stay with local families and enjoy home-cooked tribal meals.',['Home food','Village walks','Cultural evenings','Basic rooms'],'₹800 – ₹2,000'],
 ['Camping','Camping &amp; Tents','camping,tent','Tents with beds at Madagada and Tyda for stargazing and bonfire nights.',['Tents','Bonfire','Barbecue','Shared washrooms'],'₹1,200 – ₹3,000']
];

/* ---------- DATA: gallery ---------- */
const galCats = ['All','Mountains','Waterfalls','Coffee','Caves','Tribal Villages','Railway','Sunrise/Sunset'];
const gallery = [
 ['Mountains','mountains,hills','Eastern Ghats ridges','galikonda1.jpeg'],['Mountains','valley,mist','Madagada viewpoint','madagada1.jpeg'],['Mountains','camping,hills','Hilltop camping at Madagada','madagada4.jpeg'],['Mountains','viewpoint','Galikonda viewing platform','galikonda1.jpeg'],
 ['Waterfalls','waterfall','Chaparai cascade','chaparai1.jpeg'],['Waterfalls','waterfall,stream','Katiki Waterfalls','katiki2.jpeg'],
 ['Waterfalls','waterfall,gorge','Duduma Waterfalls','duduma2.jpeg'],['Waterfalls','waterfall','Tarabu Waterfalls','tarabu6.jpeg'],['Waterfalls','waterfall','Rani Duduma Waterfalls','raniduduam2.jpeg'],['Waterfalls','waterfall','Chaparai river','chaparai5.jpeg'],
 ['Coffee','coffee,plantation','Coffee estate','coffeplantation4.jpeg'],['Coffee','coffee,beans','Coffee museum','coffemuseum2.jpeg'],['Coffee','coffee,cherries','Drying coffee cherries','ArakuCoffe05.jpg'],['Coffee','coffee,cherries','Ripe coffee cherries','coffeplantation5.jpeg'],
 ['Caves','cave,limestone','Lit passage in Borra Caves','borracaves3.jpeg'],['Caves','cave','Light inside the cave','borracaves1.jpeg'],['Caves','cave,stalactite','Limestone formations','borracaves5.jpeg'],
 ['Tribal Villages','tribal,village','Tribal Museum','tribalmuseum4.jpeg'],['Tribal Villages','dance,tribal','Tribal Museum building','tribalmuseum1.jpeg'],['Tribal Villages','tribal,village','Village life diorama','tribalmuseum5.jpeg'],['Tribal Villages','tribal,ritual','Traditional ceremony display','tribalmuseum3.jpeg'],
 ['Railway','train,railway','Araku railway','arakurailway.jpeg'],['Railway','tunnel,train','Train through the hills','trainthroughhills.jpeg'],
 ['Sunrise/Sunset','sunrise,mountains','Sunrise crowd at Madagada','madagada3.jpeg'],['Sunrise/Sunset','sunrise,clouds','Sunrise above the clouds','galikonda4.jpeg'],['Sunrise/Sunset','sunset,valley','Sunset glow','sunsetinaraku.jpeg']
];

/* ---------- Card renderers ---------- */
const thumb = (kw, n, alt) => `<div class="thumb"><img src="${img(kw, n)}" alt="${alt}" loading="lazy"></div>`;
const placeCard = (p, i) => `<article class="card"><div class="thumb">${pic(p.thumb, p.kw, i + 20, p.name)}</div><div class="body">
  <h3>${p.name}</h3><span class="tag">📍 ${p.loc}</span><p>${p.short}</p>
  <a class="btn sm" href="#place/${p.id}" data-link>Explore</a></div></article>`;

function renderStatic() {
  $('#featured').innerHTML = tpl(places.slice(0, 4), placeCard);
  $('#placeGrid').innerHTML = tpl(places, placeCard);
  $('#todoGrid').innerHTML = tpl(todo, (t, i) => `<article class="card"><div class="thumb">${pic(TODO_IMG[i], t[1], i + 40, t[0])}</div><div class="body"><h3>${t[0]}</h3><p>${t[2]}</p></div></article>`);
  $('#stayGrid').innerHTML = tpl(stay, (s, i) => `<article class="card"><div class="thumb">${pic(STAY_IMG[i], s[2], i + 60, s[1])}</div><div class="body">
    <span class="tag">${s[0]}</span><h3>${s[1]}</h3><p>${s[3]}</p>${li(s[4])}<span class="price">${s[5]} / night</span></div></article>`);

  $('#info').innerHTML = `
   <div class="box"><h3>🚆 How to Reach</h3>${li([
     '<b>By train:</b> The Visakhapatnam–Kirandul passenger passes through Araku (about 4–5 hrs). The Vistadome coach offers glass-roof views.',
     '<b>By road:</b> ~110–120 km from Visakhapatnam via Anantagiri (3–4 hrs). Buses and cabs run daily.'])}</div>
   <div class="box"><h3>🚉 Nearest Railway Station</h3><p>Araku station is on the line itself. The nearest major junction is Visakhapatnam (Vizag) Junction.</p>
     <h3>✈️ Nearest Airport</h3><p>Visakhapatnam Airport (VTZ), about 115 km away. Taxis to Araku take around 3.5 hours.</p></div>
   <div class="box"><h3>🌤 Best Time to Visit</h3><p><b>Oct–Feb:</b> cool, misty and ideal.<br><b>Jul–Sep:</b> lush green with strong waterfalls.<br><b>Mar–Jun:</b> warm; best for early mornings.</p></div>
   <div class="box"><h3>💡 Travel Tips</h3>${li(['Carry a light jacket for mornings and evenings','Book Vistadome tickets and stays early on weekends','Carry cash; ATMs and networks can be limited','Wear sturdy shoes for waterfalls and treks','Respect tribal villages: ask before photographing people','Take plastic waste back with you'])}</div>`;

  $('#itin').innerHTML = `
   <div class="box"><h3>📅 1-Day Itinerary</h3>${li(['6:00 AM – Train from Vizag (or drive)','10:30 AM – Reach Araku; coffee breakfast','11:30 AM – Tribal Museum &amp; Padmapuram Gardens','1:30 PM – Andhra lunch / bamboo chicken','3:00 PM – Coffee plantation walk','5:00 PM – Return journey'])}</div>
   <div class="box"><h3>📅 2-Day Itinerary</h3><p><b>Day 1:</b> Vistadome train, Tribal Museum, Padmapuram Gardens, Dhimsa dance and bonfire.</p>
    <p><b>Day 2:</b> Madagada sunrise, Galikonda viewpoint, coffee plantation, Katiki Waterfalls, Borra Caves, then return to Vizag.</p></div>`;

  // Tabs: food, gallery, map
  $('#foodTabs').innerHTML = ['all','tribal','andhra'].map((c, i) => `<button class="${i ? '' : 'on'}" data-f="${c}">${c === 'all' ? 'All' : c === 'tribal' ? 'Tribal Food' : 'Andhra Food'}</button>`).join('');
  showFood('all');
  $('#galTabs').innerHTML = galCats.map((c, i) => `<button class="${i ? '' : 'on'}" data-g="${c}">${c}</button>`).join('');
  showGallery('All');
  $('#mapTabs').innerHTML = `<button class="on" data-m="Araku Valley">All Araku</button>` + places.map((p) => `<button data-m="${p.name}, Araku">${p.name}</button>`).join('');
  $('#mainMap').src = mapSrc('Araku Valley, Andhra Pradesh');
}

function showFood(cat) {
  $('#foodGrid').innerHTML = tpl(food.filter((f) => cat === 'all' || f[0] === cat), (f, i) =>
    `<article class="card"><div class="thumb">${pic(FOOD_IMG[food.indexOf(f)], f[2], i + 80, f[1])}</div><div class="body"><span class="tag">${f[0] === 'tribal' ? 'Tribal' : 'Andhra'}</span><h3>${f[1]}</h3><p>${f[3]}</p></div></article>`);
}
function showGallery(cat) {
  $('#galGrid').innerHTML = tpl(gallery.filter((g) => cat === 'All' || g[0] === cat), (g, i) =>
    `<figure>${pic(g[3], g[1], i + 100, g[2])}<figcaption>${g[2]}</figcaption></figure>`);
}

/* ---------- Place detail page ---------- */  
function showPlace(id) {
  const p = places.find((x) => x.id === id) || places[0];
  const k = places.indexOf(p);

  $('#placeDetail').innerHTML = `
    <div class="pl-layout">
      <div class="pl-main">

        <button class="back" onclick="location.hash='#places'">
          ← Back to Places
        </button>

        <h2>${p.name}</h2>
        <span class="tag">📍 ${p.loc}</span>

        <div class="trio">
          ${[0, 1, 2].map((n) => `
            <div>
              ${pic(
                p.imgs && p.imgs[n],
                p.kw,
                k * 5 + n + 200,
                p.name + ' view ' + (n + 1)
              )}
            </div>
          `).join('')}
        </div>

        <div class="detail">
          <div class="col">
            <div class="box">
              <h3>About ${p.name}</h3>
              <p>${p.desc}</p>
            </div>

            <div class="box">
              <h3>📍 Location</h3>
              <p>${p.loc}</p>
              <iframe class="map"
                src="${mapSrc(p.name + ', Araku Valley')}"
                title="Map of ${p.name}"
                loading="lazy">
              </iframe>
            </div>
          </div>

          <div class="col">
            <div class="box">
              <h3>🌤 Best Time to Visit</h3>
              <p>${p.best}</p>
            </div>

            <div class="box">
              <h3>🎯 Things to Do</h3>
              ${li(p.todo)}
            </div>

            <div class="box">
              <h3>🧭 Nearby Attractions</h3>
              ${li(p.near)}
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}


/* ---------- Router: hash-based page switching ---------- */
function route() {
  const [page, arg] = (location.hash.slice(1) || 'home').split('/');
  const target = document.getElementById(page) ? page : 'home';
  if (target === 'place') { showPlace(arg); setTimeout(() => document.querySelector('.sitem.on')?.scrollIntoView({ block: 'nearest', inline: 'center' }), 50); }
  document.querySelectorAll('.view').forEach((v) => v.classList.toggle('active', v.id === target));
  document.querySelectorAll('#menu a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + (target === 'place' ? 'places' : target)));
  $('#menu').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- Events ---------- */
document.addEventListener('click', (e) => {
  const t = e.target;
  // Tab buttons
  const tab = t.closest('.tabs button');
  if (tab) {
    tab.parentElement.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === tab));
    if (tab.dataset.f) showFood(tab.dataset.f);
    if (tab.dataset.g) showGallery(tab.dataset.g);
    if (tab.dataset.m) $('#mainMap').src = mapSrc(tab.dataset.m);
  }
  // Lightbox
  const fig = t.closest('.gallery figure, .trio div');
  if (fig) { $('#lbImg').src = fig.querySelector('img').src; $('#lb').classList.add('open'); }
  if (t.id === 'lb' || t.id === 'lbClose') $('#lb').classList.remove('open');
});
document.addEventListener('keydown', (e) => e.key === 'Escape' && $('#lb').classList.remove('open'));
$('#burger').addEventListener('click', () => $('#menu').classList.toggle('open'));
$('#top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => $('#top').classList.toggle('show', scrollY > 500));
window.addEventListener('hashchange', route);

// Fallback: if a remote image fails, keep the green gradient background instead of a broken icon
document.addEventListener('error', (e) => {
  const im = e.target;
  if (im.tagName !== 'IMG') return;
  if (im.dataset.fb && !im.dataset.tried) { im.dataset.tried = 1; im.src = im.dataset.fb; } else im.style.visibility = 'hidden';
}, true);

renderStatic();
route();

import express from "express";
import dotenv from "dotenv";
import { randomUUID } from "crypto";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const PORT = process.env.PORT || 3000;

// ==========================================
// MOVIE DATABASE
// ==========================================

const movieDatabase = [
    "Finding Nemo",
    "Toy Story",
    "Shrek",
    "Frozen",
    "The Lion King",
    "Inside Out",
    "Up",
    "Coco",
    "Moana",
    "Ratatouille",
    "Despicable Me",
    "Kung Fu Panda",
    "The Incredibles",
    "Cars",
    "Monsters Inc.",
    "WALL-E",
    "Zootopia",
    "Tangled",
    "Aladdin",
    "Beauty and the Beast",
    "How to Train Your Dragon",
    "The Super Mario Bros. Movie",
    "Spider-Man: Into the Spider-Verse",
    "Harry Potter and the Sorcerer's Stone",
    "Jumanji",
    "Home Alone",
    "Charlie and the Chocolate Factory",
    "The Jungle Book",
    "Madagascar",
    "The Lego Movie",
    "Big Hero 6",
    "Encanto",
    "Puss in Boots",
    "The Little Mermaid",
    "The Wizard of Oz",
    "Paddington",
    "The Polar Express",
    "Night at the Museum",
    "The Secret Life of Pets",
    "Shrek 2",
    "Kung Fu Panda 2",
    "Frozen 2",
    "Finding Dory",
    "Incredibles 2",
    "Cars 2",
    "Cars 3",
    "The Croods",
    "The Boss Baby",
    "Sing",
    "Sing 2",
    "The Bad Guys",
    "Elemental",
    "Turning Red",
    "Luca",
    "Soul",
    "The Mitchells vs. the Machines",
    "Cloudy with a Chance of Meatballs",
    "Hotel Transylvania",
    "The Grinch",
    "Despicable Me 2",
    "Toy Story",
"Toy Story 2",
"Toy Story 3",
"Finding Nemo",
"Finding Dory",
"Monsters, Inc.",
"Monsters University",
"The Incredibles",
"Incredibles 2",
"Cars",
"Inside Out",
"Inside Out 2",
"Coco",
"Ratatouille",
"WALL-E",
"Up",
"Luca",
"Turning Red",
"Elemental",
"A Bug's Life",
"The Lion King",
"Aladdin",
"The Little Mermaid",
"Beauty and the Beast",
"Mulan",
"Tangled",
"Frozen",
"Frozen II",
"Moana",
"Moana 2",
"Zootopia",
"Wreck-It Ralph",
"Ralph Breaks the Internet",
"The Princess and the Frog",
"Encanto",
"Lilo & Stitch",
"The Emperor's New Groove",
"Meet the Robinsons",
"Big Hero 6",
"Raya and the Last Dragon",
"Shrek",
"Shrek 2",
"Kung Fu Panda",
"Kung Fu Panda 2",
"Kung Fu Panda 3",
"How to Train Your Dragon",
"How to Train Your Dragon 2",
"The Croods",
"Madagascar",
"The Penguins of Madagascar",
"The Super Mario Bros. Movie",
"Despicable Me",
"Despicable Me 2",
"Minions",
"The Lego Movie",
"The Lego Batman Movie",
"The Mitchells vs. the Machines",
"The Bad Guys",
"Puss in Boots: The Last Wish",
"The Wild Robot",
"The Iron Giant",
"Robots",
"Astro Boy",
"Next Gen",
"The Adventures of Jimmy Neutron: Boy Genius",
"Lightyear",
"Space Jam",
"Space Jam: A New Legacy",
"Home",
"The SpongeBob SquarePants Movie",
"Paddington",
"Paddington 2",
"Paddington in Peru",
"The Adventures of Tintin",
"The BFG",
"Matilda",
"The Parent Trap",
"Mary Poppins",
"Bedknobs and Broomsticks",
"Night at the Museum",
"The Muppets",
"The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
"The Secret Garden",
"The Karate Kid",
"Dolphin Tale",
"Babe",
"Stuart Little",
"Jumanji",
"The Wizard of Oz",
"Hugo",
"The Peanuts Movie",
"The Polar Express",
"Klaus",
"Arthur Christmas",
"The Grinch",
"The Lorax",
"Cloudy with a Chance of Meatballs",
"Cloudy with a Chance of Meatballs 2",
"The Sea Beast",
"The Little Prince",
"Finding Dory",
"Cars 2",
"Cars 3",
"Toy Story 4",
"Onward",
"Brave",
"The Good Dinosaur",
"Monsters at Work",
"Abominable",
"Smallfoot",
"Rise of the Guardians",
"Over the Moon",
"Wish Dragon",
"The Monkey King",
"The Magician's Elephant",
"Orion and the Dark",
"Leo",
"Thelma the Unicorn",
"Ruby Gillman, Teenage Kraken",
"Migration",
"Despicable Me 3",
"Despicable Me 4",
"Minions: The Rise of Gru",
"Kung Fu Panda 4",
"Shrek the Third",
"Shrek Forever After",
"Madagascar: Escape 2 Africa",
"Madagascar 3: Europe's Most Wanted",
"Penguins of Madagascar",
"How to Train Your Dragon: The Hidden World",
"Spirit: Stallion of the Cimarron",
"Spirit Untamed",
"Over the Hedge",
"Flushed Away",
"Bee Movie",
"Antz",
"Chicken Run",
"Chicken Run: Dawn of the Nugget",
"Wallace & Gromit: The Curse of the Were-Rabbit",
"Wallace & Gromit: Vengeance Most Fowl",
"Shaun the Sheep Movie",
"Shaun the Sheep Movie: Farmageddon",
"Fantastic Mr. Fox",
"Isle of Dogs",
"The Boxtrolls",
"Coraline",
"ParaNorman",
"The Corpse Bride",
"Frankenweenie",
"The Nightmare Before Christmas",
"Corpse Bride",
"Monster House",
"Hotel Transylvania",
"Hotel Transylvania 2",
"Hotel Transylvania 3: Summer Vacation",
"Hotel Transylvania: Transformania",
"Cloudy with a Chance of Meatballs",
"Open Season",
"Open Season 2",
"Open Season 3",
"Surf's Up",
"Surf's Up 2: WaveMania",
"Happy Feet",
"Happy Feet Two",
"Rio",
"Rio 2",
"Ice Age",
"Ice Age: The Meltdown",
"Ice Age: Dawn of the Dinosaurs",
"Ice Age: Continental Drift",
"Ice Age: Collision Course",
"Epic",
"Ferdinand",
"Spies in Disguise",
"Ron's Gone Wrong",
"Flora & Ulysses",
"Alexander and the Terrible, Horrible, No Good, Very Bad Day",
"Jungle Cruise",
"Christopher Robin",
"Pete's Dragon",
"Tomorrowland",
"The Sorcerer's Apprentice",
"Race to Witch Mountain",
"Journey to the Center of the Earth",
"Journey 2: The Mysterious Island",
"George of the Jungle",
"George of the Jungle 2",
"Cheaper by the Dozen",
"Cheaper by the Dozen 2",
"Yours, Mine & Ours",
"Freaky Friday",
"Freaky Friday (2003)",
"Because of Winn-Dixie",
"Mr. Popper's Penguins",
"Ramona and Beezus",
"Flubber",
"Richie Rich",
"Baby's Day Out",
"Home Alone",
"Home Alone 2: Lost in New York",
"Home Alone 3",
"Diary of a Wimpy Kid",
"Diary of a Wimpy Kid: Rodrick Rules",
"Diary of a Wimpy Kid: Dog Days",
"Diary of a Wimpy Kid: The Long Haul",
"Alexander and the Terrible, Horrible, No Good, Very Bad Day",
"Judy Moody and the Not Bummer Summer",
"Max Keeble's Big Move",
"Are We There Yet?",
"Are We Done Yet?",
"Yogi Bear",
"Alvin and the Chipmunks",
"Alvin and the Chipmunks: The Squeakquel",
"Alvin and the Chipmunks: Chipwrecked",
"Garfield: The Movie",
"Garfield: A Tail of Two Kitties",
"Peter Rabbit",
"Peter Rabbit 2: The Runaway",
"Clifford the Big Red Dog",
"Hotel for Dogs",
"Dr. Dolittle",
"Dr. Dolittle 2",
"Flipper",
"Free Willy",
"Free Willy 2: The Adventure Home",
"Air Bud",
"Air Bud: Golden Receiver",
"Air Bud: World Pup",
"Homeward Bound: The Incredible Journey",
"Homeward Bound II: Lost in San Francisco",
"The Shaggy Dog",
"Old Yeller",
"The Fox and the Hound",
"The Fox and the Hound 2",
"101 Dalmatians",
"102 Dalmatians",
"The Aristocats",
"Robin Hood",
"The Rescuers",
"The Rescuers Down Under",
"The Many Adventures of Winnie the Pooh",
"Winnie the Pooh",
"Tigger Movie",
"Pooh's Heffalump Movie",
"Christopher Robin",
"Planes",
"Planes: Fire & Rescue",
"Secret of the Wings",
"Tinker Bell",
"Tinker Bell and the Lost Treasure",
"Tinker Bell and the Great Fairy Rescue",
"Tinker Bell and the Pirate Fairy",
"Tinker Bell and the Legend of the NeverBeast",
"Barbie as The Princess and the Pauper",
"Barbie in the Nutcracker",
"Barbie: Fairytopia",
"Barbie: Mermaidia",
"Barbie and the Diamond Castle",
"Barbie: A Fashion Fairytale",
"Barbie: Princess Charm School",
"Barbie: The Princess & the Popstar",
"Barbie: A Fairy Secret",
"Barbie: Dolphin Magic",
"Barbie: Big City, Big Dreams",
"Barbie: Skipper and the Big Babysitting Adventure",
"Barbie: The Pearl Princess",
"Barbie: Spy Squad",
"Barbie: Star Light Adventure",
"Barbie: Dreamtopia",
"Barbie: Princess Adventure",
"Barbie: Mermaid Power",
"Barbie",
"Wonka",
"Charlie and the Chocolate Factory",
"Willy Wonka & the Chocolate Factory",
"The Witches",
"Roald Dahl's Matilda the Musical",
"Enchanted",
"Disenchanted",
"Ella Enchanted",
"Stardust",
"The Princess Diaries",
"The Princess Diaries 2: Royal Engagement",
"Mirror Mirror",
"Maleficent",
"Maleficent: Mistress of Evil",
"Descendants",
"Descendants 2",
"Descendants 3",
"Descendants: The Rise of Red",
"High School Musical",
"High School Musical 2",
"High School Musical 3: Senior Year",
"Teen Beach Movie",
"Teen Beach 2",
"Camp Rock",
"Camp Rock 2: The Final Jam",
"Zapped",
"Cloud 9",
"Adventures in Babysitting",
"Adventures in Babysitting (2016)",
"Secretariat",
"Queen of Katwe",
"The Mighty Ducks",
"D2: The Mighty Ducks",
"D3: The Mighty Ducks",
"Cool Runnings",
"SpaceCamp",
"Flight of the Navigator",
"Explorers",
"The Last Starfighter",
"Short Circuit",
"Short Circuit 2",
"Chitty Chitty Bang Bang",
"Swiss Family Robinson",
"Treasure Island",
"Treasure Planet",
"Atlantis: The Lost Empire",
"Atlantis: Milo's Return",
"Sinbad: Legend of the Seven Seas",
"The Road to El Dorado",
"Spirit: Stallion of the Cimarron",
"Anastasia",
"Thumbelina",
"The Swan Princess",
"The Swan Princess: Escape from Castle Mountain",
"The Swan Princess: The Mystery of the Enchanted Kingdom",
"Quest for Camelot",
"FernGully: The Last Rainforest",
"The Pagemaster",
"James and the Giant Peach",
"The Secret of NIMH",
"An American Tail",
"An American Tail: Fievel Goes West",
"All Dogs Go to Heaven",
"Balto",
"The Land Before Time",
"The Land Before Time II: The Great Valley Adventure",
"The Land Before Time III: The Time of the Great Giving",
"Once Upon a Forest",
"Rock-A-Doodle",
"Tom and Jerry: The Movie",
"Tom and Jerry: The Magic Ring",
"Tom and Jerry: The Fast and the Furry",
"Tom and Jerry",
"Tom and Jerry: Willy Wonka and the Chocolate Factory",
"Looney Tunes: Back in Action",
"Space Jam: A New Legacy",
"Pokémon: The First Movie",
"Pokémon: The Movie 2000",
"Pokémon 3: The Movie",
"Pokémon the Movie: I Choose You!",
"Pokémon the Movie: The Power of Us",
"Pokémon: Detective Pikachu",
"Sonic the Hedgehog",
"Sonic the Hedgehog 2",
"Sonic the Hedgehog 3",
"Detective Pikachu",
"Teenage Mutant Ninja Turtles: Mutant Mayhem",
"Teenage Mutant Ninja Turtles",
"Teenage Mutant Ninja Turtles: Out of the Shadows",
"Power Rangers",
"Power Rangers Samurai: Clash of the Red Rangers",
"Pokémon: Mewtwo Returns",
"Dragon Ball Z: Battle of Gods",
"Dragon Ball Super: Broly",
"Yu-Gi-Oh! The Movie",
"Digimon: The Movie",
"Shaolin Soccer",
"Kung Fu Hustle",
"Spy Kids",
"Spy Kids 2: The Island of Lost Dreams",
"Spy Kids 3-D: Game Over",
"Spy Kids: All the Time in the World",
"Spy Kids: Armageddon",
"Agent Cody Banks",
"Agent Cody Banks 2: Destination London",
"Zoom",
"Thunderbirds",
"Thunderbirds Are Go",
"Inspector Gadget",
"Inspector Gadget 2",
"Underdog",
"Zoom: Academy for Superheroes",
"Sky High",
"Mr. Magorium's Wonder Emporium",
"Zathura: A Space Adventure",
"Journey to the Center of the Earth",
"The Adventures of Sharkboy and Lavagirl",
"We Can Be Heroes",
"Spy Kids: Armageddon",
"Race for Your Life, Charlie Brown",
"Garfield's Pet Force",
"Garfield Gets Real",
"Garfield's Fun Fest",
"Barbie & Her Sisters in a Puppy Chase",
"Barbie & Her Sisters in the Great Puppy Adventure",
"Barbie & Her Sisters: A Pony Tale",
"Barbie & Her Sisters in a Mermaid Tale",
"Barbie & Her Sisters in a Puppy Chase",
"Barbie: Dolphin Magic",
"Barbie: Princess Adventure",
"Barbie: Big City, Big Dreams",
"Barbie: Mermaid Power",
"Barbie: Skipper and the Big Babysitting Adventure",
"Flushed Away",
"The Ant Bully",
"Barnyard",
"Back at the Barnyard",
"Everyone's Hero",
"Doogal",
"The Tale of Despereaux",
"Igor",
"Planet 51",
"Astro Boy",
"Delgo",
"9",
"Legend of the Guardians: The Owls of Ga'Hoole",
"Alpha and Omega",
"Alpha and Omega 2: A Howl-iday Adventure",
"Norm of the North",
"Norm of the North: Keys to the Kingdom",
"Arctic Dogs",
"Snowtime!",
"Racetime",
"The Nut Job",
"The Nut Job 2: Nutty by Nature",
"Wonder Park",
"Playmobil: The Movie",
"UglyDolls",
"Spies in Disguise",
"Back to the Outback",
"Sea Level",
"Deep",
"Penguin Rescue",
"The Little Vampire",
"The Little Vampire 3D",
"Monster Family",
"Monster Family 2",
"200% Wolf",
"100% Wolf",
"The Queen's Corgi",
"Pets United",
"Animal Crackers",
"Wonder",
"A Dog's Way Home",
"A Dog's Purpose",
"A Dog's Journey",
"Max",
"Max 2: White House Hero",
"Max 3: The Hero's Journey",
"Eight Below",
"Snow Dogs",
"Because of Winn-Dixie",
"Shiloh",
"Shiloh 2: Shiloh Season",
"Shiloh 3: Saving Shiloh",
"The Adventures of Milo and Otis",
"Benji",
"Benji: Off the Leash!",
"Rescued by Ruby",
"Blue Miracle",
"Penguins",
"Duma",
"Born Free",
"Fly Away Home",
"The Black Stallion",
"The Black Stallion Returns",
"White Fang",
"White Fang 2: Myth of the White Wolf",
"The Journey of Natty Gann",
"Homeward Bound: The Incredible Journey",
"Andre",
"My Dog Skip",
"Where the Red Fern Grows",
"Old Dogs",
"Yours, Mine & Ours",
"Furry Vengeance",
"Tooth Fairy",
"Tooth Fairy 2",
"The Game Plan",
"Race to Witch Mountain",
"Escape to Witch Mountain",
"The Computer Wore Tennis Shoes",
"Herbie: Fully Loaded",
"Herbie Goes Bananas",
"The Love Bug",
"Herbie Rides Again",
"Inspector Gadget",
"George of the Jungle",
"Jungle 2 Jungle",
"Jungle Cruise",
"Jungle Beat: The Movie",
"The Jungle Book",
"The Jungle Book 2",
"The Jungle Book (2016)",
"Mowgli: Legend of the Jungle",
"Tarzan",
"Tarzan II",
"The Wild",
"Open Season: Scared Silly",
"Brother Bear",
"Brother Bear 2",
"Spirit Untamed",
"The Star",
"Joseph: King of Dreams",
"The Prince of Egypt",
"Jonah: A VeggieTales Movie",
"The Pirates Who Don't Do Anything",
"VeggieTales: The Toy That Saved Christmas",
"The Boss Baby",
"The Boss Baby: Family Business",
"The Smurfs",
"The Smurfs 2",
"Smurfs: The Lost Village",
"Smurfs: The Movie",
"The Garfield Movie",
"Rango",
"Fantastic Beasts and Where to Find Them",
"Fantastic Beasts: The Crimes of Grindelwald",
"Fantastic Beasts: The Secrets of Dumbledore",
"Harry Potter and the Sorcerer's Stone",
"Harry Potter and the Chamber of Secrets",
"Harry Potter and the Prisoner of Azkaban",
"Harry Potter and the Goblet of Fire",
"The House with a Clock in Its Walls",
"Christopher Robin",
"Alexander and the Terrible, Horrible, No Good, Very Bad Day",
"Mr. Bean's Holiday",
"Bean",
"Johnny English",
"Johnny English Reborn",
"Johnny English Strikes Again",
"Paul Blart: Mall Cop",
"Paul Blart: Mall Cop 2",
"Night at the Museum: Battle of the Smithsonian",
"Night at the Museum: Secret of the Tomb",
"The Pacifier",
"Kindergarten Cop",
"Kindergarten Cop 2",
"Big Fat Liar",
"Little Giants",
"Heavyweights",
"Rookie of the Year",
"Angels in the Outfield",
"The Sandlot",
"The Sandlot 2",
"The Sandlot: Heading Home",
"Like Mike",
"Like Mike 2: Streetball",
"Space Warriors",
"Max Keeble's Big Move",
"Shorts",
"Zoom",
"Aliens in the Attic",
"Earth to Echo",
"Monster Trucks",
"Rim of the World",
"Astro Boy",
"Escape from Planet Earth",
"Planet 51",
"Battle for Terra",
"Meet Dave",
"Flubber",
"Zenon: Girl of the 21st Century",
"Zenon: The Zequel",
"Zenon: Z3",
"The Last Mimzy",
"Race to Witch Mountain",
"Earth to Echo",
"Cloud 9",
"Full-Court Miracle",
"Luck",
"Strange World",
"Ronja, the Robber's Daughter",
"The Boy Who Cried Werewolf",
"The Spiderwick Chronicles",
"Bridge to Terabithia",
"Five Children and It",
"The Water Horse",
"Dragonheart",
"Dragonheart: A New Beginning",
"The NeverEnding Story",
"The NeverEnding Story II",
"The Secret of Moonacre",
"The Golden Compass",
"Eragon",
"The Kid Who Would Be King",
"The House of Magic",
"The Book of Life",
"Coraline",
"The Boxtrolls",
"The Addams Family",
"The Addams Family 2",
"The Canterville Ghost",
"Monster Family",
"Monster House",
"The Haunted Mansion",
"The Haunted Mansion (2023)",
"Casper",
"Casper: A Spirited Beginning",
"Casper Meets Wendy",
"Goosebumps",
"Goosebumps 2: Haunted Halloween",
"Nightbooks",
"The Curse of Bridge Hollow",
"Spooky Buddies",
"Santa Buddies",
"The Search for Santa Paws",
"Santa Paws 2: The Santa Pups",
"Jingle All the Way",
"Jingle All the Way 2",
"The Christmas Chronicles",
"The Christmas Chronicles 2",
"Prancer",
"Miracle on 34th Street",
"Elf",
"Deck the Halls",
"The Santa Clause",
"The Santa Clause 2",
"The Santa Clause 3: The Escape Clause",
"Fred Claus",
"Christmas with the Kranks",
"Four Christmases",
"Arthur Newman",
"Saving Santa",
"The Star",
"Robin Robin",
"Angela's Christmas",
"Angela's Christmas Wish",
"The Snowman",
"The Snowman and the Snowdog",
"Rise of the Guardians",
"The Nutcracker and the Four Realms",
"The Nutcracker Prince",
"The Swan Princess: A Royal Family Tale",
"Barbie: A Christmas Carol",
"Beauty and the Beast: The Enchanted Christmas",
"Mickey's Once Upon a Christmas",
"Mickey's Twice Upon a Christmas",
"Winnie the Pooh: A Very Merry Pooh Year",
"Prep & Landing",
"Prep & Landing: Naughty vs. Nice",
"Olaf's Frozen Adventure",
"April and the Extraordinary World",
"The Little Engine That Could",
"Charming",
"Spark: A Space Tail",
"The Legend of the Secret Pass",
"Adventures in Zambezia",
"Khumba",
"Jock the Hero Dog",
"Delhi Safari",
"Roadside Romeo",
"Jungle Shuffle",
"The Missing Lynx",
"Animal Kingdom: Let's Go Ape",
"Robinson Crusoe",
"The Wild Life",
"Sammy's Adventures: The Secret Passage",
"Sammy's Adventures 2",
"A Turtle's Tale",
"Ribbit",
"Leafie: A Hen into the Wild",
"Ooops! Noah Is Gone...",
"Ooops! The Adventure Continues",
"The Magic Pudding",
"The Legend of the Sky Kingdom",
"The Legend of Sarila",
"The Nutcracker in 3D",
"The Little Ghost",
"The Seventh Dwarf",
"The Little Witch",
"The Amazing Maurice",
"The Canterville Ghost",
"Dragon Rider",
"The Elfkins",
"Latte and the Magic Waterstone",
"Raven the Little Rascal",
"Raven the Little Rascal: The Big Race",
"The Little Polar Bear",
"The Little Polar Bear 2",
"Felix: All Around the World",
"The Dolphin: Story of a Dreamer",
"Zarafa",
"The Painting",
"The Boy and the World",
"My Father's Dragon",
"The Summit of the Gods",
"The Magician's Elephant",
"The Willoughbys",
"Mirai",
"Mary and the Witch's Flower",
"Modest Heroes",
"Okko's Inn",
"Penguin Highway",
"The Wonderland",
"Lu Over the Wall",
"Ride Your Wave",
"Patema Inverted",
"Summer Wars",
"The Boy and the Beast",
"Children Who Chase Lost Voices",
"The Secret World of Arrietty",
"Whisper of the Heart",
"Ponyo",
"Kiki's Delivery Service",
"My Neighbor Totoro",
"Castle in the Sky",
"Howl's Moving Castle",
"Spirited Away",
"From Up on Poppy Hill",
"The Cat Returns",
"When Marnie Was There",
"Porco Rosso",
"Pom Poko",
"Arrietty",
"The Red Turtle",
"Ernest & Celestine",
"Ernest & Celestine: A Trip to Gibberitia",
"The Big Bad Fox and Other Tales",
"The Boy, the Mole, the Fox and the Horse",
"The Secret of Kells",
"Song of the Sea",
"Wolfwalkers",
"Funan",
"Long Way North",
"Calamity",
"The Painting",
"Azur & Asmar",
"Kirikou and the Sorceress",
"Kirikou and the Wild Beasts",
"The Triplets of Belleville",
"The Illusionist",
"April and the Extraordinary World",
"Phantom Boy",
"Little Nicholas",
"Little Nicholas: Happy as Can Be",
"The Extraordinary Adventures of Adele Blanc-Sec",
"The Prince's Voyage",
"Louis & Luca: The Big Cheese Race",
"Louis & Luca: Mission to the Moon",
"Captain Sabertooth and the Magic Diamond",
"Captain Sabertooth and the Countess of Grel",
"Two by Two: Overboard!",
"Vic the Viking",
"Vic the Viking: The Magic Sword",
"Ploddy the Police Car Makes a Splash",
"Rasmus and the Vagabond",
"The Olsen Gang Gets Polished",
"The Olsen Gang in Deep Trouble",
"Journey to the Christmas Star",
"The Ash Lad: In the Hall of the Mountain King",
"The Ash Lad: In Search of the Golden Castle",
"The Three Robbers",
"The Little Vampire (2017)",
"The Amazing Wizard of Paws",
"The Adventures of Food Boy",
"Monster Mutt",
"Space Dogs",
"Space Dogs: Adventure to the Moon",
"Space Dogs: Tropical Adventure",
"Pinocchio (2012)",
"Pinocchio (2022)",
"Peter Pan (2003)",
"Return to Never Land",
"Tinker Bell and the Secret of the Wings",
"Peter Pan: The Quest for the Never Book",
"The Legend of Prince Valiant",
"Quest for Camelot",
"The Pebble and the Penguin",
"The Princess of the Sun",
"The Magic Roundabout",
"Doogal",
"The Legend of the Three Caballeros",
"The Three Caballeros",
"Saludos Amigos",
"Fun and Fancy Free",
"The Reluctant Dragon",
"The Adventures of Ichabod and Mr. Toad",
"Make Mine Music",
"Melody Time",
"Fantasia",
"Fantasia 2000",
"The Black Cauldron",
"The Sword in the Stone",
"The Great Mouse Detective",
"Oliver & Company",
"The Hunchback of Notre Dame",
"The Hunchback of Notre Dame II",
"Hercules",
"Pocahontas",
"Pocahontas II: Journey to a New World",
"Atlantis: The Lost Empire",
"The Rescuers",
"The Fox and the Hound",
"Home on the Range",
"Chicken Little",
"Treasure Planet",
"Valiant",
"The Pirates of Tortuga: Under the Black Flag",
"The Legend of the NeverBeast",
"Barbie in A Mermaid Tale",
"Barbie in A Mermaid Tale 2",
"Barbie: Fairytopia - Magic of the Rainbow",
"Barbie and the Three Musketeers",
"Barbie: The Princess & the Popstar",
"Barbie: A Fairy Secret",
"Barbie: Mariposa",
"Barbie: Mariposa & the Fairy Princess",
"Barbie: The Great Puppy Adventure",
"Barbie: Spy Squad",
"Barbie: Star Light Adventure",
"Barbie: Video Game Hero",
"Barbie: Dolphin Magic",
"Monster High: Fright On!",
"Monster High: Ghouls Rule",
"Monster High: Escape from Skull Shores",
"Monster High: Friday Night Frights",
"Monster High: Why Do Ghouls Fall in Love?",
"Monster High: Scaris: City of Frights",
"Monster High: 13 Wishes",
"Monster High: Frights, Camera, Action!",
"Monster High: Freaky Fusion",
"Monster High: Haunted",
"Monster High: Boo York, Boo York",
"Monster High: Great Scarrier Reef",
"Ever After High: Thronecoming",
"Ever After High: Spring Unsprung",
"Ever After High: Dragon Games",
"Ever After High: Epic Winter",
"The Little Mermaid: Ariel's Beginning",
"The Little Mermaid II: Return to the Sea",
"Cinderella II: Dreams Come True",
"Cinderella III: A Twist in Time",
"Bambi II",
"The Lion King II: Simba's Pride",
"The Lion King 1½",
"Lady and the Tramp II: Scamp's Adventure",
"101 Dalmatians II: Patch's London Adventure",
"The Jungle Book: Mowgli's Story",
"Tarzan and Jane",
"Tarzan II",
"Brother Bear 2",
"Atlantis: Milo's Return",
"Stitch! The Movie",
"Leroy & Stitch",
"Recess: School's Out",
"Teacher's Pet",
"Doug's 1st Movie",
"Hey Arnold!: The Movie",
"Rugrats in Paris: The Movie",
"The Rugrats Movie",
"Rugrats Go Wild",
"The Wild Thornberrys Movie",
"Jimmy Neutron: Boy Genius",
"Hey Arnold!: The Jungle Movie",
"Phineas and Ferb: The Movie",
"Phineas and Ferb: Across the 2nd Dimension",
"Kim Possible Movie: So the Drama",
"Kim Possible: A Sitch in Time",
"Teen Titans Go! To the Movies",
"DC League of Super-Pets",
"Batman: The Lego Movie",
"LEGO DC Comics Super Heroes: Justice League vs. Bizarro League",
"LEGO DC Comics Super Heroes: The Flash",
"LEGO DC Comics Super Heroes: Aquaman: Rage of Atlantis",
"LEGO DC Comics Super Heroes: Justice League: Cosmic Clash",
"LEGO DC Comics Super Heroes: Justice League: Attack of the Legion of Doom",
"LEGO Marvel Super Heroes: Maximum Overload",
"LEGO Marvel Super Heroes: Avengers Reassembled",
"LEGO Marvel Avengers: Code Red",
"LEGO Star Wars: The Padawan Menace",
"LEGO Star Wars: The Empire Strikes Out",
"LEGO Star Wars: The Yoda Chronicles",
"LEGO Star Wars Holiday Special",
"LEGO Jurassic World: The Secret Exhibit",
"LEGO Jurassic World: The Indominus Escape",
"LEGO Friends: Girlz 4 Life",
"LEGO Ninjago: Masters of Spinjitzu",
"LEGO Scooby-Doo! Haunted Hollywood",
"LEGO Scooby-Doo! Blowout Beach Bash",
"LEGO Scooby-Doo! Knight Time Terror",
"LEGO Scooby-Doo! The Mystery of the Pirate Beach",
"LEGO Scooby-Doo! The Great Caper",
"LEGO Scooby-Doo! The Haunted Castle",
"LEGO Scooby-Doo! The Monster of Mexico",
"LEGO Scooby-Doo! The Ghost of the Red Baron",
"LEGO Scooby-Doo! The Mystery of the Haunted Mansion",
"LEGO Scooby-Doo! The Case of the Missing Monster",
"LEGO Scooby-Doo! The Secret of the Ghost Ship",
"LEGO Scooby-Doo! The Mystery of the Pyramid",
"LEGO Scooby-Doo! The Mystery of the Alien Invasion",
"LEGO Scooby-Doo! The Curse of the Werewolf",
"LEGO Scooby-Doo! The Mystery of the Haunted Lighthouse",
"LEGO Scooby-Doo! The Ghost of the Pirate Queen",
"LEGO Scooby-Doo! The Mystery of the Snow Monster",
"LEGO Scooby-Doo! The Case of the Spooky Scarecrow",
"LEGO Scooby-Doo! The Mystery of the Jungle Temple",
"Arthur and the Invisibles",
"Arthur 3: The War of the Two Worlds",
"The Ant Bully",
"Everyone's Hero",
"Monster in Paris",
"The Legend of Sarila",
"The Pirate Fairy",
"Barbie: Dolphin Magic",
"Barbie: Princess Adventure",
"Barbie: Mermaid Power",
"Barbie: Big City, Big Dreams",
"Barbie: A Fashion Fairytale",
"Barbie: The Pearl Princess",
"Barbie: Princess Charm School",
"Barbie: The Diamond Castle",
"Monster High: Electrified",
"Monster High: Welcome to Monster High",
"Monster High: The Movie",
"LEGO Batman: The Movie",
"LEGO DC Super Heroes: Justice League - Gotham City Breakout",
"LEGO DC Super Heroes: Justice League - Cosmic Clash",
"LEGO Marvel Super Heroes: Avengers Reassembled",
"LEGO Star Wars: The Freemaker Adventures",
"LEGO Friends: The Next Chapter",
"Thomas & Friends: The Adventure Begins",
"Thomas & Friends: Journey Beyond Sodor",
"Thomas & Friends: Big World! Big Adventures!",
"Thomas & Friends: The Great Race",
"Thomas & Friends: King of the Railway",
"Thomas & Friends: The Great Discovery",
"Thomas & Friends: Misty Island Rescue",
"Thomas & Friends: Blue Mountain Mystery",
"Thomas & Friends: Tale of the Brave",
"Thomas & Friends: Sodor's Legend of the Lost Treasure",
"Thomas & Friends: The Christmas Letter Express",
"Fireman Sam: Alien Alert!",
"Fireman Sam: The Great Fire of Pontypandy",
"Bob the Builder: The Big Dino Dig",
"Bob the Builder: Mega Machines",
"Barbie: Skipper and the Big Babysitting Adventure",
"Curious George"
];

// Movies already used during this server session
const usedMovies = new Set();

// Active game sessions
const games = new Map();

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function normalize(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

function selectMovie() {
    let availableMovies = movieDatabase.filter(
        movie => !usedMovies.has(movie)
    );

    // Reset after every movie has been used
    if (availableMovies.length === 0) {
        usedMovies.clear();
        availableMovies = [...movieDatabase];
    }

    const index = Math.floor(
        Math.random() * availableMovies.length
    );

    return availableMovies[index];
}

// ==========================================
// GENERATE NEW MOVIE
// ==========================================

app.post("/api/new-movie", async (req, res) => {

    let selectedMovie = null;

    try {

        if (!GROQ_API_KEY) {
            throw new Error("Missing GROQ_API_KEY in .env");
        }

        // Select an unused movie
        selectedMovie = selectMovie();

        // Reserve it immediately to prevent concurrent duplicates
        usedMovies.add(selectedMovie);

        console.log("Selected movie:", selectedMovie);

        // Ask Groq to generate clues
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GROQ_API_KEY}`
                },

                body: JSON.stringify({

                    model: "openai/gpt-oss-120b",

                    messages: [
                        {
                            role: "system",

                            content: `
You create emoji clues for movie guessing games.

The user will give you a movie title.

Create clues for EXACTLY that movie.

Return ONLY valid JSON:

{
    "emojis": "🐠 🌊 🔍",
    "hints": [
        "Hint one",
        "Hint two"
    ]
}

Rules:
- Generate 3 to 5 emojis.
- Generate exactly 2 hints.
- Make clues relevant to the movie.
- Do not reveal the movie title.
- Never change the movie.
- Return valid JSON only.
- If the answer is almost the same, like it doesnt include "the" or "a", still accept it as correct.
- Make sure the hints are not too obvious, but also not too hard.
- If the answer is somewhat similar to the movie, accept it as correct.
- If the answer is similar, but not the same, accept it as correct.
- If the answer is not exactly the same, but is very close, accept it as correct.
- If the answer is not exactly the same, but is very similar, accept it as correct.
- If the answer is not containing the colons or other punctuation, accept it as correct.
`
                        },

                        {
                            role: "user",

                            content:
                                `Generate clues for this exact movie: ${selectedMovie}`
                        }
                    ],

                    temperature: 0.8,
                    max_completion_tokens: 512,

                    response_format: {
                        type: "json_object"
                    }
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                `Groq API error ${response.status}: ${await response.text()}`
            );
        }

        const data = await response.json();

        const content = data.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error("Groq returned an empty response.");
        }

        const clues = JSON.parse(content);

        if (
            typeof clues.emojis !== "string" ||
            !Array.isArray(clues.hints) ||
            clues.hints.length < 2
        ) {
            throw new Error("Invalid clues returned by Groq.");
        }

        // Create a game session
        const id = randomUUID();

        games.set(id, {
            title: selectedMovie,

            acceptedAnswers: [
                selectedMovie
            ],

            emojis: clues.emojis,
            hints: clues.hints,

            attempts: 0,
            hintsUsed: 0,

            createdAt: Date.now()
        });

        console.log("Game generated successfully!");

        // Send ONLY the clues and game ID
        res.json({
            id,
            emojis: clues.emojis
        });

    } catch (error) {

        // Allow the movie to be retried if generation failed
        if (selectedMovie) {
            usedMovies.delete(selectedMovie);
        }

        console.error("Movie generation error:", error);

        res.status(500).json({
            error: "Could not generate movie clues. Please try again."
        });

    }

});

// ==========================================
// CHECK ANSWER
// ==========================================

app.post("/api/guess", (req, res) => {

    const { id, guess } = req.body;

    const game = games.get(id);

    if (!game) {
        return res.status(404).json({
            error: "Game not found. Generate another movie."
        });
    }

    if (Date.now() - game.createdAt > 30 * 60 * 1000) {
        games.delete(id);

        return res.status(410).json({
            error: "Game expired. Generate another movie."
        });
    }

    if (
        typeof guess !== "string" ||
        !guess.trim() ||
        guess.length > 100
    ) {
        return res.status(400).json({
            error: "Enter a valid movie title."
        });
    }

    const correct = game.acceptedAnswers.some(
        answer => normalize(answer) === normalize(guess)
    );

    game.attempts++;

    if (correct) {

        const correctTitle = game.title;

        games.delete(id);

        return res.json({
            correct: true,
            message: "CORRECT! YOU GOT IT!",
            answer: correctTitle
        });

    }

    res.json({
        correct: false,
        message: "WRONG! TRY AGAIN!",
        attempts: game.attempts
    });

});

// ==========================================
// HINT SYSTEM
// ==========================================

app.post("/api/hint", (req, res) => {

    const { id } = req.body;

    const game = games.get(id);

    if (!game) {
        return res.status(404).json({
            error: "Game not found."
        });
    }

    if (Date.now() - game.createdAt > 30 * 60 * 1000) {
        games.delete(id);

        return res.status(410).json({
            error: "Game expired."
        });
    }

    const hintIndex = Math.min(
        game.hintsUsed,
        game.hints.length - 1
    );

    const currentHint = game.hints[hintIndex];

    game.hintsUsed++;

    res.json({
        hint: currentHint
    });

});

// ==========================================
// CLEANUP OLD GAMES
// ==========================================

setInterval(() => {

    for (const [id, game] of games) {

        if (Date.now() - game.createdAt > 30 * 60 * 1000) {
            games.delete(id);
        }

    }

}, 60000);

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log("--------------------------------");
    console.log("GUESS THE MOVIE SERVER");
    console.log("--------------------------------");
    console.log(`Game running at http://localhost:${PORT}`);
    console.log(`Movies available: ${movieDatabase.length}`);
    console.log("--------------------------------");

});

export type Custodian = {
  slug: string;
  name: string;
  role: string;
  tradition: string;
  location: string;
  languages: string[];
  image: string;
  quote: string;
  category: 'Performance' | 'Craft' | 'Story';
  color: string;
  storyLead: string;
  storyBody: string;
  practiceNote: string;
  detailImage: string;
  experience: {
    title: string;
    intro: string;
    quote: string;
    duration: string;
    price: number;
  };
};

export const custodians: Custodian[] = [
  {
    slug: 'kuttan-nair',
    name: 'Kuttan Nair',
    role: 'Ritual performer & oral historian',
    tradition: 'Theyyam',
    location: 'Kannur, Kerala',
    languages: ['Malayalam', 'English'],
    image: '/theyyam-custodian.jpg',
    quote: 'The costume is not a mask. It is a responsibility handed to us.',
    category: 'Performance',
    color: '#bd4c2f',
    storyLead: 'I first entered the kaavu holding my uncle’s hand. Before I learned the paint, the crown, or the steps, I learned that Theyyam begins with listening—to the elders, to the place, and to the people who come with faith.',
    storyBody: 'What visitors see for a few powerful hours rests on days of preparation and generations of memory. I share the stories around the practice so people understand that the performer is not displaying a character; for that moment, he is carrying a community’s relationship with the sacred.',
    practiceNote: 'Every village carries its own histories, songs, and responsibilities. Theyyam stays alive because those differences are remembered—not flattened into one spectacle.',
    detailImage: '/theyyam-custodian.jpg',
    experience: {
      title: 'Understanding Theyyam',
      intro: 'Enter the world around the ritual before encountering the spectacle.',
      quote: 'Come to understand the preparation, the place, and the responsibility behind what you see.',
      duration: '2 hours',
      price: 1500,
    },
  },
  {
    slug: 'meenakshi-bhat',
    name: 'Meenakshi Bhat',
    role: 'Performer, teacher & storyteller',
    tradition: 'Yakshagana',
    location: 'Udupi, Karnataka',
    languages: ['Kannada', 'Tulu', 'English'],
    image: '/og.png',
    quote: 'I want people to meet Yakshagana as a living tradition.',
    category: 'Story',
    color: '#204c3c',
    storyLead: 'My first Yakshagana nights were spent beside my grandmother, trying to stay awake until dawn. The colour caught my eye, but it was the rhythm, language, and discipline behind the performance that made me return.',
    storyBody: 'Today I teach young performers to understand more than movement. A story changes with the singer, the village, and the people listening. That living conversation is what I want every visitor to notice and respect.',
    practiceNote: 'Yakshagana moves between music, dance, dialogue, costume, and improvisation. No two nights are identical because performers respond to one another and to the audience.',
    detailImage: '/og.png',
    experience: {
      title: 'Inside Yakshagana',
      intro: 'A small-group doorway into the work behind an all-night tradition.',
      quote: 'Not a performance watched from a seat—a tradition understood from inside the room.',
      duration: '2 hours',
      price: 1500,
    },
  },
  {
    slug: 'asha-rao',
    name: 'Asha Rao',
    role: 'Classical dancer & movement teacher',
    tradition: 'Bharatanatyam',
    location: 'Bengaluru, Karnataka',
    languages: ['Kannada', 'Tamil', 'English'],
    image: '/bharatanatyam.jpg',
    quote: 'Every gesture holds a sentence. Every pause holds a memory.',
    category: 'Performance',
    color: '#7b1f20',
    storyLead: 'My teacher never began with a perfect pose. She began with a question: what are you trying to say? That taught me to understand Bharatanatyam as a language before I treated it as choreography.',
    storyBody: 'When I teach, I slow a sequence down until learners can see how the eyes, hands, rhythm, and breath work together. Technique matters deeply, but it becomes meaningful only when it carries attention, memory, and emotion.',
    practiceNote: 'Gesture, rhythm, expression, music, and story meet in Bharatanatyam. Learning to notice their relationship turns a beautiful performance into an intelligible one.',
    detailImage: '/bharatanatyam.jpg',
    experience: {
      title: 'Reading a Dance Story',
      intro: 'Learn how gesture, rhythm, and expression become a shared language.',
      quote: 'You do not need to be a dancer. You only need the patience to notice what each movement is saying.',
      duration: '90 minutes',
      price: 1200,
    },
  },
  {
    slug: 'salim-ansari',
    name: 'Salim Ansari',
    role: 'Third-generation textile artisan',
    tradition: 'Hand-knot weaving',
    location: 'Gwalior, Madhya Pradesh',
    languages: ['Hindi', 'Urdu'],
    image: '/weaving-hands.jpg',
    quote: 'A pattern is our family archive—read slowly, and it speaks.',
    category: 'Craft',
    color: '#a45534',
    storyLead: 'The loom was the centre of our home long before it became my work. I learned patterns as family stories: a border remembered one person, a colour combination another place, and a knot carried the hand of the person who taught it.',
    storyBody: 'A finished textile can look effortless, so I invite learners to sit with the repetition. Once they tie a few knots themselves, they begin to understand the time, judgement, and inherited knowledge held inside every surface.',
    practiceNote: 'Hand-knot weaving is read through touch as much as sight. Tension, sequence, and material choice reveal the maker’s decisions one row at a time.',
    detailImage: '/weaving-hands.jpg',
    experience: {
      title: 'Weave a Family Pattern',
      intro: 'Sit at the loom, learn the rhythm, and make a small pattern to carry home.',
      quote: 'A pattern opens slowly. Give your hands time, and the story will begin to appear.',
      duration: '2.5 hours',
      price: 1100,
    },
  },
];

export const impact = [
  { value: '128', label: 'living traditions', note: 'documented with consent' },
  { value: '16', label: 'Indian languages', note: 'stories stay multilingual' },
  { value: '₹8.4L', label: 'directly earned', note: 'by pilot custodians' },
];

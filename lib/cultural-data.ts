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
  },
];

export const impact = [
  { value: '128', label: 'living traditions', note: 'documented with consent' },
  { value: '16', label: 'Indian languages', note: 'stories stay multilingual' },
  { value: '₹8.4L', label: 'directly earned', note: 'by pilot custodians' },
];

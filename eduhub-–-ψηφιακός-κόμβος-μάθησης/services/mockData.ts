
import { LearningModule } from '../types';

const INITIAL_MODULES: LearningModule[] = [
  {
    id: 'phys-1',
    title: 'Εισαγωγή στην Κλασική Μηχανική',
    description: 'Μάθετε τους νόμους του Νεύτωνα και την έννοια της δύναμης.',
    category: 'Φυσική',
    createdAt: Date.now() - 1000000,
    materials: [
      { id: 'm1', title: 'Νόμοι του Νεύτωνα PDF', type: 'pdf', url: '#' },
      { id: 'm2', title: 'Video: Η βαρύτητα', type: 'video', url: 'https://www.youtube.com/watch?v=0_8XjS2o3gA' }
    ],
    activities: [
      {
        id: 'a1',
        title: 'Quiz: Δυνάμεις και Νόμοι Νεύτωνα',
        type: 'mcq',
        questions: [
          { 
            id: 'q1', 
            text: 'Ποιος είναι ο πρώτος νόμος του Νεύτωνα;', 
            options: ['Νόμος της Αδράνειας', 'Νόμος της Επιτάχυνσης', 'Νόμος Δράσης-Αντίδρασης', 'Νόμος της Παγκόσμιας Έλξης'], 
            correctAnswer: 'Νόμος της Αδράνειας' 
          },
          { 
            id: 'q2', 
            text: 'Ποια είναι η μαθηματική έκφραση του δεύτερου νόμου του Νεύτωνα;', 
            options: ['ΣF = m · a', 'W = F · d', 'P = m · v', 'E = m · c²'], 
            correctAnswer: 'ΣF = m · a' 
          },
          { 
            id: 'q3', 
            text: 'Ποια είναι η μονάδα μέτρησης της δύναμης στο Διεθνές Σύστημα (SI);', 
            options: ['Joule (J)', 'Watt (W)', 'Newton (N)', 'Pascal (Pa)'], 
            correctAnswer: 'Newton (N)' 
          },
          { 
            id: 'q4', 
            text: 'Σύμφωνα με τον τρίτο νόμο του Νεύτωνα, αν ασκήσουμε μια δύναμη σε ένα τοίχο:', 
            options: ['Ο τοίχος δεν ασκεί καμία δύναμη', 'Ο τοίχος ασκεί μικρότερη δύναμη', 'Ο τοίχος ασκεί ίση και αντίθετη δύναμη σε εμάς', 'Ο τοίχος απορροφά τη δύναμη'], 
            correctAnswer: 'Ο τοίχος ασκεί ίση και αντίθετη δύναμη σε εμάς' 
          },
          { 
            id: 'q5', 
            text: 'Τι ονομάζουμε "Αδράνεια";', 
            options: ['Την ταχύτητα ενός σώματος', 'Την ιδιότητα των σωμάτων να αντιστέκονται σε μεταβολή της κινητικής τους κατάστασης', 'Την ελκτική δύναμη της Γης', 'Την ενέργεια που έχει ένα σώμα λόγω ύψους'], 
            correctAnswer: 'Την ιδιότητα των σωμάτων να αντιστέκονται σε μεταβολή της κινητικής τους κατάστασης' 
          },
          { 
            id: 'q6', 
            text: 'Ποια είναι η τιμή της επιτάχυνσης της βαρύτητας (g) στην επιφάνεια της Γης;', 
            options: ['5,4 m/s²', '9,8 m/s²', '12,1 m/s²', '1,6 m/s²'], 
            correctAnswer: '9,8 m/s²' 
          },
          { 
            id: 'q7', 
            text: 'Αν η συνισταμένη των δυνάμεων που ασκούνται σε ένα σώμα είναι μηδέν (ΣF=0), τότε το σώμα:', 
            options: ['Επιταχύνεται', 'Επιβραδύνεται', 'Είτε ηρεμεί είτε κινείται με σταθερή ταχύτητα', 'Αλλάζει κατεύθυνση'], 
            correctAnswer: 'Είτε ηρεμεί είτε κινείται με σταθερή ταχύτητα' 
          },
          { 
            id: 'q8', 
            text: 'Η τριβή ολίσθησης εξαρτάται κυρίως από:', 
            options: ['Το εμβαδόν των επιφανειών', 'Τη φύση των επιφανειών και την κάθετη δύναμη', 'Μόνο την ταχύτητα του σώματος', 'Το χρώμα του σώματος'], 
            correctAnswer: 'Τη φύση των επιφανειών και την κάθετη δύναμη' 
          },
          { 
            id: 'q9', 
            text: 'Το βάρος ενός σώματος είναι:', 
            options: ['Η ποσότητα της ύλης του', 'Η ελκτική δύναμη που ασκεί η Γη στο σώμα', 'Το ίδιο πράγμα με τη μάζα', 'Μια σταθερή ιδιότητα που δεν αλλάζει ποτέ'], 
            correctAnswer: 'Η ελκτική δύναμη που ασκεί η Γη στο σώμα' 
          },
          { 
            id: 'q10', 
            text: 'Ποια από τις παρακάτω είναι διανυσματικό μέγεθος;', 
            options: ['Η Μάζα', 'Ο Χρόνος', 'Η Δύναμη', 'Η Πυκνότητα'], 
            correctAnswer: 'Η Δύναμη' 
          }
        ]
      }
    ]
  },
  {
    id: 'hist-1',
    title: 'Η Ελληνική Επανάσταση του 1821',
    description: 'Τα σημαντικότερα γεγονότα και οι προσωπικότητες του αγώνα.',
    category: 'Ιστορία',
    createdAt: Date.now() - 500000,
    materials: [
      { id: 'm3', title: 'Χάρτης Επανάστασης', type: 'image', url: 'https://picsum.photos/800/600' }
    ],
    activities: [
      {
        id: 'a2',
        title: 'Flashcards: Ήρωες',
        type: 'flashcard',
        flashcards: [
          { id: 'f1', front: 'Θεόδωρος Κολοκοτρώνης', back: 'Ο Γέρος του Μοριά' },
          { id: 'f2', front: 'Μπουμπουλίνα', back: 'Ηρωίδα της θάλασσας' }
        ]
      }
    ]
  }
];

const STORAGE_KEY = 'eduhub_state';

export const storage = {
  getModules: (): LearningModule[] => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_MODULES;
  },
  saveModules: (modules: LearningModule[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
  },
  login: (password: string): boolean => {
    // Demo password
    if (password === 'admin123') {
      localStorage.setItem('eduhub_auth', 'true');
      return true;
    }
    return false;
  },
  isLoggedIn: (): boolean => {
    return localStorage.getItem('eduhub_auth') === 'true';
  },
  logout: () => {
    localStorage.removeItem('eduhub_auth');
  }
};

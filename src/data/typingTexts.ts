export const typingTexts = {
  beginner: {
    words: [
      'the quick brown fox jumps over the lazy dog',
      'pack my box with five dozen liquor jugs',
      'how vexingly quick daft zebras jump',
      'bright vixens jump dozy fowl quack',
      'sphinx of black quartz judge my vow'
    ],
    sentences: [
      'The sun rises in the east and sets in the west.',
      'Practice makes perfect when learning new skills.',
      'Technology has changed the way we communicate.',
      'Reading books expands your knowledge and vocabulary.',
      'Exercise is important for maintaining good health.'
    ],
    paragraphs: [
      'The art of typing efficiently is a valuable skill in today\'s digital world. With practice and dedication, anyone can improve their typing speed and accuracy. Start with proper finger placement and gradually increase your speed while maintaining precision.',
      'Communication through written text has become increasingly important in our modern society. Whether you\'re writing emails, creating documents, or chatting with friends, the ability to type quickly and accurately can save you time and improve your productivity.',
      'Learning to type without looking at the keyboard is called touch typing. This skill allows you to focus on your thoughts and ideas rather than searching for keys. With consistent practice, touch typing becomes second nature and significantly improves your efficiency.'
    ]
  },
  intermediate: {
    words: [
      'acknowledge beautiful calendar definitely environment',
      'fascinating government hierarchy immediately knowledge',
      'magnificent necessary opportunity personality questionnaire',
      'responsibility sophisticated technology understanding vocabulary',
      'extraordinary phenomenon psychology rhythm synchronization'
    ],
    sentences: [
      'The implementation of artificial intelligence requires careful consideration of ethical implications.',
      'Sustainable development goals aim to balance economic growth with environmental protection.',
      'Effective communication involves both verbal and non-verbal elements that convey meaning.',
      'Innovation drives progress in science, technology, and various fields of human endeavor.',
      'Critical thinking skills enable individuals to analyze information and make informed decisions.'
    ],
    paragraphs: [
      'The rapid advancement of technology has transformed virtually every aspect of human life. From smartphones that connect us instantly to people around the globe, to artificial intelligence systems that can process vast amounts of data in seconds, we live in an era of unprecedented technological capability. However, with these advances come new challenges and responsibilities that society must address thoughtfully.',
      'Environmental sustainability has become one of the most pressing issues of our time. Climate change, deforestation, pollution, and resource depletion threaten the delicate balance of ecosystems worldwide. Addressing these challenges requires coordinated global action, innovative solutions, and a fundamental shift in how we think about our relationship with the natural world.',
      'The concept of lifelong learning has gained significant importance in today\'s rapidly changing world. As industries evolve and new technologies emerge, professionals must continuously update their skills and knowledge to remain relevant. This shift has led to the development of new educational models and platforms that support ongoing professional development.'
    ]
  },
  advanced: {
    words: [
      'entrepreneurship pharmaceutical biotechnology nanotechnology cryptocurrency',
      'interdisciplinary metamorphosis consciousness philosophical epistemological',
      'unprecedented revolutionary extraordinary sophisticated incomprehensible',
      'multidimensional transcendental exponential algorithmic computational',
      'neuroplasticity psychophysiology immunodeficiency cardiovascular gastrointestinal'
    ],
    sentences: [
      'The paradigmatic shift towards quantum computing represents a fundamental transformation in computational methodology.',
      'Neuroplasticity research demonstrates the brain\'s remarkable capacity for adaptation and reorganization throughout life.',
      'Interdisciplinary collaboration between diverse fields often yields the most innovative and groundbreaking discoveries.',
      'The exponential growth of data generation necessitates sophisticated algorithms for meaningful pattern recognition.',
      'Philosophical discourse on consciousness continues to challenge our understanding of subjective experience and reality.'
    ],
    paragraphs: [
      'The intersection of artificial intelligence and human consciousness represents one of the most fascinating and complex frontiers in contemporary scientific research. As machine learning algorithms become increasingly sophisticated, questions arise about the nature of intelligence itself and whether artificial systems can truly understand or merely simulate understanding. This philosophical and technical challenge requires interdisciplinary collaboration between computer scientists, neuroscientists, philosophers, and ethicists to navigate the implications of creating systems that may one day rival human cognitive capabilities.',
      'Quantum mechanics has fundamentally altered our understanding of reality at the most basic level. The principles of superposition, entanglement, and uncertainty challenge our intuitive notions of how the universe operates. These quantum phenomena, while counterintuitive, have practical applications in emerging technologies such as quantum computing, quantum cryptography, and quantum sensing. The potential for quantum computers to solve certain problems exponentially faster than classical computers could revolutionize fields ranging from drug discovery to financial modeling.',
      'The study of complex adaptive systems reveals how simple rules and interactions can give rise to emergent behaviors and patterns that are difficult to predict from the individual components alone. This phenomenon is observed across diverse domains, from the flocking behavior of birds to the dynamics of financial markets, from the formation of neural networks in the brain to the evolution of ecosystems. Understanding these emergent properties is crucial for addressing complex global challenges such as climate change, economic stability, and social coordination.'
    ]
  },
  code: [
    'function calculateSum(a, b) { return a + b; }',
    'const users = await fetch("/api/users").then(res => res.json());',
    'if (condition && !isLoading) { setState(prevState => ({ ...prevState, data })); }',
    'export default class Component extends React.Component { render() { return <div>Hello</div>; } }',
    'const [count, setCount] = useState(0); useEffect(() => { document.title = `Count: ${count}`; }, [count]);'
  ],
  numbers: [
    '1234567890 9876543210 1357924680 2468013579',
    '3.14159 2.71828 1.41421 1.61803 0.57721',
    '2023-12-25 14:30:45 GMT+0000 (UTC)',
    '$1,234.56 €987.65 ¥12,345 £543.21',
    '192.168.1.1 255.255.255.0 127.0.0.1 8.8.8.8'
  ]
};

export const getRandomText = (mode: string, difficulty: string): string => {
  if (mode === 'code') {
    const codeTexts = typingTexts.code;
    return codeTexts[Math.floor(Math.random() * codeTexts.length)];
  }
  
  if (mode === 'numbers') {
    const numberTexts = typingTexts.numbers;
    return numberTexts[Math.floor(Math.random() * numberTexts.length)];
  }
  
  const difficultyTexts = typingTexts[difficulty as keyof typeof typingTexts];
  if (!difficultyTexts) return typingTexts.beginner.sentences[0];
  
  const modeTexts = difficultyTexts[mode as keyof typeof difficultyTexts];
  if (!modeTexts || !Array.isArray(modeTexts)) return typingTexts.beginner.sentences[0];
  
  return modeTexts[Math.floor(Math.random() * modeTexts.length)];
};
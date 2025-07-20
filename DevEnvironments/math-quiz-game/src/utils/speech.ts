// Text-to-Speech functionality for Korean
export const speakKorean = (text: string, rate: number = 0.9, pitch: number = 1.5) => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ko-KR'
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = 0.9
    
    // Try to find Korean female voice
    const voices = speechSynthesis.getVoices()
    const koreanFemaleVoice = voices.find(voice => 
      (voice.lang.includes('ko') || voice.name.includes('Korean')) && 
      (voice.name.includes('Female') || voice.name.includes('female') || voice.name.includes('여성'))
    )
    const koreanVoice = koreanFemaleVoice || voices.find(voice => 
      voice.lang.includes('ko') || voice.name.includes('Korean')
    )
    
    if (koreanVoice) {
      utterance.voice = koreanVoice
    }
    
    speechSynthesis.speak(utterance)
    
    return utterance
  } else {
    console.warn('Speech synthesis not supported in this browser')
    return null
  }
}

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel()
  }
}

// Load voices (needed for some browsers)
export const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve(voices)
    } else {
      speechSynthesis.addEventListener('voiceschanged', () => {
        resolve(speechSynthesis.getVoices())
      }, { once: true })
    }
  })
}

// Special greetings for Haewan
export const greetHaewan = async () => {
  await loadVoices()
  
  const greetings = [
    "안녕 혜완! 오늘도 수학 공부하러 왔구나!",
    "혜완아! 게임을 시작해 볼까?",
    "우리 혜완이가 왔네! 수학 왕이 되어보자!"
  ]
  
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
  return speakKorean(randomGreeting, 0.95, 1.6)
}

export const encourageHaewan = () => {
  const encouragements = [
    "혜완이 정말 잘하고 있어!",
    "우와! 혜완이 천재네!",
    "멋져! 혜완이가 최고야!",
    "대단해! 혜완이 짱!"
  ]
  
  const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
  return speakKorean(randomEncouragement, 0.95, 1.6)
}
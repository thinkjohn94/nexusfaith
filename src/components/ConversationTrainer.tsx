import { useState, useRef, useEffect } from 'preact/hooks';

interface ConversationTrainerProps {
  scenario: {
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    opponent: {
      name: string;
      personality: string;
      background: string;
    };
  };
}

interface Message {
  id: string;
  sender: 'user' | 'opponent';
  text: string;
  timestamp: Date;
  feedback?: {
    score: number;
    suggestions: string[];
  };
}

export default function ConversationTrainer({ scenario }: ConversationTrainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [conversationStarted, setConversationStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample opponent responses based on difficulty
  const opponentResponses = {
    beginner: [
      "But isn't science just about facts and religion about faith? They seem completely separate to me.",
      "I heard evolution disproves creation. How can you believe in both?",
      "If God exists, why is there so much suffering in the world?"
    ],
    intermediate: [
      "The universe is incredibly vast and old. Doesn't that make humanity seem insignificant?",
      "Natural selection explains complexity without needing a designer. Why add God to the equation?",
      "Scientists follow evidence, not faith. How can religious beliefs be considered reliable?"
    ],
    advanced: [
      "The anthropic principle seems like post-hoc reasoning. We exist, so we notice the universe allows us to exist. Isn't that just survivorship bias?",
      "Information theory might explain DNA complexity, but emergent properties from simple rules can create complex patterns without intelligence.",
      "If consciousness is what makes humans special, what happens when AI becomes conscious? Does that diminish human uniqueness?"
    ]
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const startConversation = () => {
    setConversationStarted(true);
    const openingMessage: Message = {
      id: Date.now().toString(),
      sender: 'opponent',
      text: `Hi! I'm ${scenario.opponent.name}. I'm ${scenario.opponent.background}. I've been thinking about this whole science and religion thing lately...`,
      timestamp: new Date()
    };
    setMessages([openingMessage]);

    // Add first challenge after a moment
    setTimeout(() => {
      const firstChallenge = opponentResponses[scenario.difficulty][0];
      const challengeMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'opponent',
        text: firstChallenge,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, challengeMessage]);
    }, 2000);
  };

  const evaluateResponse = (response: string): { score: number; suggestions: string[] } => {
    const score = Math.floor(Math.random() * 41) + 60; // Random score 60-100 for demo
    const suggestions = [
      "Consider citing specific examples or studies",
      "Acknowledge the valid concern before presenting your view",
      "Use analogies that relate to their background",
      "Ask clarifying questions to better understand their position"
    ];
    
    return {
      score,
      suggestions: suggestions.slice(0, Math.floor(Math.random() * 3) + 1)
    };
  };

  const generateOpponentResponse = (userMessage: string): string => {
    const responses = opponentResponses[scenario.difficulty];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  const sendMessage = () => {
    if (!currentInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: currentInput,
      timestamp: new Date(),
      feedback: evaluateResponse(currentInput)
    };

    setMessages(prev => [...prev, userMessage]);
    setGameScore(prev => prev + (userMessage.feedback?.score || 0));
    setCurrentInput('');
    setIsThinking(true);

    // Simulate opponent thinking and responding
    setTimeout(() => {
      const opponentResponse = generateOpponentResponse(currentInput);
      const opponentMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'opponent',
        text: opponentResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, opponentMessage]);
      setIsThinking(false);
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (!conversationStarted) {
    return (
      <div className="trainer-setup">
        <div className="scenario-card">
          <h3 className="scenario-title">{scenario.title}</h3>
          <p className="scenario-description">{scenario.description}</p>
          
          <div className="scenario-details">
            <div className="detail-item">
              <strong>Difficulty:</strong>
              <span 
                className="difficulty-badge"
                style={{ backgroundColor: getDifficultyColor(scenario.difficulty) }}
              >
                {scenario.difficulty}
              </span>
            </div>
            <div className="detail-item">
              <strong>Conversation Partner:</strong> {scenario.opponent.name}
            </div>
            <div className="detail-item">
              <strong>Background:</strong> {scenario.opponent.background}
            </div>
            <div className="detail-item">
              <strong>Personality:</strong> {scenario.opponent.personality}
            </div>
          </div>

          <div className="tips">
            <h4>💡 Tips for Success:</h4>
            <ul>
              <li>Listen to understand, not just to respond</li>
              <li>Find common ground before presenting differences</li>
              <li>Use evidence-based arguments with humility</li>
              <li>Ask questions to better understand their perspective</li>
            </ul>
          </div>

          <button onClick={startConversation} className="start-button">
            Start Conversation Training →
          </button>
        </div>

        <style jsx>{`
          .trainer-setup {
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
          }

          .scenario-card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }

          .scenario-title {
            color: #2d3748;
            margin-bottom: 1rem;
            font-size: 1.5rem;
          }

          .scenario-description {
            color: #718096;
            margin-bottom: 2rem;
            line-height: 1.6;
          }

          .scenario-details {
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 2rem;
          }

          .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0;
            border-bottom: 1px solid #f1f5f9;
          }

          .detail-item:last-child {
            border-bottom: none;
          }

          .difficulty-badge {
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: capitalize;
          }

          .tips {
            background: #f7fafc;
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 2rem;
          }

          .tips h4 {
            color: #2d3748;
            margin-bottom: 1rem;
          }

          .tips ul {
            margin: 0;
            padding-left: 1.5rem;
          }

          .tips li {
            margin-bottom: 0.5rem;
            color: #4a5568;
          }

          .start-button {
            width: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .start-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="conversation-trainer">
      <div className="trainer-header">
        <div className="scenario-info">
          <h3>{scenario.title}</h3>
          <p>Training with {scenario.opponent.name}</p>
        </div>
        <div className="score-display">
          <span className="score-label">Score:</span>
          <span className="score-value">{gameScore}</span>
        </div>
      </div>

      <div className="conversation-area">
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className={`message message-${message.sender}`}>
              <div className="message-content">
                <div className="message-header">
                  <span className="sender-name">
                    {message.sender === 'user' ? 'You' : scenario.opponent.name}
                  </span>
                  <span className="timestamp">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="message-text">{message.text}</p>
                {message.feedback && (
                  <div className="feedback">
                    <div className="feedback-score">
                      Score: {message.feedback.score}/100
                    </div>
                    {message.feedback.suggestions.length > 0 && (
                      <div className="feedback-suggestions">
                        <strong>💡 Suggestions:</strong>
                        <ul>
                          {message.feedback.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="message message-opponent">
              <div className="message-content">
                <div className="message-header">
                  <span className="sender-name">{scenario.opponent.name}</span>
                  <span className="typing-indicator">is thinking...</span>
                </div>
                <div className="thinking-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <div className="input-container">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.currentTarget.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your response..."
              className="message-input"
              disabled={isThinking}
            />
            <button 
              onClick={sendMessage} 
              disabled={!currentInput.trim() || isThinking}
              className="send-button"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .conversation-trainer {
          max-width: 800px;
          margin: 0 auto;
          height: 600px;
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .trainer-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem;
          border-radius: 15px 15px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .scenario-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
        }

        .scenario-info p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .score-display {
          text-align: right;
        }

        .score-label {
          display: block;
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .score-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .conversation-area {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          background: #f8fafc;
        }

        .message {
          margin-bottom: 1rem;
        }

        .message-user .message-content {
          background: #667eea;
          color: white;
          margin-left: 20%;
          border-radius: 18px 18px 4px 18px;
        }

        .message-opponent .message-content {
          background: white;
          color: #2d3748;
          margin-right: 20%;
          border-radius: 18px 18px 18px 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .message-content {
          padding: 1rem;
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .message-text {
          margin: 0;
          line-height: 1.5;
        }

        .feedback {
          margin-top: 0.75rem;
          padding: 0.75rem;
          background: rgba(255,255,255,0.2);
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .feedback-score {
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .feedback-suggestions ul {
          margin: 0.5rem 0 0 1rem;
          padding: 0;
        }

        .feedback-suggestions li {
          margin-bottom: 0.25rem;
        }

        .thinking-dots {
          display: flex;
          gap: 4px;
          margin: 0.5rem 0;
        }

        .thinking-dots span {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          border-radius: 50%;
          animation: thinking 1.4s infinite ease-in-out both;
        }

        .thinking-dots span:nth-child(1) { animation-delay: -0.32s; }
        .thinking-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes thinking {
          0%, 80%, 100% { 
            transform: scale(0);
          } 40% { 
            transform: scale(1);
          }
        }

        .input-area {
          padding: 1rem;
          background: white;
          border-radius: 0 0 15px 15px;
          border-top: 1px solid #e2e8f0;
        }

        .input-container {
          display: flex;
          gap: 1rem;
        }

        .message-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 25px;
          font-size: 1rem;
        }

        .message-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .send-button {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .send-button:hover:not(:disabled) {
          background: #5a67d8;
        }

        .send-button:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .conversation-trainer {
            height: 500px;
            margin: 0 1rem;
          }

          .message-user .message-content {
            margin-left: 10%;
          }

          .message-opponent .message-content {
            margin-right: 10%;
          }
        }
      `}</style>
    </div>
  );
}
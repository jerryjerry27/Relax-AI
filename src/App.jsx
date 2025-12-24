import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Relax Xingye (星夜) 已上线。核心模型就绪，多模型网关已连接。请指示...' }
  ])
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: `[Processing] I received: ${input}` }]);
    }, 1000);
  }

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="new-chat-btn">
          <span>+</span> New Chat
        </div>
        <div className="menu-item active">Recent</div>
        <div className="menu-item">Relax Xingye</div>
        <div className="menu-item">Settings</div>
      </div>

      {/* Main Content */}
      <div className="main-chat">
        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-icon">
                {msg.role === 'user' ? 'U' : (msg.role === 'system' ? 'S' : 'AI')}
              </div>
              <div className="message-content">
                <div className="role-name">
                  {msg.role === 'user' ? 'You' : (msg.role === 'system' ? 'System' : 'Relax Xingye')}
                </div>
                <div>{msg.content}</div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Floating Input Area */}
        <div className="input-container">
          <div className="input-box">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Enter a prompt here"
            />
            <button className="send-btn" onClick={handleSend}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

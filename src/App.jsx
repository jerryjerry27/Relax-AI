import { useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Relax Xingye (星夜) 已上线。核心模型就绪，多模型网关已连接。请指示...' }
  ])
  const [input, setInput] = useState('')

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
      <div className="sidebar">
        <h2>RELAX AI</h2>
        <div className="menu-item active">New Chat</div>
        <div className="menu-item">History</div>
        <div className="menu-item">Settings</div>
      </div>
      <div className="main-chat">
        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <span className="role-label">{msg.role.toUpperCase()}:</span> {msg.content}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Enter command or message..."
          />
          <button onClick={handleSend}>SEND</button>
        </div>
      </div>
    </div>
  )
}

export default App

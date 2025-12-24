import { useState, useRef, useEffect } from 'react'
import { chatWithAI } from './services/aiService'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Relax Xingye (星夜) 已上线。核心模型就绪，多模型网关已连接。请指示...' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  // Settings State
  const [config, setConfig] = useState({
    apiKey: localStorage.getItem('relax_api_key') || '',
    baseUrl: localStorage.getItem('relax_base_url') || 'https://api.openai.com/v1',
    model: localStorage.getItem('relax_model') || 'gpt-3.5-turbo'
  })

  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSaveSettings = () => {
    localStorage.setItem('relax_api_key', config.apiKey);
    localStorage.setItem('relax_base_url', config.baseUrl);
    localStorage.setItem('relax_model', config.model);
    setShowSettings(false);
    alert('设置已保存 / Settings Saved');
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    if (!config.apiKey) {
      alert('请先点击 Settings 配置 API Key / Please configure API Key in Settings first');
      setShowSettings(true);
      return;
    }

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Call AI Service
      const aiResponseContent = await chatWithAI(newMessages, config);
      
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: aiResponseContent 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: `Error: ${error.message}` 
      }]);
    } finally {
      setLoading(false);
    }
  }

  const handlePresetChange = (e) => {
    const preset = e.target.value;
    if (preset === 'doubao') {
      setConfig({
        ...config,
        baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
        model: '' // User needs to input their Endpoint ID
      });
    } else if (preset === 'deepseek') {
      setConfig({
        ...config,
        baseUrl: 'https://api.deepseek.com',
        model: 'deepseek-chat'
      });
    } else if (preset === 'moonshot') {
      setConfig({
        ...config,
        baseUrl: 'https://api.moonshot.cn/v1',
        model: 'moonshot-v1-8k'
      });
    } else if (preset === 'openai') {
      setConfig({
        ...config,
        baseUrl: 'https://api.openai.com/v1',
        model: 'gpt-3.5-turbo'
      });
    }
  };

  return (
    <div className="chat-container">
      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Gateway Configuration (网关配置)</h3>
            
            <div className="form-group">
              <label>Quick Preset (快速预设)</label>
              <select onChange={handlePresetChange} defaultValue="">
                <option value="" disabled>Select a provider...</option>
                <option value="doubao">Doubao (豆包/火山引擎)</option>
                <option value="deepseek">DeepSeek (深度求索)</option>
                <option value="moonshot">Moonshot (Kimi/月之暗面)</option>
                <option value="openai">OpenAI (GPT)</option>
              </select>
            </div>

            <div className="form-group">
              <label>API Key</label>
              <input 
                type="password" 
                value={config.apiKey}
                onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                placeholder="sk-..."
              />
            </div>
            <div className="form-group">
              <label>Base URL</label>
              <input 
                type="text" 
                value={config.baseUrl}
                onChange={(e) => setConfig({...config, baseUrl: e.target.value})}
                placeholder="https://api.openai.com/v1"
              />
            </div>
            <div className="form-group">
              <label>Model Name / Endpoint ID</label>
              <input 
                type="text" 
                value={config.model}
                onChange={(e) => setConfig({...config, model: e.target.value})}
                placeholder="gpt-3.5-turbo, ep-20240604..."
              />
              {config.baseUrl.includes('volces.com') && (
                <small style={{color: '#888', display: 'block', marginTop: '5px'}}>
                  * 豆包提示: 请填入火山引擎控制台的【推理接入点 ID】(ep-xxxx)
                </small>
              )}
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowSettings(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveSettings}>Save Connection</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="sidebar">
        <div className="new-chat-btn" onClick={() => setMessages([{ role: 'system', content: 'Relax Xingye (星夜) 已重置。' }])}>
          <span>+</span> New Chat
        </div>
        <div className="menu-item active">Recent</div>
        <div className="menu-item">Relax Xingye</div>
        <div 
          className="menu-item" 
          onClick={() => {
            console.log('Settings clicked');
            setShowSettings(true);
          }}
          style={{marginTop: 'auto'}}
        >
          Settings
        </div>
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
                <div style={{whiteSpace: 'pre-wrap'}}>{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="message ai">
              <div className="message-icon">AI</div>
              <div className="message-content">
                <div className="role-name">Relax Xingye</div>
                <div>Thinking... (正在连接星夜神经网络...)</div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Floating Input Area */}
        <div className="input-container">
          <div className="input-box">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
              placeholder={loading ? "Waiting for response..." : "Enter a prompt here"}
              disabled={loading}
            />
            <button className="send-btn" onClick={handleSend} disabled={loading}>
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

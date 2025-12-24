import torch
import torch.optim as optim
from model import RelaxXingye, RelaxConfig
from tqdm import tqdm

# Configuration
config = RelaxConfig(
    vocab_size=1000, # Small vocab for demo
    n_embd=256,
    n_head=4,
    n_layer=4,
    block_size=64
)

device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(f"Using device: {device}")

# Model
model = RelaxXingye(config).to(device)
optimizer = optim.AdamW(model.parameters(), lr=3e-4)

# Dummy Data (Replace with real training data loading)
# A sequence of random integers
data = torch.randint(0, config.vocab_size, (1000,), dtype=torch.long)

def get_batch(split='train'):
    # Generate a small batch of data of inputs x and targets y
    ix = torch.randint(len(data) - config.block_size, (16,))
    x = torch.stack([data[i:i+config.block_size] for i in ix])
    y = torch.stack([data[i+1:i+config.block_size+1] for i in ix])
    x, y = x.to(device), y.to(device)
    return x, y

print("Starting training loop...")
model.train()
for iter in tqdm(range(100)): # 100 iterations for demo
    xb, yb = get_batch('train')
    
    logits, loss = model(xb, yb)
    
    optimizer.zero_grad(set_to_none=True)
    loss.backward()
    optimizer.step()
    
    if iter % 10 == 0:
        print(f"Step {iter}: loss {loss.item():.4f}")

print("Training complete. Saving model...")
torch.save(model.state_dict(), "relax_xingye.pth")
print("Model saved to relax_xingye.pth")

# Generation Demo
print("Generating sample text...")
model.eval()
context = torch.zeros((1, 1), dtype=torch.long, device=device)
generated = model.generate(context, max_new_tokens=20)
print(f"Generated sequence: {generated[0].tolist()}")

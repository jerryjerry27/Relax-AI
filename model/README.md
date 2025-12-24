# Relax Xingye (星夜) Model

This directory contains the custom AI model implementation for Relax AI.

## Architecture
Relax Xingye is based on a Decoder-only Transformer architecture (similar to GPT).
- `model.py`: Contains the `RelaxXingye` model class and configuration.
- `train.py`: A basic training loop to get you started.

## Setup
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Training
To start training the model (demo mode):
```bash
python train.py
```

## Customization
- Modify `RelaxConfig` in `train.py` to change model size (layers, heads, embedding dimensions).
- Replace the dummy data loading in `train.py` with your own dataset (text files, etc.).

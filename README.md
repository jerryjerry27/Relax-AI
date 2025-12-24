# Relax AI

**"Relax AI 不仅连接着广阔的 AI 宇宙，更拥有一颗独特的、在星夜中独自闪耀的“芯”。"**

Relax AI 是一个集成了多模型调度的智能助手系统。虽然它可以调用许多现有的 AI 大模型，但其真正的灵魂在于 **Relax Xingye (星夜)** —— 一个由开发者从零构建并亲自训练的定制化 AI 模型。

本项目旨在打造一个全平台的智能交互环境，默认采用极具科技感的“黑客帝国/赛博朋克”风格（黑色与绿色主题）。

## 核心组件

1.  **Relax Official (官网)**: 轻量级、快速的展示门户。
2.  **Relax Chat (聊天终端)**: 深度集成的 Web 聊天界面，支持多模型切换与星夜模型对话。
3.  **Relax Desktop (桌面核心)**: 跨平台 (macOS & Windows) 的应用容器，提供沉浸式体验。
4.  **Relax Xingye (星夜模型)**: 基于 PyTorch 的自研 Transformer 架构模型，支持自定义训练。

## 项目结构

- `website/`: Official website source code.
- `chat/`: Chat application source code.
- `desktop/`: Desktop application wrapper.
- `model/`: Relax Xingye model training and inference code.
- `shared/`: Shared resources and configurations.

## Theme

The default theme is **Relax Matrix** (Black & Green).
Configuration can be found in `shared/theme.json`.

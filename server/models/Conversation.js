const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "assistant", "system"], required: true },
  content: { type: String, required: true },
  intent: String,
  confidence: Number,
  source: { type: String, enum: ["lex", "llm"], required: true, default: "llm" },
  responseTimeMs: Number,
  tokensUsed: Number,
  timestamp: { type: Date, default: Date.now, index: true },
  usedRAG: Boolean,
  retrievedDocsCount: Number
});

const ConversationSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  userId: String,
  channel: { type: String, enum: ["web", "mobile", "whatsapp", "api"], default: "web" },
  messages: [MessageSchema],
  messageCount: { type: Number, default: 0 },
  lexUsedCount: { type: Number, default: 0 },
  llmUsedCount: { type: Number, default: 0 },
  lastIntent: String,
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now },
  ragUsedCount: {
    type: Number,
    default: 0
  },
  ragTokenUsed: {
    type: Number,
    default: 0
  },
  vectorSearchCount: {
    type: Number,
    default: 0
  }


});


module.exports = mongoose.model("Conversation", ConversationSchema);
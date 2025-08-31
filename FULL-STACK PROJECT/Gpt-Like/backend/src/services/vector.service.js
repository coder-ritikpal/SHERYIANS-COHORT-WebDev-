// Import the Pinecone library
const { Pinecone } = require("@pinecone-database/pinecone");

// Initialize Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// Choose index
const mitraAIIndex = pc.Index("mitra-ai");


function safeString(value) {
  if (!value) return "";
  return value.toString();
}

/**
 * Create memory (upsert a vector into Pinecone)
 */
async function createMemory({ vector, metadata, id }) {
  try {
    const upsertData = [
      {
        id: safeString(id),
        values: vector,
        metadata: {
          ...metadata,
          user: metadata?.user ? safeString(metadata.user) : undefined,
          chat: metadata?.chat ? safeString(metadata.chat) : undefined,
          role: metadata?.role ? safeString(metadata.role) : undefined,
          text: metadata?.text ? safeString(metadata.text) : undefined,
        },
      },
    ];

    await mitraAIIndex.upsert(upsertData);
    console.log("✅ Memory stored:", upsertData[0].id);
  } catch (error) {
    console.error("❌ Error creating memory:", error);
    throw error;
  }
}

/**
 * Query memory (find similar vectors)
 */
async function queryMemory({ queryVector, limit = 5, metadata }) {
  try {
    const filter = metadata
      ? {
          ...(metadata.user && { user: safeString(metadata.user) }),
          ...(metadata.chat && { chat: safeString(metadata.chat) }),
        }
      : undefined;

    const data = await mitraAIIndex.query({
      vector: queryVector,
      topK: limit,
      filter,
      includeMetadata: true,
    });

    return data.matches || [];
  } catch (error) {
    console.error("❌ Error querying memory:", error);
    throw error;
  }
}

/**
 * Delete memory (remove vector by ID)
 */
async function deleteMemory(id) {
  try {
    const stringId = safeString(id);
    await mitraAIIndex.deleteOne(stringId);
    console.log("🗑️ Memory deleted:", stringId);
  } catch (error) {
    console.error("❌ Error deleting memory:", error);
    throw error;
  }
}

module.exports = { createMemory, queryMemory, deleteMemory };

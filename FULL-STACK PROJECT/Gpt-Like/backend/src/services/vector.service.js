// Import the Pinecone library
const { Pinecone } = require("@pinecone-database/pinecone");

// Initialize Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// Choose index
const mitraAIIndex = pc.Index("mitra-ai");

/**
 * Create memory (upsert a vector into Pinecone)
 */
async function createMemory({ vector, metadata, id }) {
  try {
    const upsertData = [
      {
        id: id.toString(), // Ensure it's a string
        values: vector,
        metadata: {
          ...metadata, // Pass directly
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
 * scope = "stm" (short-term memory → user + chat)
 * scope = "ltm" (long-term memory → user only, across all chats)
 */
async function queryMemory({ queryVector, limit = 5, user, chat, scope = "ltm" }) {
  try {
    let filter;

    if (scope === "stm") {
      filter = { user, chat };
    } else if (scope === "ltm") {
      filter = { user };
    }

    const data = await mitraAIIndex.query({
      vector: queryVector,
      topK: limit,
      filter,
      includeMetadata: true,
    });

    console.log(`📥 Retrieved ${scope.toUpperCase()} matches:`, data.matches?.length || 0);
    return data.matches || [];
  } catch (error) {
    console.error("❌ Error querying memory:", error);
    throw error;
  }
}

module.exports = { createMemory, queryMemory };

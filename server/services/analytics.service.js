const { format } = require("morgan");
const Conversations = require("../models/Conversation");

const buildDataFilter = (startDate, endDate) => {
    if (!startDate || !endDate) return {};

    return {
        createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }
};

exports.getOverviewStats = async (startDate,endDate)=>{
    const matchStage = buildDataFilter(startDate,endDate);

    const totalConversation = await Conversations.countDocuments(matchStage);

    const aggregation = await Conversations.aggregate([
        {$match:matchStage},
        {
            $group:{
                _id:null,
                totalMessages: {$sum:"$messageCount"},
                totalLLM: {$sum:"$llmUsedCount"},
                totalLex: {$sum:"$lexUsedCount"},
                totalRAG: {$sum:"$ragUsedCount"}
            }
        }
    ]);

    const stats = aggregation[0] || {};

    return{
        totalConversation,
        totalMessages: stats.totalMessages||0,
        totalLLM:stats.totalLLM||0,
        totalLex:stats.totalLex||0,
        totalRAG:stats.totalRAG||0
    }
}



exports.getPerformanceStats = async (startDate, endDate) => {
    const matchStage = buildDataFilter(startDate, endDate);

    const result = await Conversations.aggregate([
        { $match: matchStage },
        { $unwind: "$messages" },
        {
            $group: {
                _id: null,
                avgResponseTime: { $avg: "$messages.responseTimeMs" },
                totalTokens: { $sum: "$messages.tokenUsed" }
            }
        }
    ]);
    return result[0] || { avgResponseTime: 0, totalTokens: 0 };
}

exports.getTopIntents = async (startDate, endDate) => {
    const matchStage = buildDataFilter(startDate, endDate);

    return await Conversations.aggregate([
        { $match: matchStage },
        { $unwind: "$messages" },
        { $match: { "messages.intent": { $ne: null } } },
        {
            $group: {
                _id: "$messages.intent",
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } },
        { $limit: 10 }
    ]);
}

exports.getConversationsPerDay = async (startDate, endDate) => {
    const matchStage = buildDataFilter(startDate, endDate);

    return await Conversations.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt"
                    }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);
}
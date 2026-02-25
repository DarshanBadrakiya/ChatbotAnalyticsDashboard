const analyticsService = require("../services/analytics.service");

exports.getDashboard = async(req,res,next)=>{
    try{
        const {startDate,endDate} = req.query;
        
        const overview = await analyticsService.getOverviewStats(startDate,endDate);
        const performance = await analyticsService.getPerformanceStats(startDate,endDate);
        const topIntents = await analyticsService.getTopIntents(startDate,endDate);
        const conversationPerDay = await analyticsService.getConversationsPerDay(startDate,endDate);

        res.json({
            success:true,
            data:{
                overview,
                performance,
                topIntents,
                conversationPerDay
            }
        });
    }catch(error){
        next(error);
    }
}
import catchAsyncError from "../middleware/catchAsyncError";
import Chat from "../model/Chat";
import ErrorHandler from "../utils/errorHandler";

export const initiateChat = catchAsyncError(async (req, res, next) => {

    const { appId, candidateId, employerId } = req.body;
    console.log(req.body)

    if (!appId || !candidateId || !employerId) {
        return next(new ErrorHandler("all required felid not found", 400));
    }
    const body = {
        jobApp: appId,
        participants: [employerId, candidateId],
        messages: []
    }
    const chat = await Chat.create(body);

    res.status(200).json({
        success: true,
        chat

    })
})

export const addMessage = catchAsyncError(async (req, res, next) => {

    const { chatId, role, userId, text } = req.body;

    if (!chatId) {
        return next(new ErrorHandler("chatId not found", 400));
    }
    const newMessage = {
        role,
        userId,
        text
    };

    const chats = await Chat.findOneAndUpdate({ _id: chatId }, { $addToSet: { messages: newMessage } }, { new: true });
    if (!chats) {
        return next(new ErrorHandler("chat not found", 404));
    }
    const chat = chats.messages[chats.messages.length - 1];
    res.status(200).json({
        success: true,
        chat

    })
})
export const getMessages = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        return next(new ErrorHandler("chatId not found", 400));
    }

    const chat = await Chat.findOne({ jobApp: id })
    if (!chat) {
        return next(new ErrorHandler("Chat not found", 404));
    }

    res.status(200).json({
        success: true,
        chat: chat
    })
})






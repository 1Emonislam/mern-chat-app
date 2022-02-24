const Chat = require("../models/chatModels");
const User = require("../models/userModel");

const acessChat = async (req, res, next) => {
    {
        const { userId } = req.body;
        try {
            if (!userId) {
                console.log("user Id sent with requset");
                return res.status(400);
            }
            let isChat = await Chat.find({
                isGroupChat: false,

                $and: [
                    { users: { $elemMatch: { $eq: req.user._id } } },
                    { users: { $elemMatch: { $eq: userId } } },
                ],
            })
                .populate("users", "-password")
                .populate("latestMessage");
            isChat = await User.populate(isChat, {
                path: "latesetMessage.sender",
                select: "name pic email",
            });
            if (isChat?.length > 0) {
                return res.json(isChat[0]);
            } else {
                let chatData = {
                    chatName: "sender",
                    isGroupChat: false,
                    users: [req.user._id, userId],
                };
                try {
                    const createdChat = await Chat.create(chatData);
                    const fullChat = await Chat.findOne({
                        _id: createdChat._id,
                    }).populate("users", "-password");
                    return res.status(200).json({ data: fullChat });
                } catch (error) {
                    next(error);
                }
            }
        } catch (error) {
            next(error);
        }
    }
};
const chatGet = async (req, res, next) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate("users", "-password").populate("latestMessage").populate("groupAdmin", "-password").sort({ updatedAt: -1 }).then(async (results) => {
            // console.log(results)
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name pic email"
            })
            return res.status(200).json({ data: results })
        })
    } catch (error) {
        next(error)
    }
};

const groupCreate = async (req, res, next) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({ message: "Please Fill all the feilds!" })
    }
    let users = JSON.parse(req.body.users);
    if (users?.length < 2) {
        return res.status(400).json({ message: "more than 2 users are required to form a group chat" });
    }
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate("users", "-password").populate("groupAdmin", "-password");
        return res.status(200).json({ data: fullGroupChat })
    } catch (error) {
        error.status = 400;
        next(error);
    }
};
const groupRename = async (req, res, next) => {
    const { chatId, chatName } = req.body;
    try {
        const updatedChat = await Chat.findByIdAndUpdate(chatId, {
            chatName
        }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password");
        if (!updatedChat) {
            return res.status(404).json({ error: "chat not founds!" });
        } if (updatedChat) {
            return res.status(200).json({ message: "chat successfully updated!", data: updatedChat })
        }
    } catch (error) {
        next(error);
    }
};
const groupAddTo = async (req, res, next) => {
    const { chatId, userId } = req.body;
    try {
        const added = await Chat.findByIdAndUpdate(chatId, {
            $push: { users: userId },
        }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password");
        // console.log(added)
        if (!added) {
            return res.status(404).json({ error: "chat not founds!" });
        }
        if (added) return res.status(200).json({ message: "added successfully!", data: added })
    }
    catch (error) {
        next(error)
    }
}
const groupRemoveTo = async (req, res, next) => {
    const { chatId, userId } = req.body;
    try {
        const remove = await Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId },
        }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password");
        if (!remove) {
            return res.status(404).json({ error: "chat not founds!" });
        }
        if (remove) return res.status(200).json({ message: "removed successfully!", data: remove })
    }
    catch (error) {
        next(error)
    }
}
module.exports = { acessChat, chatGet, groupCreate, groupRename, groupAddTo, groupRemoveTo };

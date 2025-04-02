const Message = require("../model/Message");
class MessageService {
  async createMessage(data) {
    try {
      const message = new Message(data);
      return await message.save();
    } catch (error) {
      throw error;
    }
  }
  async getMessagesBetweenUsers(sender, receiver, skip, limit) {
    try {
      return await Message.find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } catch (error) {
      throw error;
    }
  }
  async updateMessage(id, newData) {
    try {
      return await Message.findByIdAndUpdate(id, newData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteMessage(id) {
    try {
      return await Message.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = MessageService;

package gateway;

import com.google.gson.Gson;

import javax.jms.JMSException;
import javax.jms.TextMessage;

public abstract class Gateway {
    protected MessageSenderGateway messageSender;
    protected MessageReceiverGateway messageReceiver;
    protected Gson gson;

    public Gateway(String senderChannel, String receiverChannel) {
        if (senderChannel != null && !senderChannel.isEmpty()) {
            messageSender = new MessageSenderGateway(senderChannel);
        }

        if (receiverChannel != null && !receiverChannel.isEmpty()) {
            messageReceiver = new MessageReceiverGateway(receiverChannel);

            messageReceiver.setListener(message -> {
                if (message instanceof TextMessage) {
                    try {
                        receiveMessage(((TextMessage) message).getText());
                    } catch (JMSException e) {
                        e.printStackTrace();
                    }
                }
            });
        }

        gson = new Gson();
    }

    protected abstract void receiveMessage(String json);
}


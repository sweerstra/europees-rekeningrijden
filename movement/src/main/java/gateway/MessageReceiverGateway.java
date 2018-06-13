package gateway;

import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;

public class MessageReceiverGateway {
    private MessageConsumer consumer;

    public MessageReceiverGateway(String channelName) {
        try {
            ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://192.168.24.36:61616");

            Connection connection = connectionFactory.createConnection();
            connection.start();

            Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);

            Destination destination = session.createQueue(channelName);
            consumer = session.createConsumer(destination);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setListener(MessageListener listener) {
        try {
            consumer.setMessageListener(listener);
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}
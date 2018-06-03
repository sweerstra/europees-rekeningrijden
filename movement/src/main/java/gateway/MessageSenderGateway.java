package gateway;

import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;

public class MessageSenderGateway {
    private Session session;
    private MessageProducer producer;

    public MessageSenderGateway(String channelName) {
        try {
            ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");

            Connection connection = connectionFactory.createConnection();
            connection.start();

            session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);

            Destination destination = session.createQueue(channelName);
            producer = session.createProducer(destination);
            producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void send(String json) {
        try {
            Message message = session.createTextMessage(json);
            producer.send(message);
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}

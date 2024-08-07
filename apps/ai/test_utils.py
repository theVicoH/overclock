import unittest
from unittest.mock import patch, MagicMock
import paho.mqtt.client as mqtt
from utils import connect_mqtt, send_message, on_connect, on_message

class TestUtils(unittest.TestCase):
    @patch('paho.mqtt.client.Client')
    def test_connect_mqtt(self, MockClient):
        client = connect_mqtt()
        self.assertIsInstance(client, mqtt.Client)
    
    @patch('paho.mqtt.client.Client')
    def test_send_message(self, MockClient):
        client = MagicMock()
        send_message(client, 'test/topic', 'payload')
        client.publish.assert_called_once_with('test/topic', 'payload')

    def test_on_connect(self):
        client = MagicMock()
        on_connect(client, None, None, 0)
        client.subscribe.assert_not_called()
        
    def test_on_message(self):
        msg = MagicMock()
        msg.payload.decode.return_value = 'payload'
        msg.topic = 'test/topic'
        with patch('logging.info') as mock_logging:
            on_message(None, None, msg)
            mock_logging.assert_called_with('Received message: payload from topic: test/topic')

if __name__ == '__main__':
    unittest.main()

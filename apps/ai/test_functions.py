import unittest
from unittest.mock import patch, MagicMock
import paho.mqtt.client as mqtt
from utils import connect_mqtt, send_message, on_connect, on_message, read_messages,initialize_yolo, fail_on_error

class TestUtils(unittest.TestCase):
    
    def test_fail_on_error(self):
        with self.assertRaises(SystemExit):
            fail_on_error(True, "Test error")
    
    @patch("logging.info")
    def test_on_connect(self, mock_logging):
        client = MagicMock()
        on_connect(client, None, None, 0)
        mock_logging.assert_called_with("Connected to MQTT broker")
    
    @patch("logging.info")
    def test_on_message(self, mock_logging):
        msg = MagicMock()
        msg.payload.decode.return_value = "payload"
        msg.topic = "test/topic"
        on_message(None, None, msg)
        mock_logging.assert_called_with(
            "Received message: payload from topic: test/topic"
        )
    
    @patch("paho.mqtt.client.Client")
    def test_connect_mqtt(self, MockClient):
        # Create an instance of the mock client
        mock_client_instance = MockClient.return_value
        
        # Call the function under test
        client = connect_mqtt()
        
        # Verify that connect was called with the correct arguments
        mock_client_instance.connect.assert_called_with("176.132.246.222", 5701, 60)
    
    @patch("paho.mqtt.client.Client")
    def test_send_message(self, MockClient):
        client = MagicMock()
        client.publish.return_value = (0, None)  # Simulate successful publish
        with patch("logging.info") as mock_logging:
            send_message(client, "test/topic", "payload")
            client.publish.assert_called_once_with("test/topic", "payload")
            mock_logging.assert_called_with(" [x] Congrats, sending message: payload")
    
    @patch("paho.mqtt.client.Client")
    def test_read_messages(self, MockClient):
        client = MagicMock()
        read_messages(client, "test/topic")
        client.subscribe.assert_called_with("test/topic")
        client.loop_start.assert_called_once()

    @patch("torch.load")
    def test_initialize_yolo(self, mock_load):
        mock_model = MagicMock()
        mock_load.return_value = mock_model
        model_path = "apps/YOLO/yolov7-w6.pt"
        model = initialize_yolo(model_path)
        self.assertIsNotNone(model)
        mock_load.assert_called_with(model_path, map_location="cpu")

if __name__ == "__main__":
    unittest.main()
